import React, { useEffect, useState } from "react";
import { ProjectImpact } from "../../data/project";
import {
  addImpact,
  updateImpact,
  deleteImpact,
  getImpact,
} from "../../../api";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ImpactoForm = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const projectId = id ? Number(id) : null;

  const [impactos, setImpactos] = useState<ProjectImpact[]>([]);
  const [editing, setEditing] = useState<ProjectImpact | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  /* ------------------------------- CRUD ------------------------------- */
  const fetchImpactos = async () => {
    try {
      const data = await getImpact(projectId);
      setImpactos(data);
    } catch (err) {
      console.error("❌ Error al obtener impacto:", err);
    }
  };

  useEffect(() => {
    if (!projectId || isNaN(projectId)) {
      console.error("ID de proyecto inválido:", id);
      return;
    }
    fetchImpactos();
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description)
      return alert("Título y descripción requeridos");

    try {
      if (editing) {
        await updateImpact(
          projectId,
          editing.id!,
          { project_id: projectId, title, description },
          file || undefined,
          token
        );
      } else {
        await addImpact(
          projectId,
          { project_id: projectId, title, description },
          file || undefined,
          token
        );
      }
      setTitle("");
      setDescription("");
      setFile(null);
      setEditing(null);
      fetchImpactos();
    } catch (error) {
      console.error("❌ Error al guardar impacto:", error);
    }
  };

  const handleEdit = (impact: ProjectImpact) => {
    setEditing(impact);
    setTitle(impact.title);
    setDescription(impact.description);
  };

  const handleDelete = async (impactId: number) => {
    if (!confirm("¿Estás seguro de eliminar este impacto?")) return;
    try {
      await deleteImpact(projectId, impactId, token);
      fetchImpactos();
    } catch (err) {
      console.error("❌ Error al eliminar impacto:", err);
    }
  };

  /* ------------------------------- UI ------------------------------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* -------------------------------- Encabezado ------------------------------- */}
      <div className="border-b bg-white border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Configurar Impacto
        </h2>
        <p className="text-gray-600 text-sm">
          Añade o edita el impacto de tu proyecto.
        </p>
      </div>

      {/* -------------------------------- Formulario ------------------------------- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm p-6 space-y-4"
      >
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-primario focus:border-transparent focus:outline-0 "
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-primario focus:border-transparent focus:outline-0"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          className="w-full focus:outline-0 border border-black rounded-lg p-3"
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
              onClick={() => {
                setEditing(null);
                setTitle("");
                setDescription("");
                setFile(null);
              }}
              className="flex-1 py-3 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* -------------------------------- Lista ------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {impactos.map((impact) => (
          <motion.div
            key={impact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-200 p-4 rounded-lg bg-white hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg text-gray-900">
              {impact.title}
            </h3>
            <p className="text-gray-600 mt-1">{impact.description}</p>

            {impact.image_url && (
              <img
                src={impact.image_url}
                alt="Impacto"
                className="w-full h-48 object-cover rounded mt-3"
              />
            )}

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handleEdit(impact)}
                className="text-primario hover:text-purple-700 transition-colors"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => handleDelete(impact.id!)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ImpactoForm;
//       </div>