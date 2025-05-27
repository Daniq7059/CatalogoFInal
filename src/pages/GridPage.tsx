// GridPage.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import { HeroGrid } from "../components/grid/HeroGrid";
import HeaderBar from "../components/grid/HeaderBar";
import { ProjectSlider } from "../components/grid/ProjectSlider";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FiPlus, FiLogIn, FiLogOut } from "react-icons/fi";
import {
  ODSSelectorModal,
  ODS_CATEGORIES,
} from "../components/grid/ODSSelectorModal";
import {
  getSections,
  createSection,
  deleteSection,
  createProject,
  getProjects,
  deleteProject,
  updateProject,
} from "../../api";
import { useNavigate } from "react-router-dom";

/* ---------------------------- Tipos ---------------------------- */
interface Project {
  id: string;
  title: string;
  section_ids: string[];    // ✅ ahora es un array
  category: string;
  image: string;
  description?: string;
}
interface ProjectSection {
  id: string;
  name: string;
  projects: Project[];
}

/* ========================== Componente ========================= */
export default function GridPage() {
  /* -------- hooks -------- */
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  /* ----------------------------- Estado ----------------------------- */
  const [sections, setSections] = useState<ProjectSection[]>([]);
  const [selectedODSTitles, setSelectedODSTitles] = useState<string[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
const filteredProjects = sections
  .flatMap((section) => section.projects)
  .filter((project, index, self) =>
    selectedODSTitles.length === 0
      ? true
      : selectedODSTitles.some((ods) =>
          sections
            .filter((s) => project.section_ids?.includes(s.id))
            .some((s) => s.name === ods)
        ) &&
        // Eliminar duplicados por ID
        self.findIndex((p) => p.id === project.id) === index
  );
const getOdsIconsForProject = (
  project: Project,
  onlyTheseOdsNames?: string[] // opcional, se usa solo al filtrar
): { icon: string; color: string; title: string }[] => {
  const matchingSections = project.section_ids
    .map((id) => sections.find((s) => s.id === id))
    .filter((s): s is ProjectSection => Boolean(s));

  const filteredSections = onlyTheseOdsNames
    ? matchingSections.filter((s) => onlyTheseOdsNames.includes(s.name))
    : matchingSections;

 return filteredSections
  .map((section) => {
    const ods = ODS_CATEGORIES.find((ods) => ods.title === section.name);
    if (!ods) return null;

    return {
      icon: ods.icon_key, // ✅ nombre válido directamente
      color: ods.color,
      title: ods.title,
    };
  })
  .filter(Boolean);

};





  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    section_ids: [],
    category: "",
    image: "",
    description: "",
  });

  const [showAddODSModal, setShowAddODSModal] = useState(false);
  const [showODSFilterModal, setShowODSFilterModal] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  /* ------------------------- Categorías ------------------------ */
  const categories = ODS_CATEGORIES.map((ods) => ods.title);

  /* ======================= Cargar secciones ======================= */
  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const sectionsData = await getSections();
      const projectsData: Project[] = await getProjects();

      const formattedSections = sectionsData.map((section: any) => ({
          ...section,
          id: String(section.id),              // 👈  garantizamos string
         projects: projectsData
  .filter((p) => p.section_ids?.includes(String(section.id)))
  .map((p) => ({
    ...p,
    category: section.name, // ✅ asignar dinámicamente el nombre de la sección
  })),

        }));

      setSections(formattedSections);
    } catch (error) {
      console.error("Error al obtener secciones:", error);
    }
  };

  /* -------------------- Crear / Eliminar ODS -------------------- */
  const handleAddODS = async (odsTitle: string) => {
    if (!token) return;
    try {
      await createSection({ name: odsTitle }, token);
      await fetchSections();
      setShowAddODSModal(false);
    } catch (error) {
      console.error("Error al crear ODS:", error);
    }
  };

  const toggleODSFilter = (odsTitle: string) => {
    setSelectedODSTitles((prev) =>
      prev.includes(odsTitle)
        ? prev.filter((t) => t !== odsTitle)
        : [...prev, odsTitle]
    );
  };

  /* ----------------- Crear / Editar / Eliminar proyectos ----------------- */
  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm("¿Estás seguro de eliminar este proyecto?")) return;
    try {
      await deleteProject(projectId, token);
      fetchSections();
    } catch (error) {
      console.error("❌ Error al eliminar proyecto:", error);
    }
  };

  const handleSaveProject = async () => {
    if (!token) return;

   const selectedNames = sections
  .filter((s) => newProject.section_ids?.includes(s.id))
  .map((s) => s.name);

const projectData: Partial<Project> = {
  ...newProject,
  section_ids: newProject.section_ids ?? [],
  category: selectedNames.join(", "), // ✅ Esto refleja las ODS seleccionadas
};



     const isEdit = !!editingProjectId;

  if (
    !projectData.title ||
    !projectData.category ||
    (projectData.section_ids?.length ?? 0) === 0 ||
    (!selectedImage && !isEdit)
  ) {
    alert("⚠ Completa título, categoría, ODS y sube imagen antes de guardar.");
    return;
  }


    try {
      if (editingProjectId) {
        await updateProject(editingProjectId, projectData, selectedImage, token);
      } else {
        await createProject(projectData, selectedImage, token);
      }
      await fetchSections();
      resetProjectModal();
    } catch (error) {
      console.error("Error al guardar proyecto:", error);
    }
  };

