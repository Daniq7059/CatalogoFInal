-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2025 a las 08:15:46
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `continental_proyectos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `advantages`
--

CREATE TABLE `advantages` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `section_title` varchar(255) DEFAULT NULL,
  `section_subtitle` text DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) NOT NULL,
  `stat` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `advantages`
--

INSERT INTO `advantages` (`id`, `project_id`, `section_title`, `section_subtitle`, `title`, `description`, `icon`, `stat`, `created_at`, `updated_at`) VALUES
(7, 11, 'dasdas', 'dasdasdasd', 'FFFFF', 'hola233333', 'FiCode', 'dasdaqweqweqwe', '2025-03-20 13:55:20', '2025-03-20 17:29:48'),
(16, 11, 'dasdas', 'dasdasdasd', 'hlhjj', 'hoh', '\"FiStar\"', '78', '2025-03-25 14:51:13', '2025-03-25 14:51:13'),
(17, 11, 'dasdas', 'dasdasdasd', 'dsdas', 'asdasd', '\"FiHeart\"', '23', '2025-03-25 15:18:35', '2025-03-25 15:18:35'),
(23, 40, '', '', 'Aprendizaje práctico y significativo', 'Facilita la participación activa de niños en diseño y programación, fomentando curiosidad y creatividad.\n', 'FiEdit', '90% niños interesados en robótica tras talleres.', '2025-05-21 05:10:34', '2025-05-22 05:12:20'),
(24, 40, '', '', 'Diseño optimizado y funcional', 'Estructura de montaje rápido y carcasa personalizada para transporte, asegurando durabilidad y facilidad de uso.', 'FiTrendingUp', '95% éxito en montaje rápido.', '2025-05-21 05:11:11', '2025-05-22 05:12:34'),
(25, 40, '', '', 'Fomento de habilidades interdisciplinarias', 'Mejora pensamiento computacional, trabajo en equipo y creatividad, fortaleciendo habilidades sociales y técnicas.', 'FiUsers', '80% adquirieron habilidades colaborativas.', '2025-05-21 05:11:58', '2025-05-22 05:30:57'),
(26, 41, '', '', 'Alfabetización tecnológica inclusiva', 'Herramientas adaptadas para diferentes habilidades y necesidades educativas, promoviendo igualdad y participación.', 'FiEdit', ' 85% mejoraron alfabetización tecnológica.', '2025-05-21 05:19:46', '2025-05-22 05:13:38'),
(27, 41, '', '', 'Enfoque en inteligencia espacial', 'Actividades de navegación y reconocimiento para mejorar habilidades cognitivas, fomentando orientación y percepción espacial.', 'FiCompass', '75% avanzaron en orientación espacial.', '2025-05-21 05:20:16', '2025-05-22 05:14:38'),
(28, 41, '', '', 'Accesibilidad para discapacidad visual', 'Incorpora Braille para inclusión y participación activa, asegurando accesibilidad educativa universal.', 'FiUsers', '90% niños con discapacidad visual beneficiados.', '2025-05-21 05:20:43', '2025-05-22 05:14:52'),
(29, 42, '', '', 'Promoción del reciclaje activo', 'Sistema interactivo para reconocimiento y clasificación de residuos, incentivando hábitos ambientales responsables.', 'FiRefreshCcw', '40% aumento reciclaje en escuelas.', '2025-05-21 05:27:51', '2025-05-22 05:31:32'),
(30, 42, '', '', 'Tecnología avanzada y educativa', 'Interacción por voz y programación para enseñar reciclaje, facilitando aprendizaje práctico y dinámico.', 'FiCpu', '85% aprendieron a clasificar residuos.', '2025-05-21 05:28:13', '2025-05-22 05:39:54'),
(31, 42, '', '', 'Innovación educativa comunitaria', 'Mejora concientización ambiental en escuelas y comunidades, fortaleciendo compromiso social y ambiental.', 'FiBook', '70% comunidades más participativas en reciclaje.', '2025-05-21 05:28:32', '2025-05-22 05:39:24'),
(32, 43, '', '', 'Mejora productividad agrícola', 'Procesa 150 kg maíz por hora eficientemente, acelerando trabajo agrícola tradicional.', '\"FiZap\"', '60% incremento en productividad.', '2025-05-22 01:49:37', '2025-05-22 01:49:37'),
(33, 43, '', '', 'Diseño modular eficiente', 'Alimentación manual, desgranado delicado y clasificación robusta, optimizando procesos productivos.', '\"FiHeart\"', '25% menos daño en granos.', '2025-05-22 01:49:54', '2025-05-22 01:49:54'),
(34, 43, '', '', 'Ahorro energético', 'Motor eléctrico eficiente y bajo consumo, ideal para zonas rurales.', 'FiRefreshCcw', '30% reducción en consumo eléctrico.', '2025-05-22 01:52:24', '2025-05-22 05:11:46'),
(35, 44, '', '', 'Innovación mecánica artística', 'Mecanismo articulado para movimiento eficiente y fluido, basado en diseños inspiradores y funcionales.', 'FiTool', '85% usuarios valoraron locomoción eficiente.', '2025-05-22 02:21:01', '2025-05-22 05:15:31'),
(36, 44, '', '', 'Control inalámbrico intuitivo', 'Control remoto sencillo con cuatro botones, facilitando interacción y aprendizaje.', 'FiCpu', '95% controlaron robot sin dificultad.', '2025-05-22 02:21:20', '2025-05-22 05:16:07'),
(37, 44, '', '', 'Aplicación educativa avanzada', 'Favorece aprendizaje en robótica, mecánica y electrónica, potenciando habilidades técnicas y creativas.', 'FiSmartphone', '80% estudiantes mejoraron conocimientos.', '2025-05-22 02:21:34', '2025-05-22 05:23:05'),
(38, 45, '', '', 'Arte y tecnología integrados', 'Movimientos fluidos que educan y cautivan visualmente, promoviendo apreciación estética y científica.', 'FiPenTool', '80% visitantes comprendieron conceptos físicos.', '2025-05-22 02:27:40', '2025-05-22 05:27:02'),
(39, 45, '', '', 'Ilustración de principios físicos', 'Demuestra física, equilibrio y dinámica con movimiento visual, facilitando comprensión experimental y sensorial.', 'FiSettings', ' 90% estudiantes mejoraron comprensión.', '2025-05-22 02:27:56', '2025-05-22 05:27:18'),
(40, 45, '', '', 'Creación educativa y ambiental', 'Obra que genera conciencia ambiental mediante experiencia visual, inspirando respeto por la naturaleza.', 'FiEdit', '75% aumentaron conciencia ambiental.', '2025-05-22 02:28:34', '2025-05-22 05:30:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact_info`
--

