// src/components/Footer.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="w-full text-white">
      {/* ───── Franja principal ───── */}
      <div className="bg-[#2a2a2a] py-1">
        <div className="container mx-auto px-4">
          {/* Íconos sociales */}
          <div className="flex justify-center gap-8 my-6 sm:text-3xl text-2xl">
            <a
              href="https://www.facebook.com/FabberContinental"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.instagram.com/fablab.uc/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://fablab.ucontinental.edu.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
              aria-label="Sitio web"
            >
              <FontAwesomeIcon icon={faGlobe} />
            </a>
          </div>

          {/* Bloque “Sobre el Fab Lab” */}
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4">Sobre el Fab Lab</h3>
            <p className="text-gray-100 leading-relaxed sm:text-base text-sm">
              Somos un espacio donde podrás hacer realidad tus ideas y crear impacto positivo en la
              sociedad. Somos la única universidad en tener una red de Laboratorios de Fabricación
              Digital (Fab Lab) descentralizada en distintas ciudades del país.
            </p>
          </div>
        </div>
      </div>

      {/* ───── Bottom-bar ───── */}
      <div className="bg-[#2a2a2a] py-4 text-sm">
        <div
          className="
            container mx-auto px-4
            text-center space-y-1
            md:flex md:items-center md:justify-between md:space-y-0
          "
        >
          <p className="md:text-left md:flex-1">
            Ruta Maker&nbsp;|&nbsp;Fab Lab Universidad Continental
          </p>

          <p className="md:text-center md:flex-1">
            © 2025 Fab Lab UC — Todos los derechos reservados
          </p>

          <p className="md:text-right md:flex-1">
            Desarrollado con
            <span className="text-red-400">&nbsp;❤️&nbsp;</span>por el equipo de innovación&nbsp;|&nbsp;Universidad Continental
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
