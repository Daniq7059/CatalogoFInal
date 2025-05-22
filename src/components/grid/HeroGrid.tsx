import { useEffect, useMemo, useState, ReactNode } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";

interface Project {
  id?: string;
  title: string;
  image: string;
  description: string;
}

type HeroGridProps = {
  projects: Project[];
  ctaButtons?: ReactNode;
  isAdmin?: boolean;
  onSave?: (newData: { title: string; description: string; image: string }) => void;
};

export const HeroGrid: React.FC<HeroGridProps> = ({
  projects = [],
  ctaButtons,
  isAdmin = false,
  onSave,
}) => {
  /* -------------------- 1. Elegir 5 proyectos aleatorios ------------------- */
  const randomProjects = useMemo<Project[]>(() => {
    return [...projects]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(5, projects.length));
  }, [projects]);

  /* ------------------------------ estado ------------------------------ */
  const validProjects = randomProjects.filter((p) => Boolean(p.image));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const featuredProject = validProjects[currentIndex];
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const truncateChars = (text: string, limit: number): string => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  const currentBackground = imagePreview || featuredProject?.image || "";
  const currentTitle = isEditing
    ? updatedTitle
    : truncateChars(featuredProject?.title || "", 10);

  const currentDescription = isEditing
    ? updatedDescription
    : truncateChars(featuredProject?.description || "", 400);


  /* ------------------------- Carrusel automático ------------------------- */
  useEffect(() => {
    if (validProjects.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [validProjects]);

  /* ------------ Resetea campos cuando cambia la tarjeta ----------------- */
  useEffect(() => {
    setUpdatedTitle(featuredProject?.title || "");
    setUpdatedDescription(featuredProject?.description || "");
    setImagePreview(null);
    setIsEditing(false);
  }, [currentIndex, featuredProject]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const file = e.target.files[0];
      await new Promise((res) => setTimeout(res, 1000));
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    if (updatedTitle.trim() && updatedDescription.trim()) {
      onSave?.({
        title: updatedTitle,
        description: updatedDescription,
        image: imagePreview || featuredProject?.image || "",
      });
      setIsEditing(false);
    } else {
      document.querySelectorAll(".hero-edit-input").forEach((input) => {
        if (!(input as HTMLInputElement).value) {
          input.parentElement?.classList.add("animate-shake");
          setTimeout(() => input.parentElement?.classList.remove("animate-shake"), 500);
        }
      });
    }
  };

  /* ------------------------------ Animaciones ------------------------------ */
  const containerVariants = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.2 },
    show: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80, rotate: -3 },
    show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -40 },
  };

  /* ------------------------------------------------------------------------ */
  return (
    <section
      className="relative
                 h-[65vh] sm:h-[70vh] lg:h-[75vh] xl:h-[80vh] 2xl:h-[85vh]
                 flex items-center justify-start text-left text-white
                 overflow-hidden
                 px-4 sm:px-6 lg:px-8"
    >
      {/* -------------------------- Imagen de fondo -------------------------- */}
      <motion.div
        className="absolute inset-0 bg-cover bg-no-repeat bg-top z-0"
        style={{ backgroundImage: `url('${currentBackground}')` }}
        variants={backgroundVariants}
        initial="hidden"
        animate="show"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />

        {isAdmin && (
          <motion.label
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 cursor-pointer transition-opacity"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={!isEditing}
            />
            <motion.div
              animate={isUploading ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-2xl"
            >
              {isUploading ? (
                <div className="w-8 h-8 border-4 border-white/50 border-t-white rounded-full" />
              ) : (
                <FontAwesomeIcon icon={faUpload} className="text-4xl opacity-75" />
              )}
            </motion.div>
          </motion.label>
        )}
      </motion.div>

      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* -------------------------- Contenido UI -------------------------- */}
      <LayoutGroup>
        <motion.div
          className="relative z-20
                     max-w-3xl sm:max-w-4xl
                     px-4 sm:px-6 lg:px-8
                     flex flex-col items-start
                     space-y-6 sm:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          layout
        >
          {/* ----------------------- Botones de edición ----------------------- */}
          {isAdmin && (
            <motion.div
              className="flex gap-2 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg"
                  onClick={() => setIsEditing(true)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-green-500/80 backdrop-blur-sm rounded-lg"
                    onClick={handleSave}
                  >
                    <FontAwesomeIcon icon={faSave} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-red-500/80 backdrop-blur-sm rounded-lg"
                    onClick={() => setIsEditing(false)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </motion.button>
                </>
              )}
            </motion.div>
          )}

          {/* ---------------------------- Título ---------------------------- */}
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="edit-title"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={itemVariants}
                className="w-full"
              >
                <input
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className="hero-edit-input w-full bg-transparent
                             text-4xl sm:text-5xl md:text-7xl xl:text-8xl
                             font-black
                             border-b-2 border-white/50
                             focus:outline-none focus:border-white"
                />
              </motion.div>
            ) : (
              <motion.h1
                key="title"
                className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl
                           font-black leading-tight"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={itemVariants}
              >
                {currentTitle}
              </motion.h1>
            )}
          </AnimatePresence>

          {/* ------------------------- Descripción -------------------------- */}
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="edit-desc"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={itemVariants}
                className="w-full"
              >
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="hero-edit-input w-full bg-transparent
                             text-base sm:text-lg md:text-xl
                             border-b-2 border-white/50
                             focus:outline-none focus:border-white
                             resize-none"
                  rows={3}
                />
              </motion.div>
            ) : (
              <motion.p
                key="description"
                className="text-base sm:text-lg md:text-xl max-w-2xl"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={itemVariants}
              >
                {currentDescription}
              </motion.p>
            )}
          </AnimatePresence>

          {/* ------------------------- CTA Buttons -------------------------- */}
          {ctaButtons && (
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={itemVariants}
            >
              {ctaButtons}
            </motion.div>
          )}
        </motion.div>
      </LayoutGroup>

      {/* ----------------------- Paginación del carrusel ---------------------- */}
      {validProjects.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
          <div className="flex gap-3">
            {validProjects.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Mostrar slide ${idx + 1} de ${validProjects.length}`}
                className="relative w-8 h-2 rounded-full overflow-hidden
                           bg-white/25 focus:outline-none group"
                aria-current={idx === currentIndex}
                onClick={() => setCurrentIndex(idx)}
              >
                {/* Pill interna */}
                <span
                  className={`absolute inset-0 bg-white
                               ${idx === currentIndex ? "animate-slideLoader" : "w-0"}`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
