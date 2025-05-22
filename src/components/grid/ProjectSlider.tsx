import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from "./ProjectCard";
import { ODS_CATEGORIES } from "./ODSSelectorModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* ---------------------------- Tipos ---------------------------- */
interface Project { /* …igual… */ }
interface ProjectSection { /* …igual… */ }
interface ProjectSliderProps { /* …igual… */ }

/* ---------------------- Utilidad breakpoint --------------------- */
const getCardWidth = () => {
  const w = window.innerWidth;
  if (w < 640) return 260;   // < sm
  if (w < 768) return 300;   // sm
  if (w < 1024) return 320;  // md
  return 360;                // lg +
};

export const ProjectSlider: React.FC<ProjectSliderProps> = ({
  section,
  projects,
  onDeleteProject,
  onEditProject,
  isAdmin,
}) => {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  /* ---------------------- Constantes de diseño ----------------- */
  const GAP = 10;               // espacio entre cards
  const ARROW = 40;             // diámetro del botón flecha
  const AUTO_PLAY_MS = 4000;

  /* --------------------------- Estado --------------------------- */
  const [cardWidth, setCardWidth] = useState(getCardWidth());          // ← ¡dinámico!
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* --------------------- ODS (sin cambios) --------------------- */
  const odsCategory = ODS_CATEGORIES.find(
    (ods) => ods.title.toLowerCase() === section.name.toLowerCase()
  );

  /* ------------- Actualizar medias en resize ------------------- */
  const recalc = useCallback(() => {
    const newCardWidth = getCardWidth();
    setCardWidth(newCardWidth);

    // ¿cuántas caben visiblemente dentro del carrusel?
    if (carouselRef.current) {
      const visible = Math.max(
        1,
        Math.floor((carouselRef.current.offsetWidth + GAP) / (newCardWidth + GAP))
      );
      setCardsPerView(visible);
      // Evitar quedar en un índice fuera de rango cuando el layout cambia
      setCurrentIndex((idx) =>
        Math.min(idx, Math.max(projects.length - visible, 0))
      );
    }
  }, [projects.length]);

  useEffect(() => {
    recalc();                         // cálculo inicial
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [recalc]);

  const cardTotalWidth = cardWidth + GAP;

  /* -------------- Desplazar al cambiar índice ------------------ */
  useEffect(() => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollTo({
      left: currentIndex * cardTotalWidth,
      behavior: "smooth",
    });
  }, [currentIndex, cardTotalWidth]);

  /* ------------------------ Autoplay --------------------------- */
  useEffect(() => {
    if (isPaused || projects.length <= cardsPerView) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = projects.length - cardsPerView;
        return prev >= maxIndex ? 0 : prev + cardsPerView;
      });
    }, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, projects.length, cardsPerView]);

  /* ---------------- Navegación manual ------------------------- */
  const maxIndex = Math.max(projects.length - cardsPerView, 0);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - cardsPerView));

  const handleNext = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + cardsPerView));

  const handleProjectClick = (project: Project) =>
    navigate(`/project/${project.id}`, { state: { project } });

  if (!projects.length) return null;

  /* ========================= Render ============================ */
  return (
    <section
      className="relative my-8 md:my-10 lg:my-5 px-4 sm:px-6 lg:px-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ------------------------- Título ------------------------ */}
      <h2 className="
            text-2xl sm:text-3xl lg:text-4xl 
            font-bold mb-6 text-gray-800">
        {odsCategory?.title || section.name}
      </h2>

      {/* Flecha izquierda */}
      {projects.length > cardsPerView && (
        <button
          onClick={handlePrev}
          className="absolute -left-5 top-1/2 -translate-y-1/2
                     p-2 rounded-full bg-white shadow text-gray-700
                     hover:bg-gray-200 z-40"
        >
          <FaChevronLeft size={ARROW} />
        </button>
      )}

      {/* ----------------------- Carrusel ----------------------- */}
      <div
        ref={carouselRef}
        className="relative w-full max-w-[1470px] mx-auto
                   whitespace-nowrap no-scrollbar overflow-x-hidden
                   "
      >
        <div className="inline-flex" style={{ gap: GAP }}>
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => handleProjectClick(p)}
              style={{ width: cardWidth }}
              className="inline-block 
                         group relative origin-bottom
                         transition-transform duration-500 ease-in-out
                         hover:scale-95
                       rounded-xl
                         "
            >
              <ProjectCard
                title={p.title}
                category={p.category}
                image={p.image}
                
                onClick={() => handleProjectClick(p)}
  odsIcons={p.odsIcons} // ✅ Ya vienen calculados

              />

{isAdmin && (
    <div
      className="absolute bottom-0 left-0 right-0 p-2 flex gap-2
                 opacity-0 pointer-events-none
                 group-hover:opacity-100 group-hover:pointer-events-auto
                 z-20 transition-opacity"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteProject?.(p.id);
        }}
        className="px-2 py-1 bg-red-100 text-red-600 rounded
                   hover:bg-red-200 text-xs sm:text-sm"
      >
        Eliminar
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEditProject?.(p);
        }}
        className="px-2 py-1 bg-gray-100 text-gray-700 rounded
                   hover:bg-gray-200 text-xs sm:text-sm"
      >
        Editar
      </button>
    </div>
  )}
            </div>
          ))}
        </div>
      </div>

      {/* Flecha derecha */}
      {projects.length > cardsPerView && (
        <button
          onClick={handleNext}
          className="absolute -right-5 top-1/2 -translate-y-1/2
                     p-2 rounded-full bg-white shadow text-gray-700
                     hover:bg-gray-200 z-10"
        >
          <FaChevronRight size={ARROW} />
        </button>
      )}
    </section>
  );
};


