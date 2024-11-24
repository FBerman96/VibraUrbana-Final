-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-11-2024 a las 19:33:20
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
-- Base de datos: `vibra_urbana_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `role` enum('cliente','admin') DEFAULT 'cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `nombre`, `apellido`, `fechaNacimiento`, `role`) VALUES
(2, 'admin1', 'padmin1@gmail.com', 'admin', 'Prueba', 'Admin', '1996-09-11', 'cliente'),
(3, 'pgonzalez96', 'pgonzalez96@gmail.com', '12345678', 'Pablo', 'Gonzalez', '1990-10-12', 'admin'),
(6, 'sgonzalez99', 'sgonzalez77@gmail.com', '12345678', '', '', '0000-00-00', 'cliente'),
(7, 'gfernandez92', 'gfernandez@gmail.com', '12345678', 'Gonzalo', 'Fernandez', '1992-02-02', 'cliente'),
(8, 'rhash96', 'r.hash@hotmail.com', '$2a$10$hYpO2El4NCgLcvnEbBo48.zXTe/ktJX/E0wxVOXpVfwb1cSSRPVyS', 'Register', 'Hasheado', '2010-10-10', 'admin'),
(9, 'ffaour96', 'ffaour@yahoo.com.ar', '$2a$10$Lq3J9nBII9g4twx6UHEetuyVXECEX00QpAPItDMS0UKVRH/90DX9a', 'Fernando Emir', 'Faour Berman', '1996-09-11', 'admin'),
(10, 'bsimpso12', 'bsimpso@gmail.com', '$2a$10$aMu/Hn90fbuFWSa70DtfS.l7GzxIwrAtFbI7c5qTxcHJQc06YlNq2', '', '', '0000-00-00', 'admin'),
(11, 'fpintos96', 'fpintos96@gmail.com', '$2a$10$FOGTMnNQNh50nFkdfik5ueMDRK19NzZ1e1XlNnf9Xw.5JLWTxuEYu', 'Francisco', 'Pintos', '1992-05-10', 'cliente'),
(12, 'rolando76', 'prueba123@prueba.com', '$2a$10$HGtcH7GFnbJSo1WmvbDgPOBTMaRw0uHaSG.nkl1WriG/8RLCz8Bia', 'Rolando', 'Cualquiera', '1685-12-10', 'cliente'),
(13, 'ffaour_clientedeprueba', 'fernandofaour@lex-doctor.com', '$2a$10$YoA7Yg6zyMp5FlGczCNrguaDccM/4Fw/yReIGfyTRQM9fjxacKj1q', 'Fernando Emir', 'Faour Berman', '1996-09-11', 'admin'),
(14, 'fsanchez10', 'fsanchez10@yahoo.com.ar', '$2a$10$A6th9Va3WrU2oFnUlsHl9exQdGJa4FMlsppy5R4OBu/2IW3ItPZfm', 'Francisco', 'Sanchez', '1995-05-12', 'cliente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