const handleEditProject = (project: Project) => {
  setNewProject({
    title: project.title,
    category: project.category,
    description: project.description,
    section_ids: project.section_ids,
    image: project.image,
  });

  // ✅ Mostrar sección principal (si hay más de una, solo muestra la primera)
  setSelectedSectionId(project.section_ids?.[0] || null);

  setImagePreview(
    project.image.startsWith("http")
      ? project.image
      : `http://localhost:5000${project.image}`
  );
  setEditingProjectId(project.id); // ✅ importante para que actualice y no cree uno nuevo
  setShowAddProjectModal(true);
};



  const resetProjectModal = () => {
    setShowAddProjectModal(false);
    setEditingProjectId(null);
    setNewProject({
      title: "",
      section_ids: [],
      category: "",
      image: "",
      description: "",
    });
    setImagePreview(null);
    setSelectedImage(null);
  };

  /* -------------------- Proyectos para HeroGrid -------------------- */
 const heroProjects = sections
  .flatMap((s) => s.projects)
  .filter((p, index, self) =>
    p.image && self.findIndex((q) => q.id === p.id) === index
  )
  .map((p) => ({
    title: p.title,
    description: p.description || "",
    image: p.image,
  }));


  

  /* ============================ Render =========================== */
  return (
    <main className="overflow-visible">
      <HeaderBar />
      {/* Hero */}
      <div className="relative">
        <HeroGrid projects={heroProjects} isAdmin={user?.role === "admin"} />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 sm:h-28 md:h-32" />
      </div>

      {/* Botones filtro ODS */}
      <section className="flex gap-4 px-4 sm:px-6 lg:px-8 mt-6">
        <button
          onClick={() => setSelectedODSTitles([])}
          className={`px-6 sm:px-8 py-4 rounded-lg text-base sm:text-lg transition-all cursor-pointer  ${
            selectedODSTitles.length === 0
              ? "bg-[var(--color-primario)] text-white"
              : "bg-white text-gray-700 ring-2 ring-[var(--color-primario)]"
          }`}
        >
          Todas las ODS
        </button>

        <button
          onClick={() => setShowODSFilterModal(true)}
          className={`px-6 sm:px-8 py-4 rounded-lg text-base sm:text-lg transition-all cursor-pointer ${
            selectedODSTitles.length > 0
              ? "bg-[var(--color-primario)] text-white"
              : "bg-white text-gray-700 ring-2 ring-[var(--color-primario)]"
          }`}
        >
          Filtrar ODS
        </button>

        {/* Botón agregar proyecto */}
        {user?.role === "admin" && (
          <div className="flex justify-end p-4 ">
            <button
              onClick={() => {
                if (sections.length === 0) {
                  alert("⚠ No hay ODS registradas. Primero crea una.");
                  return;
                }
                setSelectedSectionId(sections[0].id);
                setNewProject({
                  title: "",
                  section_ids: [sections[0].id],
                  category: sections[0].name,
                  image: "",
                  description: "",
                });
                setShowAddProjectModal(true);
              }}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition cursor-pointer"
            >
              <FiPlus className="text-xl" />
            </button>
          </div>
        )}
      </section>

      {/* Listado secciones */}
<AnimatePresence>
  {selectedODSTitles.length > 0 ? (
    filteredProjects.length > 0 ? (
      (() => {
        const enrichedFilteredProjects = filteredProjects.map((p) => {
          const matchedODS = sections
            .filter((s) => p.section_ids.includes(s.id))
            .map((s) => s.name)
            .filter((odsName) => selectedODSTitles.includes(odsName));

          return {
            ...p,
            category:
              selectedODSTitles.length === 1
                ? matchedODS[0]
                : matchedODS.join(", "),
            odsIcons: getOdsIconsForProject(p, selectedODSTitles),
          };
        });

        return (
          <motion.div
            key="filtered"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="p-4 sm:p-6 lg:p-8"
          >
            <ProjectSlider
              section={{
                id: "filtered",
                name: "Resultados del Filtro",
                projects: enrichedFilteredProjects,
              }}
              projects={enrichedFilteredProjects}
              onDeleteProject={handleDeleteProject}
              onEditProject={handleEditProject}
              isAdmin={user?.role === "admin"}
            />
          </motion.div>
        );
      })()
    ) : (
      <motion.div
  key="no-results"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 30 }}
  transition={{ duration: 0.3 }}
  className="px-6 py-10 sm:px-8 lg:px-10 mt-10 text-center text-gray-600 border border-dashed border-gray-300 rounded-xl shadow-md bg-white"
>
  <div className="flex flex-col items-center justify-center space-y-4">
    <svg
      className="w-16 h-16 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
      />
    </svg>
    <p className="text-xl font-semibold">Sin resultados</p>
    <p className="text-sm text-gray-500 max-w-md">
      No se encontraron proyectos que coincidan con los filtros seleccionados. Intenta ajustar tus criterios o eliminar algunos filtros para ver más resultados.
    </p>
  </div>
</motion.div>

    )
  ) : (
    sections
      .filter((section) => section.projects.length > 0)
      .map((section) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="p-4 sm:p-6 lg:p-8"
        >
          <ProjectSlider
            section={section}
            projects={section.projects.map((p) => ({
              ...p,
              odsIcons: getOdsIconsForProject(p, section.name),
            }))}
            onDeleteProject={handleDeleteProject}
            onEditProject={handleEditProject}
            isAdmin={user?.role === "admin"}
          />
        </motion.div>
      ))
  )}
