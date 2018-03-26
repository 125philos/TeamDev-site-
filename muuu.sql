-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Мар 26 2018 г., 15:37
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
-- База данных: `mubd`
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

--
-- Дамп данных таблицы `dezobsluzh`
--

INSERT INTO `dezobsluzh` (`id_DezObsluzh`, `id_Rastenie`, `Dezinfekcia`, `DateStartDez`, `DateEndDez`, `CenaDez`) VALUES
(1, 2, 'Комплексная защита', '2018-02-17', '2018-11-17', 1400),
(3, 6, 'Мучнистая роса', '2018-02-26', '2018-03-06', 3500),
(4, 14, 'Ликвидация тли', '2018-03-07', '2018-03-28', 3500);

-- --------------------------------------------------------

--
-- Структура таблицы `porodazver`
--

CREATE TABLE `porodazver` (
  `id_PorodaZver` int(12) NOT NULL,
  `id_TypeZver` int(12) NOT NULL,
  `PorodaZverName` varchar(200) CHARACTER SET utf32 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `porodazver`
--

INSERT INTO `porodazver` (`id_PorodaZver`, `id_TypeZver`, `PorodaZverName`) VALUES
(1, 1, 'Шотландский кролик'),
(2, 1, 'Английский кролик'),
(3, 2, 'Шведский конь'),
(4, 3, 'Русская корова');

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

--
-- Дамп данных таблицы `prihodresurs`
--

INSERT INTO `prihodresurs` (`id_PrihodResurs`, `id_Resurs`, `CenaResurs`, `KolvoResurs`, `DatePopolnResurs`) VALUES
(1, 2, 2000, 190, '2018-02-28'),
(3, 4, 1200, 30, '2018-03-01'),
(7, 2, 1575, 45, '2018-02-28'),
(26, 2, 3000, 12, '2018-03-01'),
(28, 2, 1500, 175, '2018-03-14'),
(29, 14, 1500, 150, '2018-02-26');

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

--
-- Дамп данных таблицы `product`
--

INSERT INTO `product` (`id_Product`, `id_Zver`, `id_ProductName`, `KolvoProduct`, `DateProduct`, `EdIzmProduct`) VALUES
(1, NULL, 2, 200, '2018-02-04', 'л'),
(2, NULL, 6, 300, '2018-01-15', 'л'),
(3, NULL, 3, 55, '2018-03-13', 'л'),
(4, NULL, 3, 12, '2018-01-11', 'л'),
(5, NULL, 2, 130, '2018-03-25', 'л'),
(6, NULL, 3, 36, '2018-02-15', 'л'),
(7, NULL, 1, 70, '2018-04-02', 'шт'),
(8, NULL, 2, 40, '2018-05-09', 'л'),
(9, NULL, 3, 100, '2018-06-06', 'л'),
(10, NULL, 4, 120, '2018-07-16', 'л'),
(11, NULL, 6, 190, '2018-08-08', 'кг'),
(12, NULL, 1, 290, '2018-09-01', 'шт'),
(13, NULL, 1, 40, '2018-10-01', 'шт'),
(14, NULL, 2, 16, '2018-11-21', 'л'),
(15, NULL, 3, 70, '2018-12-09', 'л');

-- --------------------------------------------------------

--
-- Структура таблицы `productname`
--

CREATE TABLE `productname` (
  `id_ProductName` int(12) NOT NULL,
  `PriductName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `productname`
--

INSERT INTO `productname` (`id_ProductName`, `PriductName`) VALUES
(1, 'Яйцо'),
(2, 'Молоко'),
(3, 'Кефир'),
(4, 'Сметанка'),
(5, 'Мясо'),
(6, 'Сальцо!');

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

--
-- Дамп данных таблицы `rashodresurs`
--

INSERT INTO `rashodresurs` (`id_RashodResurs`, `id_Resurs`, `KolvoResurs`, `DateIzyatResurs`) VALUES
(3, 4, 16, '2018-03-04'),
(22, 2, 14, '2018-03-01'),
(23, 2, 19, '2018-02-26'),
(24, 2, 150, '2018-02-27'),
(25, 14, 140, '2018-02-26');

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

--
-- Дамп данных таблицы `rastenie`
--

INSERT INTO `rastenie` (`id_Rastenie`, `id_SortRastenie`, `PhotoRastenie`, `DateVisadkaRastenie`, `ColorRastenie`, `KolvoRastenie`, `EffectiveProcentRastenie`, `CommentRastenie`, `CenaRastenie`) VALUES
(2, 2, 'plants1.jpg', '2017-12-07', 'Красный', 120, 78, 'Очень вкусный!!', 7340),
(6, 3, 'plants5.jpg', '2017-10-19', 'Аллый', 140, 25, 'Отличный сорт!!', 2340),
(10, 1, 'plants6.jpg', '2017-07-19', 'Темно-синяя', 560, 87, 'Очень сладкая и полезная!!', 3500),
(14, 5, 'plants9.jpg', '2017-09-25', 'Бежевые', 190, 30, 'Сладкая-сладкая!! Хлеб получится - самый вкусный!!', 2380),
(16, 4, 'plants7.jpg', '2018-03-31', 'Цвет бычьей крови ', 100, 100, 'Божественно!', 4370),
(17, 6, 'plants4.jpg', '2018-03-15', 'Красный', 150, 85, 'Сладкая и сочная!!', 5900);

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

--
-- Дамп данных таблицы `realization`
--

INSERT INTO `realization` (`id_Realization`, `id_Zver`, `id_Rastenie`, `id_Product`, `KolvoRealization`, `DateRealization`, `CenaRealization`, `EdIzmRealization`) VALUES
(2, NULL, NULL, 1, 150, '2018-07-24', 3000, 'л'),
(3, NULL, 2, NULL, 240, '2018-02-26', 7000, 'шт'),
(4, 3, NULL, NULL, 1, '2018-03-21', 35000, 'шт'),
(49, 4, NULL, NULL, 1, '2018-02-26', 45000, 'шт'),
(54, 6, NULL, NULL, 1, '2018-03-28', 70000, 'шт'),
(55, NULL, NULL, 2, 355, '2018-03-14', 15000, 'кг');

-- --------------------------------------------------------

--
-- Структура таблицы `resurs`
--

CREATE TABLE `resurs` (
  `id_Resurs` int(12) NOT NULL,
  `id_PorodaZver` int(12) DEFAULT NULL,
  `id_SortRastenie` int(12) DEFAULT NULL,
  `NameResurs` varchar(200) NOT NULL,
  `NormaResurs` int(12) DEFAULT NULL,
  `EdIzmResurs` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `resurs`
--

INSERT INTO `resurs` (`id_Resurs`, `id_PorodaZver`, `id_SortRastenie`, `NameResurs`, `NormaResurs`, `EdIzmResurs`) VALUES
(2, 3, NULL, 'Корм', 150, 'кг'),
(4, NULL, 3, 'Удобрение', 140, 'кг'),
(5, 4, NULL, 'Силос', 120, 'кг'),
(14, 2, NULL, 'Комбткорм', 233, 'кг');

-- --------------------------------------------------------

--
-- Структура таблицы `sortrastenie`
--

CREATE TABLE `sortrastenie` (
  `id_SortRastenie` int(12) NOT NULL,
  `id_TypeRastenie` int(12) NOT NULL,
  `SortRastenieName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `sortrastenie`
--

INSERT INTO `sortrastenie` (`id_SortRastenie`, `id_TypeRastenie`, `SortRastenieName`) VALUES
(1, 4, 'Черника миртолистная'),
(2, 2, 'Помидоры бычье сердце'),
(3, 3, 'Вишня обыкновенная'),
(4, 1, 'Яблоня макинтош'),
(5, 5, 'Пшеница дурум'),
(6, 6, 'Клубника Королева Елизавета II');

-- --------------------------------------------------------

--
-- Структура таблицы `typerastenie`
--

CREATE TABLE `typerastenie` (
  `id_TypeRastenie` int(12) NOT NULL,
  `TypeRastenieName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `typerastenie`
--

INSERT INTO `typerastenie` (`id_TypeRastenie`, `TypeRastenieName`) VALUES
(1, 'Яблоня'),
(2, 'Помидор'),
(3, 'Вишня'),
(4, 'Черника'),
(5, 'Пшеница'),
(6, 'Клубника');

-- --------------------------------------------------------

--
-- Структура таблицы `typezver`
--

CREATE TABLE `typezver` (
  `id_TypeZver` int(12) NOT NULL,
  `TypeZverName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `typezver`
--

INSERT INTO `typezver` (`id_TypeZver`, `TypeZverName`) VALUES
(1, 'Кролик'),
(2, 'Птица'),
(3, 'Корова');

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

--
-- Дамп данных таблицы `vetobsluj`
--

INSERT INTO `vetobsluj` (`id_VetObsluj`, `id_Zver`, `UslugaVet`, `DateStartVet`, `DateEndVet`, `CenaVet`) VALUES
(6, 2, 'Комплексное лечение', '2018-02-27', '2018-03-06', 2500),
(7, 3, 'Прививка от язвы', '2018-03-05', '2018-06-07', 2600),
(8, 3, 'Прививка от ящура', '2018-03-05', '2018-03-07', 3900),
(9, 2, 'Прививка от ящура', '2018-03-05', '2018-03-13', 1350),
(10, 5, 'Прививка от ящура', '2018-03-14', '2018-03-20', 1700),
(11, 4, 'Комплексный осмотр', '2018-02-26', '2018-03-07', 500),
(12, 4, 'Сибирская язва', '2018-03-31', '2018-04-11', 1000),
(13, 2, 'Профилактический осмотр', '2018-03-22', '2018-03-30', 5000);

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
-- Дамп данных таблицы `zver`
--

INSERT INTO `zver` (`id_Zver`, `id_PorodaZver`, `PhotoZver`, `NameZver`, `DateBirthday`, `SexZver`, `ColorZver`, `VesZver`, `EffectiveProcentZver`, `CommentZver`, `CenaZver`) VALUES
(2, 4, 'animals2.jpg', 'Франциска', '2018-02-27', 'Женский', 'Горького шоколада', 120, 58, 'Отличная продукция!!', 3500),
(3, 2, 'animals.jpg', 'Крепыш', '2017-07-31', 'Мужской', 'Серый', 25, 99, 'Очень плодовитый!!', 2380),
(4, 1, 'animals5.jpg', 'Лариса', '2017-10-30', 'Женский', 'Белый', 1, 100, 'Очень пушистый!!', 1000),
(5, 4, 'animals1.jpg', 'Лорд', '2017-03-05', 'Мужской', 'Коричневый', 100, 90, 'Очень красивый!!', 0),
(6, 3, 'animals6.jpg', 'Мустанг', '2018-03-06', 'Мужской', 'Коричневый', 120, 70, 'Отличный бегун!!', 24000),
(7, 4, 'animals3.jpg', 'Фрэнс', '2017-12-21', 'Мужской', 'Черно-серый', 90, 90, 'Очень умный и плодовитый!!', 30000);

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
  MODIFY `id_DezObsluzh` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `porodazver`
--
ALTER TABLE `porodazver`
  MODIFY `id_PorodaZver` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `prihodresurs`
--
ALTER TABLE `prihodresurs`
  MODIFY `id_PrihodResurs` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `product`
--
ALTER TABLE `product`
  MODIFY `id_Product` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `productname`
--
ALTER TABLE `productname`
  MODIFY `id_ProductName` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `rashodresurs`
--
ALTER TABLE `rashodresurs`
  MODIFY `id_RashodResurs` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `rastenie`
--
ALTER TABLE `rastenie`
  MODIFY `id_Rastenie` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `realization`
--
ALTER TABLE `realization`
  MODIFY `id_Realization` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT для таблицы `resurs`
--
ALTER TABLE `resurs`
  MODIFY `id_Resurs` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `sortrastenie`
--
ALTER TABLE `sortrastenie`
  MODIFY `id_SortRastenie` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `typerastenie`
--
ALTER TABLE `typerastenie`
  MODIFY `id_TypeRastenie` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `typezver`
--
ALTER TABLE `typezver`
  MODIFY `id_TypeZver` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `vetobsluj`
--
ALTER TABLE `vetobsluj`
  MODIFY `id_VetObsluj` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `zver`
--
ALTER TABLE `zver`
  MODIFY `id_Zver` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
