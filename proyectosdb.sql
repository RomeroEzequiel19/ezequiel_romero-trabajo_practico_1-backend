-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-08-2023 a las 20:42:58
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectosdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `proyecto_id` int(11) NOT NULL,
  `nombre_proyecto` varchar(255) NOT NULL,
  `descripcion_proyecto` varchar(255) NOT NULL,
  `fecha_inicial` date NOT NULL,
  `fecha_final` date NOT NULL,
  `estado_proyecto` tinyint(1) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`proyecto_id`, `nombre_proyecto`, `descripcion_proyecto`, `fecha_inicial`, `fecha_final`, `estado_proyecto`, `usuario_id`) VALUES
(1, 'Gestionar Tareas', 'Es necesario realizar un CRUD sobre las tareas', '2023-08-29', '2023-08-31', 0, 1),
(2, 'Gestionar Productos', 'Es necesario realizar un CRUD sobre los productos', '2023-08-29', '2023-08-31', 1, 1),
(3, 'Lograr la gestión eficaz de los productos de una ropería', 'Es necesario realizar un CRUD sobre la ropa', '2023-08-29', '2023-08-31', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `tarea_id` int(11) NOT NULL,
  `nombre_tarea` varchar(255) NOT NULL,
  `descripcion_tarea` varchar(255) NOT NULL,
  `complejidad_tarea` varchar(255) NOT NULL,
  `fecha_inicializacion` date NOT NULL,
  `fecha_finalizacion` date NOT NULL,
  `estado_tarea` tinyint(1) NOT NULL,
  `proyecto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`tarea_id`, `nombre_tarea`, `descripcion_tarea`, `complejidad_tarea`, `fecha_inicializacion`, `fecha_finalizacion`, `estado_tarea`, `proyecto_id`) VALUES
(1, 'Crear Tarea', 'Se necesita una ruta y controlador para crear una tarea', 'Facil', '2023-08-30', '2023-08-31', 1, 1),
(2, 'Mostrar Tarea', 'Se necesita una ruta y controlador para mostrarr una tarea', 'Facil', '2023-08-31', '2023-09-01', 1, 1),
(3, 'Eliminar Producto', 'Se necesita una ruta y controlador para eliminar un producto', 'Facil', '2023-09-03', '2023-09-05', 1, 2),
(4, 'Actualizar Producto', 'Se necesita una ruta y controlador para actualizar un producto', 'Facil', '2023-09-03', '2023-09-05', 1, 2),
(5, 'Almacenar Ropa', 'Se necesita una ruta y controlador para poder almacenar la información de la ropa en una base de datos', 'Facil', '2023-09-03', '2023-09-05', 1, 3),
(6, 'Venta Ropa', 'Se necesita una ruta y controlador para poder almacenar la venta de la ropa en una base de datos', 'Medio', '2023-09-06', '2023-09-10', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `dni` int(11) NOT NULL,
  `nombre_usuario` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `estado_usuario` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nombre`, `apellido`, `dni`, `nombre_usuario`, `email`, `contrasenia`, `estado_usuario`) VALUES
(1, 'Juan', 'Perez', 45381813, 'juancitoPerez', 'juan.pe123@gmail.com', '$2b$10$maJu9FsmwJ9EqQJda9a0OuccFogrsM4sIz.sIpUpt6c7zwOhxHIJ.', 1),
(2, 'Andrez', 'Gimenez', 43111833, 'Andruu123', 'gim.andru@gmail.com', '$2b$10$CrcdfSr5LryBl9JMsc/dp.vSE0BbwRqedqf9l7vB6lPCbQFTztr72', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`proyecto_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`tarea_id`),
  ADD KEY `proyecto_id` (`proyecto_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `proyecto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `tarea_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`proyecto_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
