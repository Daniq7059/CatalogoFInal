// src/pages/RandomProjectsPage.tsx

import React, { useEffect, useState } from "react";
import { ProjectCard } from "../grid/ProjectCard";
import { ODS_CATEGORIES } from "../grid/ODSSelectorModal";
import { useNavigate } from "react-router-dom";

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

interface RandomProjectsPageProps {
  allProjects: Project[]; // Este prop viene desde el router o un fetch
}

const shuffleArray = (array: Project[]): Project[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const RandomProjectsPage: React.FC<RandomProjectsPageProps> = ({ allProjects }) => {
  const [randomProjects, setRandomProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (allProjects && allProjects.length > 0) {
      const shuffled = shuffleArray(allProjects);
      setRandomProjects(shuffled.slice(0, 8));
    }
  }, [allProjects]);

  const handleProjectClick = (project: Project) => {
    navigate(`/project/${project.id}`, { state: { project } });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Proyectos Destacados al Azar</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {randomProjects.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer"
            onClick={() => handleProjectClick(project)}
          >
            <ProjectCard
              title={project.title}
              category={project.category}
              image={project.image}
              odsIcon={project.odsIcon ?? ""}
              odsColor={project.odsColor ?? "#000000"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
