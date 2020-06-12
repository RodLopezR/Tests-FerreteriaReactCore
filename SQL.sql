DROP TABLE IF EXISTS `categoria`;

CREATE TABLE `categoria` (
	`nId` int(5) NOT NULL AUTO_INCREMENT,
	`sNombre` varchar(100) NOT NULL,
	`nEstado` int(1) NOT NULL DEFAULT 1,
	`dRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`nId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `producto`;

CREATE TABLE `producto` (
	`nId` int(5) NOT NULL AUTO_INCREMENT,
	`nIdCategoria` int(5) NOT NULL,
	`sCodigo` varchar(10) NOT NULL,
	`sNombre` varchar(100) NOT NULL,
	`nPrecio` decimal(10, 2) NOT NULL DEFAULT 1,
	`nStock` int(10) NOT NULL DEFAULT 1,
	`dRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`dActualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`nId`),
	KEY `FK_producto_categoria` (`nIdCategoria`), 
	CONSTRAINT `FK_producto_categoria` FOREIGN KEY (`nIdCategoria`) REFERENCES `categoria` (`nId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `categoria` (`sNombre`, `nEstado`, `dRegistro`) VALUES ('Herramientas', '1', current_timestamp());
INSERT INTO `categoria` (`sNombre`, `nEstado`, `dRegistro`) VALUES ('Focos', '1', current_timestamp());
INSERT INTO `categoria` (`sNombre`, `nEstado`, `dRegistro`) VALUES ('Material de Construcción', '1', current_timestamp());

INSERT INTO `producto` (`nId`, `nIdCategoria`, `sCodigo`, `sNombre`, `nPrecio`, `nStock`, `dRegistro`, `dActualizacion`) VALUES (NULL, '2', '', 'Foco 30 watts', '25.00', '100', current_timestamp(), current_timestamp());