/* -----------------------------------------------------------
   InvestigacionForm.tsx
------------------------------------------------------------*/
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectResearch } from "../../data/project";
import {
  getResearch,
  addResearch,
  updateResearch,
  deleteResearch,
} from "../../../api";
import { useAuth } from "../../context/AuthContext";

interface InvestigacionFormProps {
  projectId: number;
}

const InvestigacionForm = ({ projectId }: InvestigacionFormProps) => {
  const { token } = useAuth();
  const [researchList, setResearchList] = useState<ProjectResearch[]>([]);
  const [editing, setEditing] = useState<ProjectResearch | null>(null);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [copyright, setCopyright] = useState("CC");

  /* ---------- CRUD helpers ---------- */
  const loadResearch = async () => {
    try {
      const data = await getResearch(projectId);
      setResearchList(data);
    } catch (err) {
      console.error("❌ Error al cargar investigaciones:", err);
    }
  };

  useEffect(() => {
    loadResearch();
  }, [projectId]);

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setLink("");
    setCopyright("CC");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !link) return alert("Título y enlace requeridos");

    try {
      const payload = { title, link, copyright, project_id: projectId };
      if (editing?.id) {
        await updateResearch(projectId, editing.id, payload, token);
      } else {
        await addResearch(projectId, payload, token);
      }
      resetForm();
      loadResearch();
    } catch (err) {
      console.error("❌ Error al guardar:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar esta investigación?")) return;
    try {
      await deleteResearch(projectId, id, token);
      resetForm();
      loadResearch();
    } catch (err) {
      console.error("❌ Error al eliminar investigación:", err);
    }
  };

  /* ---------- UI ---------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Encabezado */}
      <div className="border-b bg-white border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Configurar Investigaciones
        </h2>
        <p className="text-gray-600 text-sm">
          Añade, edita o elimina las investigaciones que respaldan tu proyecto.
        </p>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm p-6 space-y-4"
      >
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-primario focus:border-transparent focus:outline-0"
        />
        <input
          placeholder="Enlace (URL)"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-primario focus:border-transparent focus:outline-0"
        />
        <input
          placeholder="Licencia (ej. CC, MIT…)"
          value={copyright}
          onChange={(e) => setCopyright(e.target.value)}
          className="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-primario focus:border-transparent focus:outline-0"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 rounded-lg text-white bg-primario hover:bg-purple-600 transition-colors"
          >
            {editing ? "Actualizar" : "Agregar"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 py-3 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {researchList.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-200 p-4 rounded-lg bg-white hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {item.link}
            </a>
            <p className="text-xs text-gray-500 mt-1">
              Licencia: {item.copyright || "CC"}
            </p>

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => {
                  setEditing(item);
                  setTitle(item.title);
                  setLink(item.link);
                  setCopyright(item.copyright || "CC");
                }}
                className="text-primario hover:text-purple-700 transition-colors"
                aria-label="Editar"
              >
                ✎
              </button>
              <button
                onClick={() => handleDelete(item.id!)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Eliminar"
              >
                🗑
              </button>
            </div>
          </motion.div>
        ))}

        {researchList.length === 0 && (
          <p className="text-gray-500">Aún no hay investigaciones.</p>
        )}
      </div>
    </motion.div>
  );
};

export default InvestigacionForm;
