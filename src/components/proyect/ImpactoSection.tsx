import { useEffect, useState } from "react";
import { ProjectImpact } from "../../data/project";
import { getImpact } from "../../../api";
import { motion, AnimatePresence } from "framer-motion";

interface ImpactoSectionProps {
  projectId: number;
}

const ImpactoSection = ({ projectId }: ImpactoSectionProps) => {
  const [impactos, setImpactos] = useState<ProjectImpact[]>([]);

  useEffect(() => {
    if (!projectId) return;
    (async () => {
      try {
        const data = await getImpact(projectId);
        setImpactos(data);
      } catch (err) {
        console.error("❌ Error al cargar impactos:", err);
      }
    })();
  }, [projectId]);

  return (
    <section id="impacto" className=" bg-[#F8F8F8]">
      <div className="container mx-auto px-4">
        {/* ---------- Encabezado ---------- */}
        <motion.h3
          className="text-7xl font-bold text-gray-900 text-center mb-4 py-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Impacto del Proyecto
        </motion.h3>

        {/* ---------- Contenido ---------- */}
        {impactos.length === 0 ? (
          <p className="text-center text-gray-600">
            No hay impactos registrados.
          </p>
        ) : (
          <AnimatePresence>
            {impactos.map((impact) => (
              <motion.div
                key={impact.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                /* ---- CARD ---- */
                className="mb-16 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Flex para dividir imagen / texto */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 p-8 items-center">
                  {/* Imagen a la izquierda */}
                  {impact.image_url && (
                    <img
                      src={
                        impact.image_url.startsWith("http")
                          ? impact.image_url
                          : `http://localhost:5000${impact.image_url}`
                      }
                      alt={impact.title}
                      className="w-full lg:w-[40%] h-72 lg:h-80 object-cover rounded-xl"
                    />
                  )}

                  {/* Texto a la derecha */}
                  <div className="flex-1 space-y-6">
                    <h4 className="text-4xl font-bold text-gray-900">
                      {impact.title}
                    </h4>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {impact.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default ImpactoSection;
