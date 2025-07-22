-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Jul 2025 pada 18.06
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backend`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pin` varchar(4) NOT NULL,
  `balance` decimal(10,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `accounts`
--

INSERT INTO `accounts` (`id`, `name`, `pin`, `balance`, `created_at`) VALUES
(8, 'fariz', '1212', 100000.00, '2025-07-19 03:22:08'),
(9, 'jon', '1212', 5000.00, '2025-07-19 03:22:54'),
(10, 'farizz', '1321', 95000.00, '2025-07-20 02:06:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `account_id` int(11) DEFAULT NULL,
  `type` enum('deposit','withdraw','transfer_in','transfer_out') DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `target_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `account_id`, `type`, `amount`, `target_id`, `created_at`) VALUES
(1, 8, 'deposit', 10000.00, NULL, '2025-07-19 03:29:02'),
(2, 8, 'withdraw', 10000.00, NULL, '2025-07-19 03:29:47'),
(3, 8, 'deposit', 1000.00, NULL, '2025-07-19 03:30:05'),
(4, 8, 'transfer_out', 1000.00, 9, '2025-07-19 03:30:27'),
(5, 9, 'transfer_in', 1000.00, 8, '2025-07-19 03:30:27'),
(6, 9, 'withdraw', 1000.00, NULL, '2025-07-19 03:31:07'),
(7, 8, 'deposit', 1000.00, NULL, '2025-07-19 03:43:58'),
(8, 8, 'transfer_out', 1000.00, 8, '2025-07-19 03:44:20'),
(9, 8, 'transfer_in', 1000.00, 8, '2025-07-19 03:44:20'),
(10, 8, 'transfer_out', 1000.00, 9, '2025-07-19 03:48:49'),
(11, 9, 'transfer_in', 1000.00, 8, '2025-07-19 03:48:49'),
(12, 9, 'withdraw', 1000.00, NULL, '2025-07-19 03:49:14'),
(13, 10, 'deposit', 500000.00, NULL, '2025-07-20 02:08:56'),
(14, 10, 'withdraw', 300000.00, NULL, '2025-07-20 02:09:42'),
(15, 10, 'transfer_out', 100000.00, 8, '2025-07-20 02:10:27'),
(16, 8, 'transfer_in', 100000.00, 10, '2025-07-20 02:10:27'),
(17, 10, 'transfer_out', 5000.00, 9, '2025-07-22 15:38:34'),
(18, 9, 'transfer_in', 5000.00, 10, '2025-07-22 15:38:34');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `target_id` (`target_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`target_id`) REFERENCES `accounts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
