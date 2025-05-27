import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiUpload } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import Modal from "../common/Modal";


interface HeroSectionProps {
  title: string;
  description: string;
  image: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  image,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localImage, setLocalImage] = useState<File | null>(null);

  /* --------------------------- Helpers --------------------------- */
  const handleBack = () => navigate("/grilla");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setLocalImage(e.target.files[0]);
  };

  /* ----------------------------- UI ------------------------------ */
  return (
    <section
      id="hero"
      className="
        relative
        min-h-[95vh] sm:min-h-[80vh] md:min-h-[85vh]
        flex items-center
        px-4 sm:px-6 lg:px-8
        pt-20          /* 👉 compensa navbar fija */
        text-left text-white overflow-hidden
      "
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-top"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenido */}
      <motion.div
        className="relative z-10 max-w-4xl space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* ---------- Título ---------- */}
        {isEditingTitle && user?.role === "admin" ? (
          <input
            type="text"
            value={title}
            onChange={(e) => (title = e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            className="
              w-full
              text-4xl sm:text-6xl md:text-4xl lg:text-6xl
              font-black bg-transparent border-b border-white outline-none
              placeholder-white/70
            "
            autoFocus
          />
        ) : (
          <motion.h1
            className="
              cursor-pointer
              text-3xl sm:text-4xl md:text-5xl lg:text-7xl
              font-black leading-tight
              hover:opacity-80 transition-opacity
            "
            // onClick={() => user?.role === "admin" && setIsEditingTitle(true)}
          >
            {title}
          </motion.h1>
        )}

        {/* ---------- Descripción ---------- */}
        {isEditingDescription && user?.role === "admin" ? (
          <textarea
            value={description}
            onChange={(e) => (description = e.target.value)}
            onBlur={() => setIsEditingDescription(false)}
            rows={3}
            className="
              w-full
              text-base sm:text-lg md:text-xl
              bg-transparent border-b border-white outline-none resize-none
            "
            autoFocus
          />
        ) : (
          <motion.p
            className="
              max-w-xl
              text-base sm:text-lg md:text-xl
              cursor-pointer hover:opacity-80 transition-opacity
            "
            // onClick={() =>
            //   user?.role === "admin" && setIsEditingDescription(true)
            // }
          >
            {description}
          </motion.p>
        )}

        {/* ---------- Botones ---------- */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={handleBack}
            className="
              bg-[var(--color-primario)]
              hover:bg-[#5a2fc2]
              px-4 sm:px-6 md:px-8
              py-2 sm:py-3 md:py-4
              rounded-full
              text-sm sm:text-base md:text-lg
              font-semibold transition
              cursor-pointer 
            "
          >
            Regresar a la grilla
          </button>
        </motion.div>
      </motion.div>

      {/* ---------- Modal (subir imagen) ---------- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-md space-y-4">
          <h2 className="text-lg sm:text-xl font-bold">Cambiar imagen</h2>

          <label className="block cursor-pointer">
            <div className="flex items-center justify-center w-full p-6 border-2 border-dashed rounded-lg text-gray-600 hover:border-gray-400">
              <FiUpload className="mr-2 text-xl" />
              {localImage ? localImage.name : "Selecciona una imagen"}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default HeroSection;
