-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: litlink
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `blogpost`
--

DROP TABLE IF EXISTS `blogpost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogpost` (
  `PostID` int NOT NULL AUTO_INCREMENT,
  `AuthorID` int NOT NULL,
  `Title` varchar(1000) NOT NULL,
  `Content` text,
  PRIMARY KEY (`PostID`),
  KEY `AuthorID` (`AuthorID`),
  CONSTRAINT `blogpost_ibfk_1` FOREIGN KEY (`AuthorID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogpost`
--

LOCK TABLES `blogpost` WRITE;
/*!40000 ALTER TABLE `blogpost` DISABLE KEYS */;
/*!40000 ALTER TABLE `blogpost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `BookID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(1000) NOT NULL,
  `Description` text,
  `CoverImage` varchar(255) DEFAULT NULL,
  `AuthorID` int NOT NULL,
  PRIMARY KEY (`BookID`),
  KEY `AuthorID` (`AuthorID`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`AuthorID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookauthor`
--

DROP TABLE IF EXISTS `bookauthor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookauthor` (
  `BookID` int NOT NULL,
  `AuthorID` int NOT NULL,
  PRIMARY KEY (`BookID`,`AuthorID`),
  KEY `AuthorID` (`AuthorID`),
  CONSTRAINT `bookauthor_ibfk_1` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`),
  CONSTRAINT `bookauthor_ibfk_2` FOREIGN KEY (`AuthorID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookauthor`
--

LOCK TABLES `bookauthor` WRITE;
/*!40000 ALTER TABLE `bookauthor` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookauthor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookgenre`
--

DROP TABLE IF EXISTS `bookgenre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookgenre` (
  `BookID` int NOT NULL,
  `GenreID` int NOT NULL,
  PRIMARY KEY (`BookID`,`GenreID`),
  KEY `GenreID` (`GenreID`),
  CONSTRAINT `bookgenre_ibfk_1` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`),
  CONSTRAINT `bookgenre_ibfk_2` FOREIGN KEY (`GenreID`) REFERENCES `genre` (`GenreID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookgenre`
--

LOCK TABLES `bookgenre` WRITE;
/*!40000 ALTER TABLE `bookgenre` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookgenre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `CommentID` int NOT NULL AUTO_INCREMENT,
  `PostID` int NOT NULL,
  `UserID` int NOT NULL,
  `ParentCommentID` int DEFAULT NULL,
  `CommentText` text NOT NULL,
  `DatePosted` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`CommentID`),
  KEY `PostID` (`PostID`),
  KEY `UserID` (`UserID`),
  KEY `ParentCommentID` (`ParentCommentID`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `blogpost` (`PostID`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`ParentCommentID`) REFERENCES `comment` (`CommentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `GenreID` int NOT NULL AUTO_INCREMENT,
  `GenreName` varchar(100) NOT NULL,
  PRIMARY KEY (`GenreID`),
  UNIQUE KEY `GenreName` (`GenreName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `ReviewID` int NOT NULL AUTO_INCREMENT,
  `BookID` int NOT NULL,
  `UserID` int NOT NULL,
  `Rating` tinyint DEFAULT NULL,
  `ReviewText` text,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ReviewID`),
  KEY `BookID` (`BookID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `review_chk_1` CHECK ((`Rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `ProfilePicture` varchar(255) DEFAULT NULL,
  `UserTypeID` int NOT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email` (`Email`),
  KEY `UserTypeID` (`UserTypeID`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`UserTypeID`) REFERENCES `usertype` (`UserTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'FakeUser','Fake123','Name','fake@email.com','$2b$10$ZkgwmShrxv7ZkVJGmoc0XO6Jxuzkdhlst.jeYy5lpnbAefQvn6J9y','profile_1734301976536_OIP.jpg',1,'2024-12-14 08:53:25','2024-12-16 06:32:56'),(5,'User123','User','Faker','user1@email.com','$2b$10$ABY76cHR2P52ARpk/ECJG.d78CezAQBhnPOLTUbku8eunmIhV9UHO','profile_1734310523401_young-adult.JPG',1,'2024-12-14 11:49:47','2024-12-16 08:55:23'),(6,'Juice','Lisa','Wang','juicer@email.com','$2b$10$JEPl9jPV7yS8v9QBPEWbQOyRXtAfSd7IVnhQQG.X84lI5q/R9rVSy',NULL,1,'2024-12-14 21:20:09','2024-12-14 21:21:10'),(7,'fff','kkk','ttt','ddd@email.com','$2b$10$uG2oKuerDBsV.kFTEvjmr.Mmtx/87rel7zAiDYfGu.3UiGuOlyJU2','/images/pfp.jpg',1,'2024-12-15 21:41:05','2024-12-15 21:41:05'),(8,'admin','Admin','Account','admin@example.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',NULL,2,'2024-12-16 07:27:25','2024-12-16 07:27:25');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertype` (
  `UserTypeID` int NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(50) NOT NULL,
  PRIMARY KEY (`UserTypeID`),
  UNIQUE KEY `TypeName` (`TypeName`),
  CONSTRAINT `usertype_chk_1` CHECK ((`TypeName` in (_utf8mb4'User',_utf8mb4'Admin',_utf8mb4'Author')))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertype`
--

LOCK TABLES `usertype` WRITE;
/*!40000 ALTER TABLE `usertype` DISABLE KEYS */;
INSERT INTO `usertype` VALUES (2,'Admin'),(3,'Author'),(1,'User');
/*!40000 ALTER TABLE `usertype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-16  9:56:26
