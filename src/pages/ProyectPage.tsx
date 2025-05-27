// src/pages/ProjectPage.tsx
import React, { useState, useEffect, useLayoutEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/proyect/HeroSection";
import { AdvantagesSection } from "../components/proyect/AdvantagesSection";
import { FeaturesSection } from "../components/proyect/FeaturesSection";
import WorkflowSection from "../components/proyect/WorkflowSection";
import ImpactoSection from "../components/proyect/ImpactoSection";
import TeamSection from "../components/proyect/TeamSection";
import InvestigacionSection from "../components/proyect/InvestigacionSection";
import ContactForm from "../components/proyect/ContactForm";
import Footer from "../components/Footer";
import ProjectForm from "../components/Forms/ProjectForm";
import { ProjectData, initialProjectData } from "../data/project";
import { useAuth } from "../context/AuthContext";
import { FiSettings } from "react-icons/fi";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getProjectById, deleteAdvantage, getProjectConfig } from "../../api";
import { motion, AnimatePresence } from "framer-motion";

const ProjectPage: React.FC = () => {
  const { user, token } = useAuth();
  const navigate       = useNavigate();
  const { id }         = useParams<{ id: string }>();
  const location       = useLocation();

  const [project, setProject]           = useState<ProjectData>(initialProjectData);
  const [showForm, setShowForm]         = useState(false);
  const [workflowVersion, setWorkflowVersion] = useState(0);
  const [showFlags, setShowFlags] = useState({
    showAdvantages: false,
    showFeatures: false,
    showWorkflow: false,
    showTeam: false,
    showContact: false,
    showImpacto: false,
    showInvestigacion: false,
  });

  /* ---------------- Bloqueo de scroll cuando modal está abierto ---------------- */
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showForm]);

  /* ---------------- Arranca la página en la parte superior ---------------- */
  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  /* ---------------- Cargar flags de configuración ---------------- */
  useEffect(() => {
    async function loadConfig() {
      if (!id) return;
      const cfg = await getProjectConfig(id, token || undefined);
      setShowFlags({
        showAdvantages: !!cfg.showAdvantages,
        showFeatures:   !!cfg.showFeatures,
        showWorkflow:   !!cfg.showWorkflow,
        showTeam:       !!cfg.showTeam,
        showContact:    !!cfg.showContact,
        showImpacto:    !!cfg.showImpacto,
        showInvestigacion: !!cfg.showInvestigacion,
      });
    }
    loadConfig();
  }, [id, token]);

  /* ---------------- Cargar datos del proyecto ---------------- */
  useEffect(() => {
    async function loadProject() {
      if (location.state?.project) {
        setProject(location.state.project as ProjectData);
      } else if (id) {
        setProject(await getProjectById(id));
      }
    }
    loadProject();
  }, [id, location.state]);

  /* ---------------- Eliminar ventaja ---------------- */
  const handleDeleteAdvantage = async (advId: number) => {
    if (!user || !token) return alert("Debes iniciar sesión para eliminar ventajas");
    if (!confirm("¿Eliminar esta ventaja?")) return;

    await deleteAdvantage(project.id, advId, token);
    setProject(p => ({
      ...p,
      advantages: p.advantages?.filter(a => a.id !== advId) || [],
    }));
  };

  /* ---------------- Actualiza flags desde el formulario ---------------- */
  const handleUpdateFlags = (newFlags: typeof showFlags) => setShowFlags(newFlags);

  /* ===================================================================== */
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar project={project} flags={showFlags} />

      {/* Hero */}
      <section id="hero" className="mt-0">
        <Hero title={project.title} image={project.image} description={project.description} />
      </section>

      {/* Secciones */}
      <main className="flex-grow pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
        {/* Ventajas */}
        <AnimatePresence>
          {showFlags.showAdvantages && (
            <motion.div
              id="ventajas"
              key="advantages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-12"
            >
              <AdvantagesSection
                projectId={id}
                title={project.advantagesTitle}
                subtitle={project.advantagesSubtitle}
                advantages={project.advantages || []}
                onUpdate={upd => setProject(p => ({ ...p, advantages: upd }))}
                onDelete={handleDeleteAdvantage}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Características */}
        <AnimatePresence>
          {showFlags.showFeatures && (
            <motion.div
              id="caracteristicas"
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-16"
            >
              <FeaturesSection
                key={project.features?.length ?? 0}
                projectId={project.id}
                featuresTitle={project.featuresTitle}
                featuresSubtitle={project.featuresSubtitle}
                features={project.features}
                stats={project.stats}
                featuresVideoUrl={project.featuresVideoUrl}
                onEdit={() => setShowForm(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Workflow */}
        {showFlags.showWorkflow && (
          <div id="proceso" className="mt-16">
            <WorkflowSection
              key={workflowVersion}
              projectId={project.id}
              workflow={project.workflow}
              workflowTitle={project.workflowTitle}
              workflowSubtitle={project.workflowSubtitle}
              onEdit={() => setShowForm(true)}
              version={workflowVersion}
            />
          </div>
        )}

        {/* Equipo */}
        {showFlags.showTeam && (
          <div id="equipo" className="mt-16">
            <TeamSection
              project={project}
              setProject={setProject}
              onEdit={() => setShowForm(true)}
            />
          </div>
        )}

        {/* Impacto */}
        {showFlags.showImpacto && (
          <div id="impacto" className="mt-16">
            <ImpactoSection projectId={Number(id)} />
          </div>
        )}

        {/* Investigación */}
        {showFlags.showInvestigacion && (
          <div id="investigacion" className="mt-16">
            <InvestigacionSection projectId={Number(id)} />
          </div>
        )}

        {/* Contacto */}
        {showFlags.showContact && (
          <div id="contacto" className="mt-16">
            <ContactForm email={project.contactEmail} />
          </div>
        )}
      </main>

      <Footer />

      {/* Botón flotante admin */}
      {user?.role === "admin" && (
        <button
          onClick={() => setShowForm(f => !f)}
          className="fixed bottom-8 right-8 bg-primario text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition"
        >
          <FiSettings className="text-2xl" />
        </button>
      )}

      {/* Modal de edición */}
      {user?.role === "admin" && showForm && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-start justify-center
                     overflow-y-auto p-6 z-[1000]"
          onClick={e => e.target === e.currentTarget && setShowForm(false)}
        >
          <div
            className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-6
                       mt-10 sm:mt-16 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <ProjectForm
              project={project}
              setProject={setProject}
              onFinish={() => setShowForm(false)}
              onUpdateFlags={handleUpdateFlags}
              onWorkflowUpdated={() => setWorkflowVersion(v => v + 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