</AnimatePresence>


      <Footer />
      {/* Botón agregar ODS */}
      {/* {user?.role === "admin" && (
        <button
          onClick={() => setShowAddODSModal(true)}
          className="mt-10 px-6 py-3 flex items-center ml-4 bg-[var(--color-primario)] text-white rounded-full hover:bg-[#5a2fc2] transition"
        >
          <FiPlus className="mr-2" /> Agregar ODS
        </button>
      )} */}

      {/* Modal crear ODS */}
      <ODSSelectorModal
        isOpen={showAddODSModal}
        onClose={() => setShowAddODSModal(false)}
        onSelect={handleAddODS}
        mode="create"
      />

      {/* Modal filtrar ODS */}
      <ODSSelectorModal
        isOpen={showODSFilterModal}
        onClose={() => setShowODSFilterModal(false)}
        onSelect={toggleODSFilter}
        selectedODSs={selectedODSTitles}
        onClearFilters={() => setSelectedODSTitles([])}
        mode="filter"
      />
      
      {/* Botón login/logout */}
      <button
        onClick={user ? logout : () => navigate("/login")}
        className="fixed bottom-4 right-4 p-4 bg-[var(--color-primario)] text-white rounded-full shadow-lg hover:bg-[#5a2fc2] transition cursor-pointer"
      >
        {user ? <FiLogOut className="text-2xl" /> : <FiLogIn className="text-2xl" />}
      </button>

      {/* Modal agregar/editar proyecto */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-110">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 sm:p-8 max-w-md sm:max-w-lg md:max-w-xl h-[90vh] overflow-y-auto w-full space-y-6 relative"
          >
            <button
              onClick={resetProjectModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <h3 className="text-2xl font-bold text-gray-900">
              {editingProjectId ? "Editar Proyecto" : "Nuevo Proyecto"}
            </h3>

            <p className="text-gray-600">
              <strong>Sección: </strong>
              {sections.find((s) => s.id === selectedSectionId)?.name || "N/A"}
            </p>

            {/* título */}
            <input
              placeholder="Título del proyecto"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-primario)]"
              value={newProject.title ?? ""}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />

            {/* categoría / ODS */}
            {/* categorías / ODS (multi-select) */}
              <label className="block">
              <span className="text-gray-700 font-medium">Selecciona uno o más ODS</span>

              <div className="
                  w-full mt-2 h-48 overflow-y-auto
                  rounded-lg border border-gray-300 bg-white
                  scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent
                ">
                {sections.map((s) => {
                  const checked = (newProject.section_ids ?? []).includes(String(s.id));
                  return (
                    <label
                      key={s.id}
                      className="flex items-center justify-between gap-4 px-4 py-3 cursor-pointer select-none hover:bg-indigo-50"
                      onClick={() =>
                        setNewProject((prev) => {
                          const ids = new Set(prev.section_ids ?? []);
                          ids.has(String(s.id)) ? ids.delete(String(s.id)) : ids.add(String(s.id));
                          return { ...prev, section_ids: Array.from(ids) };
                        })
                      }
                    >
                      <span className="text-gray-800">{s.name}</span>
                      <input
                        type="checkbox"
                        checked={checked}
                        readOnly
                        className="h-4 w-4 rounded border-gray-300 text-primario focus:ring-primario cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Haz clic en las casillas o filas para seleccionar varios ODS.
              </p>
            </label>
            <div className="flex justify-end mt-3">
              <button
                type="button"
                onClick={() => setNewProject((p) => ({ ...p, section_ids: [] }))}
                className="
                  px-3 py-2 text-sm rounded-md
                  bg-gray-200 hover:bg-gray-300
                  text-gray-700 transition
                "
              >
                Limpiar selección
              </button>
            </div>
            {/* imagen */}
            <div className="flex flex-col items-center">
              <label className="w-full p-3 border rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 text-center">
                <span className="text-gray-600">Subir imagen</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSelectedImage(e.target.files[0]);
                      setImagePreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="mt-4 w-40 h-40 object-cover rounded-lg shadow-md"
                />
              )}
            </div>

            {/* descripción */}
            <textarea
              placeholder="Descripción"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-primario)]"
              rows={4}
              value={newProject.description ?? ""}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />

            {/* acciones */}
            <div className="flex justify-end gap-3">
              <button
                onClick={resetProjectModal}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProject}
                className="px-4 py-2 bg-[var(--color-primario)] text-white rounded-lg hover:bg-[#5a2fc2]"
              >
                {editingProjectId ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </motion.div>
        </div>
        
      )}
    </main>
    
  );
}
