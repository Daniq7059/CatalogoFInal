/* -----------------------------------------------------------
   InvestigacionSection.tsx
------------------------------------------------------------*/
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectResearch } from "../../data/project";
import { getResearch } from "../../../api";

interface InvestigacionSectionProps {
  projectId: number;
}

/* ---------- Animaciones ---------- */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5 },
  }),
};

const InvestigacionSection = ({ projectId }: InvestigacionSectionProps) => {
  const [items, setItems] = useState<ProjectResearch[]>([]);
  const [loading, setLoading] = useState(true);

  /* --- Carga --- */
  useEffect(() => {
    (async () => {
      try {
        const data = await getResearch(projectId);
        setItems(data);
      } catch (err) {
        console.error("Error cargando investigaciones:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [projectId]);

  /* --- Grid dinámico igual que en TeamSection --- */
  const gridCols = (() => {
    const n = items.length;
    if (n === 1) return "grid-cols-1";
    if (n === 2) return "grid-cols-2";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2";
  })();

  /* -------------------------------------------------------- */
  return (
    <section id="investigacion" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* ---------- Heading ---------- */}
        <h2 className="section-heading text-center">Investigaciones</h2>
        <motion.p
          className="text-[var(--color-primario)] text-lg md:text-2xl text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Publicaciones y referencias académicas que respaldan este proyecto.
        </motion.p>

        {/* ---------- Loader ---------- */}
        {loading && (
          <ul className={`grid ${gridCols} gap-8`}>
            {Array.from({ length: 3 }).map((_, i) => (
              <li
                key={i}
                className="h-48 rounded-2xl bg-gray-100/60 dark:bg-gray-700/30 animate-pulse"
              />
            ))}
          </ul>
        )}

        {/* ---------- Contenido ---------- */}
        {!loading && items.length > 0 && (
          <ul className={`grid ${gridCols} gap-8`}>
            <AnimatePresence>
              {items.map((it, idx) => (
                <motion.li
                  key={it.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  custom={idx}
                  className="group relative bg-white/90 white
                             backdrop-blur rounded-2xl shadow
                             hover:shadow-lg transition-shadow p-8 flex flex-col"
                >
                  {/* Título */}
                  <h3 className="font-semibold text-lg mb-3 text-slate-800 dark:text-black  font-bold leading-tight text-xl sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl">
                    {it.title}
                  </h3>

                  {/* Enlace */}
                  <a
                    href={it.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 text-sm sm:text-sm md:text-sm lg:text-1xl xl:text-2xl dark:text-indigo-400
                               hover:underline font-medium mb-4 text-sm"
                  >
                    Ver publicación
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 3.293a1 1 0 0 1 1.414 0L18 7.586a1 1 0 0 1 0 1.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L14.586 9H4a1 1 0 1 1 0-2h10.586l-2.293-2.293a1 1 0 0 1 0-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>

                  {/* Copyright */}
                  <p className="mt-auto text-xs text-gray-500 text-sm dark:text-gray-400">
                    © {it.copyright || "Creative Commons"}
                  </p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        {/* ---------- Sin resultados ---------- */}
        {!loading && items.length === 0 && (
          <p className="text-center text-gray-500">
            No se encontraron investigaciones para este proyecto.
          </p>
        )}
      </div>
    </section>
  );
};

export default InvestigacionSection;
