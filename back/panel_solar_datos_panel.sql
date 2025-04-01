-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: panel_solar
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `datos_panel`
--

CREATE DATABASE IF NOT EXISTS `panel_solar` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datos_panel` (
  `id_estacion` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `voltaje_panel` decimal(10,2) NOT NULL,
  `voltaje_bateria` decimal(10,2) NOT NULL,
  `estado_carga` int NOT NULL,
  `luz_solar` tinyint(1) NOT NULL,
  `potencia_almacenada` decimal(10,2) NOT NULL,
  `usuarios_totales` int NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_estacion`,`fecha_registro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_panel`
--

LOCK TABLES `datos_panel` WRITE;
/*!40000 ALTER TABLE `datos_panel` DISABLE KEYS */;
INSERT INTO `datos_panel` VALUES ('EST001',18.50,12.80,85,1,180.50,12,'2025-03-31 15:00:00'),('EST001',19.20,13.10,90,1,195.30,15,'2025-03-31 17:00:00'),('EST001',15.70,12.50,75,0,150.80,18,'2025-03-31 21:00:00'),('EST001',18.50,12.80,85,1,180.50,12,'2025-04-01 03:24:04'),('EST002',17.80,12.60,82,1,175.20,8,'2025-03-31 15:30:00'),('EST002',16.90,12.20,78,1,165.70,11,'2025-03-31 18:30:00'),('EST002',14.50,11.80,65,0,130.50,14,'2025-03-31 22:30:00'),('EST003',19.50,13.20,95,1,200.00,20,'2025-03-31 16:00:00'),('EST003',18.70,12.90,88,1,185.50,25,'2025-03-31 19:00:00'),('EST003',13.80,11.50,60,0,120.30,28,'2025-03-31 23:00:00');
/*!40000 ALTER TABLE `datos_panel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-31 22:27:20
