-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Мар 09 2018 г., 15:31
-- Версия сервера: 10.1.30-MariaDB
-- Версия PHP: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `muuu`
--

-- --------------------------------------------------------

--
-- Структура таблицы `dezobsluzh`
--

CREATE TABLE `dezobsluzh` (
  `id_DezObsluzh` int(12) NOT NULL,
  `id_Rastenie` int(12) NOT NULL,
  `Dezinfekcia` varchar(200) NOT NULL,
  `DateStartDez` date NOT NULL,
  `DateEndDez` date NOT NULL,
  `CenaDez` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `porodazver`
--

CREATE TABLE `porodazver` (
  `id_PorodaZver` int(12) NOT NULL,
  `id_TypeZver` int(12) NOT NULL,
  `PorodaZverName` varchar(200) CHARACTER SET utf32 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `prihodresurs`
--

CREATE TABLE `prihodresurs` (
  `id_PrihodResurs` int(12) NOT NULL,
  `id_Resurs` int(12) NOT NULL,
  `CenaResurs` int(12) NOT NULL,
  `KolvoResurs` int(12) NOT NULL,
  `DatePopolnResurs` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `product`
--

CREATE TABLE `product` (
  `id_Product` int(12) NOT NULL,
  `id_Zver` int(12) DEFAULT NULL,
  `id_ProductName` int(12) DEFAULT NULL,
  `KolvoProduct` int(12) NOT NULL,
  `DateProduct` date NOT NULL,
  `EdIzmProduct` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `productname`
--

CREATE TABLE `productname` (
  `id_ProductName` int(12) NOT NULL,
  `PriductName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `rashodresurs`
--

CREATE TABLE `rashodresurs` (
  `id_RashodResurs` int(12) NOT NULL,
  `id_Resurs` int(12) NOT NULL,
  `KolvoResurs` int(12) NOT NULL,
  `DateIzyatResurs` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `rastenie`
--

CREATE TABLE `rastenie` (
  `id_Rastenie` int(12) NOT NULL,
  `id_SortRastenie` int(12) NOT NULL,
  `PhotoRastenie` varchar(200) NOT NULL,
  `DateVisadkaRastenie` date NOT NULL,
  `ColorRastenie` varchar(200) NOT NULL,
  `KolvoRastenie` int(12) NOT NULL,
  `EffectiveProcentRastenie` int(12) NOT NULL,
  `CommentRastenie` varchar(1000) NOT NULL,
  `CenaRastenie` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `realization`
--

CREATE TABLE `realization` (
  `id_Realization` int(12) NOT NULL,
  `id_Zver` int(12) DEFAULT NULL,
  `id_Rastenie` int(12) DEFAULT NULL,
  `id_Product` int(12) DEFAULT NULL,
  `KolvoRealization` int(12) NOT NULL,
  `DateRealization` date NOT NULL,
  `CenaRealization` int(12) NOT NULL,
  `EdIzmRealization` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `resurs`
--

CREATE TABLE `resurs` (
  `id_Resurs` int(12) NOT NULL,
  `id_PorodaZver` int(12) DEFAULT NULL,
  `id_SortRastenie` int(12) DEFAULT NULL,
  `NameResurs` varchar(200) NOT NULL,
  `NormaResurs` int(12) NOT NULL,
  `EdIzmResurs` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `sortrastenie`
--

CREATE TABLE `sortrastenie` (
  `id_SortRastenie` int(12) NOT NULL,
  `id_TypeRastenie` int(12) NOT NULL,
  `SortRastenieName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `typerastenie`
--

CREATE TABLE `typerastenie` (
  `id_TypeRastenie` int(12) NOT NULL,
  `TypeRastenieName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `typezver`
--

CREATE TABLE `typezver` (
  `id_TypeZver` int(12) NOT NULL,
  `TypeZverName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `vetobsluj`
--

CREATE TABLE `vetobsluj` (
  `id_VetObsluj` int(12) NOT NULL,
  `id_Zver` int(12) NOT NULL,
  `UslugaVet` varchar(200) NOT NULL,
  `DateStartVet` date NOT NULL,
  `DateEndVet` date NOT NULL,
  `CenaVet` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `zver`
--

CREATE TABLE `zver` (
  `id_Zver` int(12) NOT NULL,
  `id_PorodaZver` int(12) NOT NULL,
  `PhotoZver` varchar(200) NOT NULL,
  `NameZver` varchar(200) NOT NULL,
  `DateBirthday` date NOT NULL,
  `SexZver` varchar(20) NOT NULL,
  `ColorZver` varchar(200) NOT NULL,
  `VesZver` int(12) NOT NULL,
  `EffectiveProcentZver` int(12) NOT NULL,
  `CommentZver` varchar(1000) NOT NULL,
  `CenaZver` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `dezobsluzh`
--
ALTER TABLE `dezobsluzh`
  ADD PRIMARY KEY (`id_DezObsluzh`),
  ADD KEY `id_Rastenie` (`id_Rastenie`);

--
-- Индексы таблицы `porodazver`
--
ALTER TABLE `porodazver`
  ADD PRIMARY KEY (`id_PorodaZver`),
  ADD KEY `id_TypeZver` (`id_TypeZver`);

--
-- Индексы таблицы `prihodresurs`
--
ALTER TABLE `prihodresurs`
  ADD PRIMARY KEY (`id_PrihodResurs`),
  ADD KEY `id_Resurs` (`id_Resurs`);

--
-- Индексы таблицы `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_Product`),
  ADD KEY `id_ProductName` (`id_ProductName`),
  ADD KEY `id_Zver` (`id_Zver`);

--
-- Индексы таблицы `productname`
--
ALTER TABLE `productname`
  ADD PRIMARY KEY (`id_ProductName`);

--
-- Индексы таблицы `rashodresurs`
--
ALTER TABLE `rashodresurs`
  ADD PRIMARY KEY (`id_RashodResurs`),
  ADD KEY `id_Resurs` (`id_Resurs`);

--
-- Индексы таблицы `rastenie`
--
ALTER TABLE `rastenie`
  ADD PRIMARY KEY (`id_Rastenie`),
  ADD KEY `id_SortRastenie` (`id_SortRastenie`);

--
-- Индексы таблицы `realization`
--
ALTER TABLE `realization`
  ADD PRIMARY KEY (`id_Realization`),
  ADD KEY `id_Product` (`id_Product`),
  ADD KEY `id_Zver` (`id_Zver`),
  ADD KEY `id_Rastenie` (`id_Rastenie`);

--
-- Индексы таблицы `resurs`
--
ALTER TABLE `resurs`
  ADD PRIMARY KEY (`id_Resurs`),
  ADD KEY `id_PorodaZver` (`id_PorodaZver`),
  ADD KEY `id_SortRastenie` (`id_SortRastenie`);

--
-- Индексы таблицы `sortrastenie`
--
ALTER TABLE `sortrastenie`
  ADD PRIMARY KEY (`id_SortRastenie`),
  ADD KEY `id_TypeRastenie` (`id_TypeRastenie`);

--
-- Индексы таблицы `typerastenie`
--
ALTER TABLE `typerastenie`
  ADD PRIMARY KEY (`id_TypeRastenie`);

--
-- Индексы таблицы `typezver`
--
ALTER TABLE `typezver`
  ADD PRIMARY KEY (`id_TypeZver`);

--
-- Индексы таблицы `vetobsluj`
--
ALTER TABLE `vetobsluj`
  ADD PRIMARY KEY (`id_VetObsluj`),
  ADD KEY `id_Zver` (`id_Zver`);

--
-- Индексы таблицы `zver`
--
ALTER TABLE `zver`
  ADD PRIMARY KEY (`id_Zver`),
  ADD KEY `id_PorodaZver` (`id_PorodaZver`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `dezobsluzh`
--
ALTER TABLE `dezobsluzh`
  MODIFY `id_DezObsluzh` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `porodazver`
--
ALTER TABLE `porodazver`
  MODIFY `id_PorodaZver` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `prihodresurs`
--
ALTER TABLE `prihodresurs`
  MODIFY `id_PrihodResurs` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `product`
--
ALTER TABLE `product`
  MODIFY `id_Product` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `productname`
--
ALTER TABLE `productname`
  MODIFY `id_ProductName` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `rashodresurs`
--
ALTER TABLE `rashodresurs`
  MODIFY `id_RashodResurs` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `rastenie`
--
ALTER TABLE `rastenie`
  MODIFY `id_Rastenie` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `realization`
--
ALTER TABLE `realization`
  MODIFY `id_Realization` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `resurs`
--
ALTER TABLE `resurs`
  MODIFY `id_Resurs` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `sortrastenie`
--
ALTER TABLE `sortrastenie`
  MODIFY `id_SortRastenie` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `typerastenie`
--
ALTER TABLE `typerastenie`
  MODIFY `id_TypeRastenie` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `typezver`
--
ALTER TABLE `typezver`
  MODIFY `id_TypeZver` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `vetobsluj`
--
ALTER TABLE `vetobsluj`
  MODIFY `id_VetObsluj` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `zver`
--
ALTER TABLE `zver`
  MODIFY `id_Zver` int(12) NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `dezobsluzh`
--
ALTER TABLE `dezobsluzh`
  ADD CONSTRAINT `dezobsluzh_ibfk_1` FOREIGN KEY (`id_Rastenie`) REFERENCES `rastenie` (`id_Rastenie`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `porodazver`
--
ALTER TABLE `porodazver`
  ADD CONSTRAINT `porodazver_ibfk_1` FOREIGN KEY (`id_TypeZver`) REFERENCES `typezver` (`id_TypeZver`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `prihodresurs`
--
ALTER TABLE `prihodresurs`
  ADD CONSTRAINT `prihodresurs_ibfk_1` FOREIGN KEY (`id_Resurs`) REFERENCES `resurs` (`id_Resurs`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_ProductName`) REFERENCES `productname` (`id_ProductName`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`id_Zver`) REFERENCES `zver` (`id_Zver`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `rashodresurs`
--
ALTER TABLE `rashodresurs`
  ADD CONSTRAINT `rashodresurs_ibfk_1` FOREIGN KEY (`id_Resurs`) REFERENCES `resurs` (`id_Resurs`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `rastenie`
--
ALTER TABLE `rastenie`
  ADD CONSTRAINT `rastenie_ibfk_1` FOREIGN KEY (`id_SortRastenie`) REFERENCES `sortrastenie` (`id_SortRastenie`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `realization`
--
ALTER TABLE `realization`
  ADD CONSTRAINT `realization_ibfk_1` FOREIGN KEY (`id_Product`) REFERENCES `product` (`id_Product`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `realization_ibfk_2` FOREIGN KEY (`id_Zver`) REFERENCES `zver` (`id_Zver`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `realization_ibfk_3` FOREIGN KEY (`id_Rastenie`) REFERENCES `rastenie` (`id_Rastenie`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `resurs`
--
ALTER TABLE `resurs`
  ADD CONSTRAINT `resurs_ibfk_1` FOREIGN KEY (`id_PorodaZver`) REFERENCES `porodazver` (`id_PorodaZver`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resurs_ibfk_2` FOREIGN KEY (`id_SortRastenie`) REFERENCES `sortrastenie` (`id_SortRastenie`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `sortrastenie`
--
ALTER TABLE `sortrastenie`
  ADD CONSTRAINT `sortrastenie_ibfk_1` FOREIGN KEY (`id_TypeRastenie`) REFERENCES `typerastenie` (`id_TypeRastenie`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `vetobsluj`
--
ALTER TABLE `vetobsluj`
  ADD CONSTRAINT `vetobsluj_ibfk_1` FOREIGN KEY (`id_Zver`) REFERENCES `zver` (`id_Zver`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `zver`
--
ALTER TABLE `zver`
  ADD CONSTRAINT `zver_ibfk_1` FOREIGN KEY (`id_PorodaZver`) REFERENCES `porodazver` (`id_PorodaZver`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
