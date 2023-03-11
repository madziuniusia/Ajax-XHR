-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 11 Mar 2023, 15:59
-- Wersja serwera: 10.4.25-MariaDB
-- Wersja PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `monetki`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `alloy`
--

CREATE TABLE `alloy` (
  `IdAlloy` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `alloy`
--

INSERT INTO `alloy` (`IdAlloy`, `name`) VALUES
(1, 'aluminium'),
(2, 'aluminium-bronze'),
(3, 'bronze'),
(4, 'copperPlatedZinc'),
(5, 'copperNickel'),
(6, 'gold'),
(7, 'nickelCladSteel'),
(8, 'silver'),
(9, 'stainlessSteel'),
(10, 'zinc');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `country`
--

CREATE TABLE `country` (
  `IdCountry` int(11) NOT NULL,
  `name` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `country`
--

INSERT INTO `country` (`IdCountry`, `name`) VALUES
(1, 'Albania'),
(2, 'Algieria'),
(3, 'Australia'),
(4, 'Barbados'),
(5, 'Belgia'),
(6, 'Belize'),
(7, 'Bermudy'),
(8, 'Bhutan'),
(9, 'Boliwia');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `monetki`
--

CREATE TABLE `monetki` (
  `IdMonetki` int(11) NOT NULL,
  `IdCountry` int(11) NOT NULL,
  `denomination` text NOT NULL,
  `category` text NOT NULL,
  `IdAlloy` int(11) NOT NULL,
  `year` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `monetki`
--

INSERT INTO `monetki` (`IdMonetki`, `IdCountry`, `denomination`, `category`, `IdAlloy`, `year`) VALUES
(1, 1, 'zloty', 'km#94', 5, '1999'),
(2, 8, 'cent', 'km#1', 8, '1998'),
(3, 6, 'cent', 'km#123', 9, '1999'),
(4, 4, 'zloty', 'km#100', 9, '2005'),
(5, 5, 'cent', 'km#101', 1, '2021'),
(6, 6, 'dolar', 'km#226', 10, '2001'),
(7, 7, 'dolar', 'km#224', 10, '2001'),
(8, 7, 'euro', 'km#220', 9, '2003'),
(9, 1, 'zloty', 'km#2021', 3, '2023');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `alloy`
--
ALTER TABLE `alloy`
  ADD PRIMARY KEY (`IdAlloy`);

--
-- Indeksy dla tabeli `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`IdCountry`);

--
-- Indeksy dla tabeli `monetki`
--
ALTER TABLE `monetki`
  ADD PRIMARY KEY (`IdMonetki`),
  ADD KEY `IdAlloy` (`IdAlloy`),
  ADD KEY `IdCountry` (`IdCountry`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `alloy`
--
ALTER TABLE `alloy`
  MODIFY `IdAlloy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `country`
--
ALTER TABLE `country`
  MODIFY `IdCountry` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `monetki`
--
ALTER TABLE `monetki`
  MODIFY `IdMonetki` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `monetki`
--
ALTER TABLE `monetki`
  ADD CONSTRAINT `monetki_ibfk_1` FOREIGN KEY (`IdCountry`) REFERENCES `country` (`IdCountry`),
  ADD CONSTRAINT `monetki_ibfk_2` FOREIGN KEY (`IdAlloy`) REFERENCES `alloy` (`IdAlloy`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
