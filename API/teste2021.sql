-- --------------------------------------------------------
-- Anfitrião:                    127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- SO do servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- A despejar estrutura da base de dados para teste2021
CREATE DATABASE IF NOT EXISTS `teste2021` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `teste2021`;

-- A despejar estrutura para tabela teste2021.arguidos
CREATE TABLE IF NOT EXISTS `arguidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `idade` int NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `profissao` varchar(255) NOT NULL,
  `dataDeNascimento` date NOT NULL,
  `idEndereco` int NOT NULL,
  `idEstado` int DEFAULT NULL,
  `apelido` varchar(255) NOT NULL,
  `pai` varchar(255) NOT NULL,
  `mae` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idEndereco` (`idEndereco`),
  KEY `idEstado` (`idEstado`),
  CONSTRAINT `arguidos_ibfk_13` FOREIGN KEY (`idEndereco`) REFERENCES `enderecos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `arguidos_ibfk_14` FOREIGN KEY (`idEstado`) REFERENCES `estado_arguidos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.auditlogs
CREATE TABLE IF NOT EXISTS `auditlogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `resource` varchar(255) NOT NULL,
  `recordId` int DEFAULT NULL,
  `description` text,
  `ip` varchar(255) DEFAULT NULL,
  `userAgent` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `auditlogs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.audit_logs
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `resource` varchar(255) NOT NULL,
  `recordId` int DEFAULT NULL,
  `description` text,
  `ip` varchar(255) DEFAULT NULL,
  `userAgent` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.declarantes
CREATE TABLE IF NOT EXISTS `declarantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `idade` int NOT NULL,
  `profissao` varchar(255) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `idEndereco` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telf1` varchar(255) NOT NULL,
  `telf2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idEndereco` (`idEndereco`),
  CONSTRAINT `declarantes_ibfk_1` FOREIGN KEY (`idEndereco`) REFERENCES `enderecos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.enderecos
CREATE TABLE IF NOT EXISTS `enderecos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idMunicipio` int NOT NULL,
  `bairro` varchar(255) NOT NULL,
  `rua` varchar(255) NOT NULL,
  `casa` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idMunicipio` (`idMunicipio`),
  CONSTRAINT `enderecos_ibfk_1` FOREIGN KEY (`idMunicipio`) REFERENCES `municipios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.estado_arguidos
CREATE TABLE IF NOT EXISTS `estado_arguidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.estado_processos
CREATE TABLE IF NOT EXISTS `estado_processos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.letras
CREATE TABLE IF NOT EXISTS `letras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letra` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `unique_letra` (`letra`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.municipios
CREATE TABLE IF NOT EXISTS `municipios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `idProvincia` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idProvincia` (`idProvincia`),
  CONSTRAINT `municipios_ibfk_1` FOREIGN KEY (`idProvincia`) REFERENCES `provincias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.processos
CREATE TABLE IF NOT EXISTS `processos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(255) NOT NULL,
  `ano` int NOT NULL,
  `crime` varchar(255) NOT NULL,
  `idTribunal` int NOT NULL,
  `idSeccao` int NOT NULL,
  `idEstadoProcesso` int NOT NULL,
  `idLetra` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idTribunal` (`idTribunal`),
  KEY `idSeccao` (`idSeccao`),
  KEY `idEstadoProcesso` (`idEstadoProcesso`),
  KEY `idLetra` (`idLetra`),
  CONSTRAINT `processos_ibfk_17` FOREIGN KEY (`idTribunal`) REFERENCES `tribunais` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `processos_ibfk_18` FOREIGN KEY (`idSeccao`) REFERENCES `seccoes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `processos_ibfk_19` FOREIGN KEY (`idEstadoProcesso`) REFERENCES `estado_processos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `processos_ibfk_20` FOREIGN KEY (`idLetra`) REFERENCES `letras` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.processo_arguidos
CREATE TABLE IF NOT EXISTS `processo_arguidos` (
  `idProcesso` int NOT NULL,
  `idArguido` int NOT NULL,
  `idEstadoArguido` int NOT NULL,
  `pena` varchar(255) DEFAULT NULL,
  `crime` varchar(255) NOT NULL,
  `dataDeJulgamento` date DEFAULT NULL,
  PRIMARY KEY (`idProcesso`,`idArguido`),
  UNIQUE KEY `processo_arguidos_idProcesso_idArguido_unique` (`idProcesso`,`idArguido`),
  KEY `idArguido` (`idArguido`),
  KEY `idEstadoArguido` (`idEstadoArguido`),
  CONSTRAINT `processo_arguidos_ibfk_1` FOREIGN KEY (`idProcesso`) REFERENCES `processos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `processo_arguidos_ibfk_2` FOREIGN KEY (`idArguido`) REFERENCES `arguidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `processo_arguidos_ibfk_3` FOREIGN KEY (`idEstadoArguido`) REFERENCES `estado_arguidos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.processo_declarantes
CREATE TABLE IF NOT EXISTS `processo_declarantes` (
  `idProcesso` int NOT NULL,
  `idDeclarante` int NOT NULL,
  PRIMARY KEY (`idProcesso`,`idDeclarante`),
  KEY `idDeclarante` (`idDeclarante`),
  CONSTRAINT `processo_declarantes_ibfk_1` FOREIGN KEY (`idProcesso`) REFERENCES `processos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `processo_declarantes_ibfk_2` FOREIGN KEY (`idDeclarante`) REFERENCES `declarantes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.provincias
CREATE TABLE IF NOT EXISTS `provincias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `unique_provincia_nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.refreshtokens
CREATE TABLE IF NOT EXISTS `refreshtokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `expiryDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `refreshtokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.refresh_tokens
CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `expiryDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.rolepermissions
CREATE TABLE IF NOT EXISTS `rolepermissions` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `permissionId` int NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`permissionId`,`roleId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `rolepermissions_ibfk_1` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rolepermissions_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.seccoes
CREATE TABLE IF NOT EXISTS `seccoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(255) NOT NULL,
  `idTribunal` int NOT NULL,
  `idMunicipio` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `unique_seccao_tribunal` (`numero`,`idTribunal`),
  KEY `idTribunal` (`idTribunal`),
  KEY `idMunicipio` (`idMunicipio`),
  CONSTRAINT `seccoes_ibfk_13` FOREIGN KEY (`idTribunal`) REFERENCES `tribunais` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `seccoes_ibfk_14` FOREIGN KEY (`idMunicipio`) REFERENCES `municipios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.tribunais
CREATE TABLE IF NOT EXISTS `tribunais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `idMunicipio` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_nome_municipio` (`nome`,`idMunicipio`),
  KEY `idMunicipio` (`idMunicipio`),
  CONSTRAINT `tribunais_ibfk_1` FOREIGN KEY (`idMunicipio`) REFERENCES `municipios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.userroles
CREATE TABLE IF NOT EXISTS `userroles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`roleId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `userroles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userroles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `isOnline` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `idLetra` int DEFAULT NULL,
  `idSeccao` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `username_3` (`username`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `username_4` (`username`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `username_5` (`username`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `username_6` (`username`),
  UNIQUE KEY `email_7` (`email`),
  KEY `idLetra` (`idLetra`),
  KEY `idSeccao` (`idSeccao`),
  CONSTRAINT `users_ibfk_7` FOREIGN KEY (`idLetra`) REFERENCES `letras` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_8` FOREIGN KEY (`idSeccao`) REFERENCES `seccoes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

-- A despejar estrutura para tabela teste2021.user_sessions
CREATE TABLE IF NOT EXISTS `user_sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `login_time` datetime NOT NULL,
  `logout_time` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados não seleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
