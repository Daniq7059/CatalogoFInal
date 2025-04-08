import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from "./ProjectCard";
import { ODS_CATEGORIES } from "./ODSSelectorModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  section_id?: string;
  odsIcon?: string;
  odsColor?: string;
}

interface ProjectSection {
  id: string;
  name: string;
  image_url?: string;
  odsId?: number;
}

interface ProjectSliderProps {
  section: ProjectSection;
  projects: Project[];
  onDeleteProject?: (projectId: string) => void;
  onEditProject?: (project: Project) => void;
  isAdmin?: boolean;
}

export const ProjectSlider: React.FC<ProjectSliderProps> = ({
  section,
  projects,
  onDeleteProject,
  onEditProject,
  isAdmin,
}) => {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  const CARD_WIDTH = 300;
  const GAP = 16;
  const cardTotalWidth = CARD_WIDTH + GAP;

  // Buscar el ODS que coincida con el nombre de la sección (opcional)
  const odsCategory = ODS_CATEGORIES.find(
    (ods) => ods.title.toLowerCase() === section.name.toLowerCase()
  );

  useEffect(() => {
    const updateCardsPerView = () => {
      if (!carouselRef.current) return;
      const containerWidth = carouselRef.current.clientWidth;
      const newCardsPerView = Math.floor(containerWidth / cardTotalWidth);
      setCardsPerView(newCardsPerView || 1);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, [cardTotalWidth]);

  useEffect(() => {
    if (!carouselRef.current) return;
    const scrollPosition = currentIndex * cardTotalWidth;
    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, [currentIndex, cardTotalWidth]);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev - cardsPerView;
      return nextIndex < 0 ? 0 : nextIndex;
    });
  };

  const handleNext = () => {
    const maxIndex = projects.length - cardsPerView;
    setCurrentIndex((prev) => {
      const nextIndex = prev + cardsPerView;
      return nextIndex > maxIndex ? maxIndex : nextIndex;
    });
  };

  const showPrevArrow = currentIndex > 0;
  const showNextArrow = currentIndex < projects.length - cardsPerView;

  const handleProjectClick = (project: Project) => {
    navigate(`/project/${project.id}`, { state: { project } });
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="relative my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        {odsCategory?.title || section.name || "Proyectos"}
      </h2>

      {showPrevArrow && (
        <button
          onClick={handlePrev}
          className="
            absolute left-0 top-1/2
            -translate-y-1/2 p-2
            rounded-full bg-white
            text-gray-700 shadow
            hover:bg-gray-200 z-10
          "
        >
          <FaChevronLeft size={20} />
        </button>
      )}

      <div
        ref={carouselRef}
        className="
          relative w-full
          whitespace-nowrap
          scroll-smooth
          no-scrollbar
          overflow-x-hidden
        "
      >
        <div className="inline-flex" style={{ gap: `${GAP}px` }}>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="
                inline-block
                w-[300px]
                cursor-pointer
                group
                relative
                z-0
                origin-bottom
                transition-transform
                duration-1000
                ease-in-out
                hover:z-10
                hover:scale-101
              "
            >
              <ProjectCard
                title={project.title}
                category={project.category}
                image={project.image}
                odsIcon={project.odsIcon ?? ""}
                odsColor={project.odsColor ?? "#000000"}
              />

              {isAdmin && (
                <div
                  className="
                    mt-2 flex gap-2 justify-start
                    absolute bottom-0 left-0 right-0 p-2
                    hover:scale-101
                    rounded-b-lg
                    z-20
                  "
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteProject?.(project.id);
                    }}
                    className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-s"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditProject?.(project);
                    }}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 text-s"
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showNextArrow && (
        <button
          onClick={handleNext}
          className="
            absolute right-0 top-1/2
            -translate-y-1/2 p-2
            rounded-full bg-white
            text-gray-700 shadow
            hover:bg-gray-200 z-10
          "
        >
          <FaChevronRight size={20} />
        </button>
      )}
    </section>
  );
};
