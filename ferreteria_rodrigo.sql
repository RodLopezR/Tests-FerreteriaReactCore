-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2020 at 05:26 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ferreteria_rodrigo`
--

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `nId` int(5) NOT NULL,
  `sNombre` varchar(100) NOT NULL,
  `nEstado` int(1) NOT NULL DEFAULT 1,
  `dRegistro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categoria`
--

INSERT INTO `categoria` (`nId`, `sNombre`, `nEstado`, `dRegistro`) VALUES
(1, 'Herramientas', 1, '2020-06-12 01:59:25'),
(2, 'Focos', 1, '2020-06-12 02:00:31'),
(3, 'Material de Construcción', 1, '2020-06-12 02:00:31'),
(4, 'string', 1, '2020-06-12 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

CREATE TABLE `producto` (
  `nId` int(5) NOT NULL,
  `nIdCategoria` int(5) NOT NULL,
  `sCodigo` varchar(10) NOT NULL,
  `sNombre` varchar(100) NOT NULL,
  `nPrecio` decimal(10,2) NOT NULL DEFAULT 1.00,
  `nStock` int(10) NOT NULL DEFAULT 1,
  `dRegistro` timestamp NOT NULL DEFAULT current_timestamp(),
  `dActualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`nId`, `nIdCategoria`, `sCodigo`, `sNombre`, `nPrecio`, `nStock`, `dRegistro`, `dActualizacion`) VALUES
(2, 1, '000002', 'Prueba', '30.50', 120, '2020-06-12 00:00:00', '2020-06-12 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`nId`);

--
-- Indexes for table `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`nId`),
  ADD KEY `FK_producto_categoria` (`nIdCategoria`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `nId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `producto`
--
ALTER TABLE `producto`
  MODIFY `nId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `FK_producto_categoria` FOREIGN KEY (`nIdCategoria`) REFERENCES `categoria` (`nId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
