/*
SQLyog Ultimate v11.24 (32 bit)
MySQL - 5.5.28 : Database - future
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`future` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `future`;

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `newsid` int(20) NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `title` varchar(200) DEFAULT NULL COMMENT '标题',
  `creationtime` varchar(100) DEFAULT NULL COMMENT '创建时间',
  `auth` varchar(20) DEFAULT NULL COMMENT '作者',
  `cover` varchar(200) DEFAULT NULL COMMENT '相关图片',
  `content` text COMMENT '内容',
  `desc` varchar(500) DEFAULT NULL COMMENT '摘要',
  `source` varchar(200) DEFAULT NULL COMMENT '来源',
  PRIMARY KEY (`newsid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `article` */

/*Table structure for table `block` */

DROP TABLE IF EXISTS `block`;

CREATE TABLE `block` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block_name` varchar(50) DEFAULT NULL,
  `block_desc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

/*Data for the table `block` */

insert  into `block`(`id`,`block_name`,`block_desc`) values (14,'国内动态','说明 文字 你好'),(16,'国际动态','国际新闻'),(17,'文学知识',''),(18,'国内新闻',''),(19,'天空之城',''),(20,'国内新闻',''),(21,'国内文章',''),(22,'新闻',''),(23,'新闻',''),(24,'新闻',''),(25,'新闻',''),(26,'新新亲',''),(27,'小新','');

/*Table structure for table `person` */

DROP TABLE IF EXISTS `person`;

CREATE TABLE `person` (
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `age` float DEFAULT NULL,
  `male` tinyint(1) DEFAULT NULL,
  `continent` enum('Europe','America','Asia','Africa','Australia','Antarctica') DEFAULT NULL,
  `photo` blob,
  `data` blob,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `person` */

insert  into `person`(`name`,`surname`,`age`,`male`,`continent`,`photo`,`data`,`id`) values ('John','Doe',28,0,NULL,NULL,NULL,1),('John','Doe',27,0,NULL,NULL,NULL,2),('John','Doe',27,0,NULL,NULL,NULL,3),('John','Doe',27,0,NULL,NULL,NULL,4),('John','Doe',27,0,NULL,NULL,NULL,5),('John','Doe',27,0,NULL,NULL,NULL,6),('John','Doe',27,0,NULL,NULL,NULL,7),('John','Doe',25,1,NULL,NULL,NULL,8),('Liza','Kollan',19,0,NULL,NULL,NULL,9),('John','Doe',25,1,NULL,NULL,NULL,10),('Liza','Kollan',19,0,NULL,NULL,NULL,11),('John','Doe',25,1,NULL,NULL,NULL,12),('Liza','Kollan',19,0,NULL,NULL,NULL,13),('John','Doe',25,1,NULL,NULL,NULL,14),('Liza','Kollan',19,0,NULL,NULL,NULL,15),('John','Doe',25,1,NULL,NULL,NULL,16),('Liza','Kollan',19,0,NULL,NULL,NULL,17),('John','Doe',25,1,NULL,NULL,NULL,18),('Liza','Kollan',19,0,NULL,NULL,NULL,19),('John','Doe',25,1,NULL,NULL,NULL,20),('Liza','Kollan',19,0,NULL,NULL,NULL,21),('John','Doe',25,1,NULL,NULL,NULL,22),('Liza','Kollan',19,0,NULL,NULL,NULL,23),('John','Doe',25,1,NULL,NULL,NULL,24),('Liza','Kollan---',19,0,NULL,NULL,NULL,25),('John','Doe',25,1,NULL,NULL,NULL,26),('Liza','Kollan---',19,0,NULL,NULL,NULL,27),('John','Doe',25,1,NULL,NULL,NULL,28),('Liza','Kollan---',19,0,NULL,NULL,NULL,29);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `country` enum('China','USA','Canada') DEFAULT NULL,
  `sex` varchar(2) DEFAULT NULL,
  `birth` varchar(100) DEFAULT NULL,
  `state` tinyint(1) DEFAULT NULL,
  `hobby` varchar(100) DEFAULT NULL,
  `desc` text,
  `avatarurl` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`password`,`country`,`sex`,`birth`,`state`,`hobby`,`desc`,`avatarurl`) values (10,'admin','$2b$10$f5RwmupR4u.HyGrSCnnl8OnXrf9jUYKFahEpIxsT02WHDlx5Nkaja','USA','男','2020-07-06',1,',美食/餐厅线上活动,地推活动','林','/public/upload/upload_86d06eead8090b5ec613f63017167100.jpg'),(68,'张三丰','1','China','男','1980-03-10',1,'看书,写字','','/public/upload/upload_41c88c512a5abb7b02d66541f485d504.jpg'),(71,'2','2','China','','',0,'','','/public/upload/defaultavatar.jpg'),(73,'d','d','China','','',1,'','','/public/upload/defaultavatar.jpg'),(74,'dddddddd','d','China','','',1,'','','/public/upload/defaultavatar.jpg');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