CREATE TABLE `contact_info` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `show_contact` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `features`
--

CREATE TABLE `features` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `icon_key` varchar(100) DEFAULT NULL,
  `media_type` enum('image','video') DEFAULT NULL,
  `media_url` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `features`
--

INSERT INTO `features` (`id`, `project_id`, `title`, `subtitle`, `icon_key`, `media_type`, `media_url`, `created_at`) VALUES
(16, 11, 'hgjgh', 'jkjhjo', '', 'video', '/media/videos/1742914306118.mp4', '2025-03-25 14:51:46'),
(17, 11, 'sada', 'dasd', '', 'video', '/media/videos/1742915936176.mp4', '2025-03-25 15:18:56'),
(18, 11, 'we', '22222', '', 'video', '/media/videos/1742915948657.mp4', '2025-03-25 15:19:08'),
(23, 40, 'Montaje rápido', ' Estructura fácil y segura para armar.', '', 'image', '/media/images/1747804349340.jpg', '2025-05-21 05:12:29'),
(24, 40, 'Impresión 3D y corte láser', 'Integración con tecnología avanzada.', '', 'image', '/media/images/1747804387521.jpg', '2025-05-21 05:13:07'),
(25, 40, 'Soporte electrónico', 'Sistema mejorado para baterías y componentes.', '', 'image', '/media/images/1747804422170.jpg', '2025-05-21 05:13:42'),
(26, 41, 'Braille incluido', 'Accesibilidad para discapacidad visual.', '', 'image', '/media/images/1747804882168.jpg', '2025-05-21 05:21:22'),
(27, 41, 'Actividades lúdicas', 'Juegos adaptados a cada niño.', '', 'image', '/media/images/1747804906674.jpg', '2025-05-21 05:21:46'),
(28, 41, 'Desarrollo espacial', 'Ejercicios para mejorar orientación cognitiva.', '', 'image', '/media/images/1747804932368.jpg', '2025-05-21 05:22:12'),
(29, 42, 'Reconocimiento automático', 'Clasifica materiales reciclables.', '', 'image', '/media/images/1747805342313.jpg', '2025-05-21 05:29:02'),
(30, 42, 'Control por voz', 'Facilita interacción educativa.', '', 'image', '/media/images/1747805359613.jpg', '2025-05-21 05:29:19'),
(31, 42, 'Retroalimentación', ' Respuestas inmediatas para el usuario.', '', 'image', '/media/images/1747805381927.jpg', '2025-05-21 05:29:41'),
(32, 43, 'Tolva manual', 'Alimentación de hasta 50 kg.', '', 'image', '/media/images/1747878767777.jpg', '2025-05-22 01:52:47'),
(33, 43, 'Sistema de zarandas', 'Clasificación precisa por tamaño.', '', 'image', '/media/images/1747878799156.jpg', '2025-05-22 01:53:19'),
(34, 43, 'Motor eficiente', 'Bajo consumo energético.', '', 'image', '/media/images/1747878815297.jpg', '2025-05-22 01:53:35'),
(35, 44, 'Patas articuladas', 'Movimiento tipo Jansen.', '', 'image', '/media/images/1747880601022.jpg', '2025-05-22 02:23:21'),
(36, 44, 'Control remoto', 'Fácil manejo inalámbrico.', '', 'image', '/media/images/1747880616780.jpg', '2025-05-22 02:23:36'),
(37, 44, 'Microcontrolador', 'Integra comandos y control.', '', 'image', '/media/images/1747880631795.jpg', '2025-05-22 02:23:51'),
(38, 45, 'Acero inoxidable', 'Material resistente y preciso.', '', 'image', '/media/images/1747880936357.jpg', '2025-05-22 02:28:56'),
(39, 45, 'Movimiento cinético', 'Dinámica impulsada por el viento.', '', 'image', '/media/images/1747880950148.jpg', '2025-05-22 02:29:10'),
(40, 45, 'Interdisciplinariedad', 'Fusiona arte, ciencia y tecnología.', '', 'image', '/media/images/1747880966082.jpg', '2025-05-22 02:29:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `media_files`
--

CREATE TABLE `media_files` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `file_type` enum('image','video') NOT NULL,
  `file_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `project_description` text NOT NULL,
  `project_image` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL DEFAULT 'Sin categoría'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `projects`
--

INSERT INTO `projects` (`id`, `project_name`, `project_description`, `project_image`, `category`) VALUES
(11, 'Titutlo asd ', 'dadasdasdasdas', '/media/images/1742912559753.jpg', 'categoria'),
(14, 'dasdasd', 'dasdasdasdadasdasddasdasdasdadasdasddasdasdasdadasdasddasdasdasdadasdasddasdasdasdadasdasddasdasdasdadasdasd', '/media/images/1742912588690.jpg', 'dasdadasda'),
(16, 'TItulo', 'dasdasddasdasddasdasddasdasddasdasddasdasd', '/media/images/1742912603477.png', 'das32312'),
(17, 'dsad', 'asd', '/media/images/1742830842919.jpg', 'Hambre cero'),
(19, 'asd alianza', 'dasd', '/media/images/1742910956679.jpg', 'Alianzas para lograr los objetivos'),
(20, 'Nuevo Proyecto', 'Descripcion', '/media/images/1742912723858.jpg', 'Fin de la pobreza'),
(21, 'asdasdasd', 'asdasdasdasdasd', '/media/images/1747625533712.jpg', 'Hambre cero'),
(40, 'LunaBot', 'LunaBot es un proyecto educativo que promueve el aprendizaje práctico en niños de 6 a 12 años mediante talleres de robótica, programación y diseño 3D. Fomenta creatividad, colaboración y habilidades técnicas, usando tecnologías accesibles como impresión 3D y corte láser.', '/media/images/1747803547277.jpg', 'Educación de calidad, Industria, innovación e infraestructura'),
(41, 'LearnyBot', 'LearnyBot busca facilitar la alfabetización tecnológica inclusiva en niños con y sin discapacidad, usando herramientas adaptadas y actividades enfocadas en el desarrollo de la inteligencia espacial. Incluye elementos accesibles como Braille para asegurar participación educativa universal y equitativa.', '/media/images/1747804740202.jpg', 'Educación de calidad, Reducción de las desigualdades'),
(42, 'Continator', 'Continator es un sistema interactivo que incentiva el reciclaje responsable mediante reconocimiento automático y clasificación de residuos. Facilita el aprendizaje ambiental con tecnología avanzada y control por voz, mejorando la conciencia ecológica en escuelas y comunidades mediante la educación práctica y colaborativa.', '/media/images/1747805220386.jpg', 'Ciudades y comunidades sostenibles, Producción y consumo responsables'),
(43, 'Máquina desgranadora y clasificadora de maíz', 'La máquina desgranadora y clasificadora de maíz optimiza el procesamiento de maíz en Cabanaconde, Perú. Con una capacidad de 150 kg/hora, reduce el esfuerzo manual y mejora la productividad agrícola, contribuyendo a la eficiencia de los agricultores locales.', '/media/images/1747878523612.jpg', 'Hambre cero, Producción y consumo responsables'),
(44, 'Theo Jansen Robot', 'Theo Jansen es un robot inspirado en los mecanismos creados por el artista Theo Jansen. Utiliza un sistema de patas articuladas para generar movimiento fluido y eficiente, proporcionando una experiencia educativa sobre robótica, mecánica avanzada y control inalámbrico.', '/media/images/1747880421467.jpg', 'Educación de calidad, Industria, innovación e infraestructura'),
(45, 'DIOCTO', 'La escultura cinética DIOCTO combina arte y tecnología para crear movimientos fluidos que representan principios físicos. Esta obra educa al público sobre fenómenos naturales y dinámicas físicas, promoviendo una mayor apreciación del clima y los fenómenos ambientales.', '/media/images/1747880829197.jpg', 'Industria, innovación e infraestructura, Acción por el clima');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `project_config`
--

CREATE TABLE `project_config` (
  `config_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `showAdvantages` tinyint(1) NOT NULL DEFAULT 0,
  `showFeatures` tinyint(1) NOT NULL DEFAULT 0,
  `showWorkflow` tinyint(1) NOT NULL DEFAULT 0,
  `showTeam` tinyint(1) NOT NULL DEFAULT 0,
  `showContact` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `showImpacto` tinyint(1) NOT NULL DEFAULT 0,
  `showInvestigacion` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `project_config`
--

INSERT INTO `project_config` (`config_id`, `project_id`, `showAdvantages`, `showFeatures`, `showWorkflow`, `showTeam`, `showContact`, `created_at`, `updated_at`, `showImpacto`, `showInvestigacion`) VALUES
(1, 11, 0, 0, 0, 0, 0, '2025-03-20 14:41:51', '2025-03-31 01:51:44', 0, 1),
(2, 14, 0, 0, 0, 1, 0, '2025-03-20 14:49:50', '2025-03-22 06:48:35', 0, 0),
(3, 16, 0, 1, 0, 0, 0, '2025-03-20 15:23:33', '2025-03-20 21:15:47', 0, 0),
(4, 17, 1, 1, 1, 1, 1, '2025-03-25 14:24:00', '2025-03-25 14:24:04', 0, 0),
(5, 17, 1, 1, 1, 1, 1, '2025-03-25 14:24:00', '2025-03-25 14:24:04', 0, 0),
(11, 40, 1, 1, 0, 1, 1, '2025-05-21 04:59:13', '2025-05-21 05:09:40', 1, 0),
(12, 40, 1, 1, 0, 1, 1, '2025-05-21 04:59:13', '2025-05-21 05:09:40', 1, 0),
(13, 41, 1, 1, 0, 1, 1, '2025-05-21 05:19:05', '2025-05-21 05:19:14', 1, 0),
(14, 41, 1, 1, 0, 1, 1, '2025-05-21 05:19:05', '2025-05-21 05:19:14', 1, 0),
(15, 42, 1, 1, 0, 1, 1, '2025-05-21 05:27:20', '2025-05-21 05:27:28', 1, 0),
(16, 42, 1, 1, 0, 1, 1, '2025-05-21 05:27:20', '2025-05-21 05:27:28', 1, 0),
(17, 43, 1, 1, 0, 1, 1, '2025-05-22 01:49:05', '2025-05-22 04:25:14', 1, 0),
(18, 44, 1, 1, 0, 1, 1, '2025-05-22 02:20:28', '2025-05-22 02:20:38', 1, 0),
(19, 44, 1, 1, 0, 1, 1, '2025-05-22 02:20:28', '2025-05-22 02:20:38', 1, 0),
(20, 45, 1, 1, 0, 1, 1, '2025-05-22 02:27:15', '2025-05-22 02:27:21', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `project_feature_extras`
--

CREATE TABLE `project_feature_extras` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `stat` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `project_feature_extras`
--

INSERT INTO `project_feature_extras` (`id`, `project_id`, `title`, `stat`, `description`, `created_at`) VALUES
(1, 11, '11231231', '211212vs', 'qdqd12121212', '2025-03-20 20:12:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `project_impact`
--

CREATE TABLE `project_impact` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `project_impact`
--

INSERT INTO `project_impact` (`id`, `project_id`, `title`, `description`, `image_url`, `created_at`) VALUES
(3, 11, 'dasda1212', 'dadasd', '/media/images/1743383202532.jpg', '2025-03-31 01:06:42'),
(4, 40, 'Impacto en la Educación STEM:', 'Incrementó significativamente el interés y habilidades en robótica y programación en niños entre 6 y 12 años, fomentando un aprendizaje activo y colaborativo que contribuye al desarrollo integral y la motivación en áreas STEM.', '/media/images/1747804660703.jpg', '2025-05-21 05:17:40'),
(5, 41, 'La Inclusión Educativa:', 'Favoreció la inclusión educativa al mejorar la alfabetización tecnológica y espacial en niños con y sin discapacidad, promoviendo un aprendizaje equitativo y adaptado que potencia capacidades cognitivas y sociales diversas.', '/media/images/1747805130321.jpg', '2025-05-21 05:24:53'),
(6, 42, 'La Conciencia Ambiental', 'Incrementó la participación y conciencia ambiental en entornos escolares y comunitarios, generando hábitos responsables de reciclaje y fortaleciendo el compromiso social mediante tecnología interactiva y educativa accesible para todos.', '/media/images/1747805485929.jpg', '2025-05-21 05:31:17'),
(7, 43, 'Impacto en la productividad agrícola', 'La máquina ha mejorado significativamente la eficiencia en el procesamiento de maíz en las comunidades agrícolas, reduciendo el esfuerzo manual, minimizando daños en los granos y contribuyendo a una agricultura más sostenible y productiva en zonas rurales.', '/media/images/1747878900102.jpg', '2025-05-22 01:54:20'),
(8, 44, 'Impacto en robótica y educación práctica', 'Theo Jansen impulsa la educación en robótica, mecánica y electrónica mediante un diseño único que favorece la experimentación práctica. Los estudiantes mejoran sus habilidades técnicas, creativas y de resolución de problemas, ampliando su conocimiento en sistemas mecánicos avanzados.', '/media/images/1747880675959.jpg', '2025-05-22 02:24:28'),
(9, 45, 'Impacto artístico y educativo', 'DIOCTO inspira respeto por el medio ambiente al combinar arte y ciencia. A través de su movimiento y diseño, enseña principios físicos fundamentales, generando una conexión emocional con la naturaleza y promoviendo la conciencia ambiental en el público.', '/media/images/1747881003920.jpg', '2025-05-22 02:30:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `project_research`
--

CREATE TABLE `project_research` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `link` text NOT NULL,
  `copyright` varchar(255) DEFAULT 'CC',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `project_sections`
--

CREATE TABLE `project_sections` (
  `project_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `project_sections`
--

INSERT INTO `project_sections` (`project_id`, `section_id`) VALUES
(40, 49),
(40, 54),
(41, 49),
(41, 55),
(42, 56),
(42, 57),
(43, 8),
(43, 57),
(44, 49),
(44, 54),
(45, 54),
(45, 58);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sections`
--

INSERT INTO `sections` (`id`, `name`, `image_url`) VALUES
(3, 'Fin de la pobreza', 'FaHandHoldingHeart'),
(8, 'Hambre cero', 'FaLeaf'),
(47, 'Paz, justicia e instituciones sólidas', 'FaPeace'),
(48, 'Salud y bienestar', 'FaUserShield'),
(49, 'Educación de calidad', 'FaBook'),
(50, 'Igualdad de género', 'FaVenus'),
(51, 'Agua limpia y saneamiento', 'FaTint'),
(52, 'Energía asequible y no contaminante', 'FaSolarPanel'),
(53, 'Trabajo decente y crecimiento económico', 'FaBriefcase'),
(54, 'Industria, innovación e infraestructura', 'FaIndustry'),
(55, 'Reducción de las desigualdades', 'FaBalanceScale'),
(56, 'Ciudades y comunidades sostenibles', 'FaCity'),
(57, 'Producción y consumo responsables', 'FaRecycle'),
(58, 'Acción por el clima', 'FaGlobeAmericas'),
(59, 'Vida submarina', 'FaFish'),
(60, 'Alianzas para lograr los objetivos', 'FaHandshake'),
(61, 'Vida de ecosistemas terrestres', 'FaLeaf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stats`
--

CREATE TABLE `stats` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `icon_key` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stats`
--

INSERT INTO `stats` (`id`, `project_id`, `icon_key`, `title`, `text`, `created_at`) VALUES
(3, 11, 'FiStar', 'title', 'text', '2025-03-20 22:29:57'),
(9, 11, 'FiZap', 'uhu', 'kl', '2025-03-25 14:51:57'),
(10, 11, 'FiCloud', '23', 'ds', '2025-03-25 15:19:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `team_members`
--

CREATE TABLE `team_members` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `bio` text DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `team_members`
--

INSERT INTO `team_members` (`id`, `project_id`, `name`, `role`, `bio`, `avatar`, `created_at`) VALUES
(12, 11, 'jvjv', 'lkklm', 'lkklnnlnl', '/media/images/1742914408628.png', '2025-03-25 14:53:28'),
(13, 11, 'llnl', 'kjn', 'hkjk', '/media/images/1742914451910.png', '2025-03-25 14:54:11'),
(14, 11, 'kjnjn', 'kjnk', 'bhjjhb', '/media/images/1742914477113.png', '2025-03-25 14:54:37'),
(15, 11, 'dsad', 'dasdas', 'asdasd', '/media/images/1742915892515.png', '2025-03-25 15:18:12'),
(16, 40, 'Joaquín de los Ríos Rosado.', 'Creador', 'Desconocida', '/media/images/1747804475458.png', '2025-05-21 05:14:35'),
(17, 41, 'Juan Diego Cerrón', 'Co-Desarrollador', 'Desconocida', '/media/images/1747804972920.png', '2025-05-21 05:22:52'),
(18, 41, 'Ken Alexis Quispe.', 'Co-Desarrollador', 'Desconocido', '/media/images/1747805016925.png', '2025-05-21 05:23:36'),
(19, 42, 'Juan Diego Cerrón', 'Co-Desarrallodor', 'Desconcida', '/media/images/1747805427334.png', '2025-05-21 05:30:27'),
(20, 42, ' Ken Alexis Quispe.', 'Co-Desarrallodor', 'Desconcida', '/media/images/1747805450089.png', '2025-05-21 05:30:50'),
(21, 43, 'Bryan Quinta Ccosi.', 'Creador', 'Desconocida', '/media/images/1747878848918.png', '2025-05-22 01:54:08'),
(22, 44, 'Juan Diego Cerrón.', 'Creador', 'Desconocida', '/media/images/1747880653940.png', '2025-05-22 02:24:13'),
(23, 45, 'Ken Alexis Quispe.', 'Creador', 'Desconocida', '/media/images/1747880984419.png', '2025-05-22 02:29:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `technical_icons`
--

CREATE TABLE `technical_icons` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `icon` varchar(100) NOT NULL,
  `text` varchar(255) NOT NULL,
  `type` enum('icon','image') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(2, 'Administrador', 'admin@example.com', '$2b$10$ZXpXpBYHOsih8nrgHd.hf.mC0dVtEFci8BZKSOXKGNyjc800mBFUq', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `workflow`
--

CREATE TABLE `workflow` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `workflow`
--

INSERT INTO `workflow` (`id`, `project_id`, `title`, `subtitle`, `created_at`) VALUES
(1, 11, 'dasda', 'dasdadasd', '2025-03-22 04:56:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `workflow_steps`
--

CREATE TABLE `workflow_steps` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `workflow_steps`
--

INSERT INTO `workflow_steps` (`id`, `project_id`, `step_number`, `title`, `description`, `image_url`, `created_at`) VALUES
(2, 11, 2, 'dasd', 'asdasda', '/media/images/1742912021832.jpg', '2025-03-22 05:01:53'),
(3, 11, 3, 'dad', 'adda', '/media/images/1742912033524.jpg', '2025-03-22 05:05:07'),
(8, 11, 3, 'ojoij', 'ioojl', '/media/images/1742914354418.jpg', '2025-03-25 14:52:34'),
(9, 11, 4, 'oiioj', 'mnnm', '/media/images/1742914376475.jpg', '2025-03-25 14:52:56'),
(10, 11, 5, 'dsad', ' asdasd', '/media/images/1742915875252.jpg', '2025-03-25 15:17:55');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `advantages`
--
ALTER TABLE `advantages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indices de la tabla `contact_info`
--
ALTER TABLE `contact_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indices de la tabla `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indices de la tabla `media_files`
--
ALTER TABLE `media_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indices de la tabla `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `project_config`
--
ALTER TABLE `project_config`
  ADD PRIMARY KEY (`config_id`),
  ADD KEY `fk_project_config_projects` (`project_id`);

--
-- Indices de la tabla `project_feature_extras`
--
ALTER TABLE `project_feature_extras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indices de la tabla `project_impact`
--
ALTER TABLE `project_impact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indices de la tabla `project_research`
--
ALTER TABLE `project_research`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indices de la tabla `project_sections`
--
ALTER TABLE `project_sections`
  ADD PRIMARY KEY (`project_id`,`section_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indices de la tabla `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indices de la tabla `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indices de la tabla `technical_icons`
--
ALTER TABLE `technical_icons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `workflow`
--
ALTER TABLE `workflow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indices de la tabla `workflow_steps`
--
ALTER TABLE `workflow_steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `advantages`
--
ALTER TABLE `advantages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `contact_info`
--
ALTER TABLE `contact_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `features`
--
ALTER TABLE `features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `media_files`
--
ALTER TABLE `media_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `project_config`
--
ALTER TABLE `project_config`
  MODIFY `config_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `project_feature_extras`
--
ALTER TABLE `project_feature_extras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `project_impact`
--
ALTER TABLE `project_impact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `project_research`
--
ALTER TABLE `project_research`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `stats`
--
ALTER TABLE `stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `technical_icons`
--
ALTER TABLE `technical_icons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `workflow`
--
ALTER TABLE `workflow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `workflow_steps`
--
ALTER TABLE `workflow_steps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `advantages`
--
ALTER TABLE `advantages`
  ADD CONSTRAINT `advantages_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `contact_info`
--
ALTER TABLE `contact_info`
  ADD CONSTRAINT `contact_info_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `features`
--
ALTER TABLE `features`
  ADD CONSTRAINT `features_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `media_files`
--
ALTER TABLE `media_files`
  ADD CONSTRAINT `media_files_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `project_config`
--
ALTER TABLE `project_config`
  ADD CONSTRAINT `fk_project_config_projects` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `project_feature_extras`
--
ALTER TABLE `project_feature_extras`
  ADD CONSTRAINT `project_feature_extras_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `project_impact`
--
ALTER TABLE `project_impact`
  ADD CONSTRAINT `project_impact_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `project_research`
--
ALTER TABLE `project_research`
  ADD CONSTRAINT `project_research_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `project_sections`
--
ALTER TABLE `project_sections`
  ADD CONSTRAINT `project_sections_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_sections_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `stats`
--
ALTER TABLE `stats`
  ADD CONSTRAINT `stats_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `team_members`
--
ALTER TABLE `team_members`
  ADD CONSTRAINT `team_members_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `technical_icons`
--
ALTER TABLE `technical_icons`
  ADD CONSTRAINT `technical_icons_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `workflow`
--
ALTER TABLE `workflow`
  ADD CONSTRAINT `workflow_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `workflow_steps`
--
ALTER TABLE `workflow_steps`
  ADD CONSTRAINT `workflow_steps_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
