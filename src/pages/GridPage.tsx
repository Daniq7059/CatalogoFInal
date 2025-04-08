// GridPage.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroGrid } from "../components/grid/HeroGrid";
import { ProjectSlider } from "../components/grid/ProjectSlider";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FiTrash, FiPlus, FiLogIn, FiLogOut } from "react-icons/fi";
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

interface Project {
  id: string;
  title: string;
  section_id: string | null;
  category: string;
  image: string;
  description?: string;
}

interface ProjectSection {
  id: string;
  name: string; // Almacena el título ODS (ej. "Fin de la pobreza")
  projects: Project[];
}

export default function GridPage() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [sections, setSections] = useState<ProjectSection[]>([]);

  // 🔸 Arreglo de strings
  const [selectedODSTitles, setSelectedODSTitles] = useState<string[]>([]);

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Datos del nuevo/edición de proyecto
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    section_id: null,
    category: "",
    image: "",
    description: "",
  });

  const [showAddODSModal, setShowAddODSModal] = useState(false);
  const [showODSFilterModal, setShowODSFilterModal] = useState(false);

  // Para manejar la imagen del proyecto
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Categorías ejemplo para el combo de proyecto
  const categories = [
    "Fin de la pobreza",
    "Hambre cero",
    "Paz, justicia e instituciones sólidas",
    "Salud y bienestar",
    "Educación de calidad",
    "Igualdad de género",
    "Agua limpia y saneamiento",
    "Energía asequible y no contaminante",
    "Trabajo decente y crecimiento económico",
    "Industria, innovación e infraestructura",
    "Reducción de las desigualdades",
    "Ciudades y comunidades sostenibles",
    "Producción y consumo responsables",
    "Acción por el clima",
    "Vida submarina",
    "Alianzas para lograr los objetivos",
    "Vida de ecosistemas terrestres",
  ];

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const sectionsData = await getSections();
      const projectsData = await getProjects();

      // Formateamos las secciones
      const formattedSections = sectionsData.map((section: any) => {
        let cleanImage = section.image;
        if (cleanImage && cleanImage.includes("http://localhost:5000")) {
          cleanImage = cleanImage.replace("http://localhost:5000", "");
        }
        return {
          ...section,
          image: cleanImage,
          projects: projectsData.filter(
            (p: Project) => p.section_id === section.id
          ),
        };
      });
      setSections(formattedSections);
    } catch (error) {
      console.error("Error al obtener secciones:", error);
    }
  };

  // ✅ Manejo de "Agregar ODS" => crear nueva sección con name = odsTitle
  //    (Porque en tu BD, 'name' es la columna que guarda el ODS)
  const handleAddODS = async (odsTitle: string) => {
    if (!token) return;
    try {
      // Creamos la sección => { name: "Fin de la pobreza" }, etc.
      await createSection({ name: odsTitle }, token);
      await fetchSections();
      setShowAddODSModal(false);
    } catch (error) {
      console.error("Error al crear ODS:", error);
    }
  };

  // 🔸 Togglear strings en selectedODSTitles
  const toggleODSFilter = (odsTitle: string) => {
    setSelectedODSTitles((prev) =>
      prev.includes(odsTitle)
        ? prev.filter((title) => title !== odsTitle)
        : [...prev, odsTitle]
    );
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!window.confirm("¿Estás seguro de eliminar esta ODS?")) return;
    try {
      await deleteSection(sectionId, token);
      fetchSections();
    } catch (error) {
      console.error("❌ Error al eliminar ODS:", error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm("¿Estás seguro de eliminar este proyecto?")) return;
    try {
      const projectExists = sections.some((section) =>
        section.projects.some((p) => p.id === projectId)
      );
      if (!projectExists) {
        alert("El proyecto ya no existe.");
        return;
      }
      await deleteProject(projectId, token);
      fetchSections();
    } catch (error) {
      console.error("❌ Error al eliminar proyecto:", error);
    }
  };

  // ✅ Crear/Actualizar proyectos
  const handleSaveProject = async () => {
    if (!token) return;
  
    try {
      const projectData: Partial<Project> = {
        ...newProject,
        section_id: selectedSectionId,
      };
  
      // 🔍 Validación básica
      if (
        !projectData.title ||
        !projectData.category ||
        !projectData.section_id ||
        !selectedImage
      ) {
        alert("⚠ Por favor, completa todos los campos obligatorios (título, categoría, sección y subir imagen).");
        return;
      }
  
      if (editingProjectId) {
        await updateProject(editingProjectId, projectData, selectedImage, token);
      } else {
        await createProject(projectData, selectedImage, token);
      }
  
      await fetchSections();
      setShowAddProjectModal(false);
      setEditingProjectId(null);
      setImagePreview(null);
      setSelectedImage(null);
      setNewProject({
        title: "",
        section_id: null,
        category: "",
        image: "",
        description: "",
      });
    } catch (error) {
      console.error("Error al guardar el proyecto:", error);
    }
  };
  
  const handleEditProject = (project: Project) => {
    setNewProject({
      title: project.title,
      category: project.category,
      description: project.description,
      section_id: project.section_id,
      image: project.image,
    });
    setEditingProjectId(project.id);
    setSelectedSectionId(project.section_id);

    const imageUrl = project.image.startsWith("http")
      ? project.image
      : `http://localhost:5000${project.image}`;

    setImagePreview(imageUrl);
    setShowAddProjectModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const heroImages = sections
  .flatMap((section) => section.projects.map((p) => p.image))
  .filter(Boolean);
  return (
    <main className="overflow-visible">
      <HeroGrid
        title="Innovación en Ingeniería"
        description="Soluciones tecnológicas que transforman la industria moderna"
        backgroundImages={heroImages} // <- aquí pasa la lista
        />

      {/* Botones de filtro ODS */}
      <section className="flex justify-center gap-4 px-4 mt-6 mb-0">
        <button
          onClick={() => setSelectedODSTitles([])}
          className={`px-6 py-4 rounded-lg text-lg transition-all ${
            selectedODSTitles.length === 0
              ? "bg-[var(--color-primario)] text-white"
              : "bg-white text-gray-700 ring-2 ring-[var(--color-primario)]"
          }`}
        >
          Todas las ODS
        </button>

        <button
          onClick={() => setShowODSFilterModal(true)}
          className={`px-6 py-4 rounded-lg text-lg transition-all ${
            selectedODSTitles.length > 0
              ? "bg-[var(--color-primario)] text-white"
              : "bg-white text-gray-700 ring-2 ring-[var(--color-primario)]"
          }`}
        >
          Filtrar ODS
        </button>

        {user?.role === "admin" && (
          <div className="flex justify-end p-4">
            <button
             onClick={() => {
              if (sections.length === 0) {
                alert("⚠ No hay ODS registradas. Primero crea una.");
                return;
              }
            
              setSelectedSectionId(sections[0].id); // selecciona la primera sección
              setNewProject({
                title: "",
                section_id: sections[0].id,
                category: "",
                image: "",
                description: "",
              });
              setShowAddProjectModal(true);
            }}
            
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition"
            >
              <FiPlus className="text-xl" />
            </button>
          </div>
        )}
      </section>

      {/* Render de secciones/proyectos con filtro */}
      <AnimatePresence>
        {sections
          .filter((section) => {
            // Si no hay filtros => true
            if (selectedODSTitles.length === 0) return true;
            // Filtrar si section.name está en selectedODSTitles
            return selectedODSTitles.includes(section.name);
          })
          // Opcional: filtrar secciones sin proyectos
          .filter((section) => section.projects && section.projects.length > 0)
          .map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="relative p-6 overflow-visible"
            >
              <ProjectSlider
                section={section}
                projects={section.projects}
                onDeleteProject={handleDeleteProject}
                onEditProject={handleEditProject}
                isAdmin={user?.role === "admin"}
              />
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Botón Agregar ODS (admin) */}
      {user?.role === "admin" && (
        <button
          onClick={() => setShowAddODSModal(true)}
          className="mt-8 px-6 py-3 flex ml-4 bg-[var(--color-primario)] text-white rounded-full hover:bg-[#5a2fc2] transition"
        >
          <FiPlus className="mr-2" /> Agregar ODS
        </button>
      )}

      {/* Modal Crear ODS (seleccionar ODS) */}
      <ODSSelectorModal
        isOpen={showAddODSModal}
        onClose={() => setShowAddODSModal(false)}
        onSelect={handleAddODS} // handleAddODS(odsTitle)
        // NOTE: No necesitamos selectedODSs en modo "create"
        mode="create"
      />

      {/* Modal Filtrar ODS => pasamos selectedODSTitles en vez de selectedODSIds */}
      <ODSSelectorModal
        isOpen={showODSFilterModal}
        onClose={() => setShowODSFilterModal(false)}
        onSelect={(odsTitle) => toggleODSFilter(odsTitle)} // togglear string
        selectedODSs={selectedODSTitles}
        onClearFilters={() => setSelectedODSTitles([])}
        mode="filter"
      />

      {/* Botón flotante Logout/Login */}
      <button
        onClick={user ? handleLogout : () => navigate("/login")}
        className="fixed bottom-4 right-4 p-4 bg-[var(--color-primario)] text-white rounded-full shadow-lg hover:bg-[#5a2fc2] transition"
      >
        {user ? <FiLogOut className="text-2xl" /> : <FiLogIn className="text-2xl" />}
      </button>

      {/* Modal Agregar/Editar Proyectos */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-8 max-w-md h-[90vh] overflow-y-auto w-full space-y-6 relative"
          >
            <button
              onClick={() => {
                setShowAddProjectModal(false);
                setEditingProjectId(null);
                setNewProject({
                  title: "",
                  section_id: null,
                  category: "",
                  image: "",
                  description: "",
                });
                setImagePreview(null);
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <h3 className="text-2xl font-bold text-gray-900">
              {editingProjectId ? "Editar Proyecto" : "Agregar Nuevo Proyecto"}
            </h3>

            <p className="text-gray-600 mb-4">
              <strong>Sección:</strong>{" "}
              {sections.find((s) => s.id === selectedSectionId)?.name || "N/A"}
            </p>

            <input
              placeholder="Título"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primario)] text-lg"
              value={newProject.title ?? ""}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />

<select
  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primario)] text-lg"
  value={newProject.category ?? ""}
  onChange={(e) => {
    const selectedCategory = e.target.value;

    // 🔍 Buscar sección que coincida con el nombre de la categoría
    const matchingSection = sections.find((section) => section.name === selectedCategory);

    // 🔄 Actualizar categoría y sección correspondiente
    setNewProject((prev) => ({
      ...prev,
      category: selectedCategory,
    }));

    if (matchingSection) {
      setSelectedSectionId(matchingSection.id);
    } else {
      setSelectedSectionId(null); // Si no se encuentra, se borra la sección
    }
  }}
>
  <option value="">Selecciona una categoría</option>
  {categories.map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select>


            <div className="flex flex-col items-center">
              <label className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 text-center">
                <span className="text-gray-600">Subir imagen (opcional)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="mt-4 w-48 h-48 object-cover rounded-lg shadow-md"
                />
              )}
            </div>

            <textarea
              placeholder="Descripción"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primario)] text-lg"
              rows={4}
              value={newProject.description ?? ""}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddProjectModal(false);
                  setEditingProjectId(null);
                  setNewProject({
                    title: "",
                    section_id: null,
                    category: "",
                    image: "",
                    description: "",
                  });
                  setImagePreview(null);
                  setSelectedImage(null);
                }}
                className="px-5 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 text-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProject}
                className="px-5 py-2 bg-[var(--color-primario)] text-white rounded-lg hover:bg-[#5a2fc2] text-lg"
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
