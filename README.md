# 🏧 Simulasi Mesin ATM CLI by @codewithfariz in instagram

Aplikasi simulasi mesin ATM berbasis **Command Line Interface (CLI)** yang dibangun dengan **Node.js** dan **MySQL**. Proyek ini mensimulasikan fungsi dasar ATM seperti registrasi, login, cek saldo, setor tunai, tarik tunai, transfer, dan riwayat transaksi — semua dijalankan melalui terminal.

---

## 📌 Fitur Utama

- ✅ **Registrasi Akun** – Buat akun baru dengan nama dan PIN 4 digit
- ✅ **Login** – Masuk menggunakan nomor akun dan PIN
- ✅ **Cek Saldo** – Lihat saldo akun secara real-time
- ✅ **Setor Tunai** – Tambahkan dana ke akun
- ✅ **Tarik Tunai** – Tarik uang dengan batasan saldo
- ✅ **Transfer Antar Akun** – Kirim uang ke akun lain dengan pencatatan ganda (`transfer_out` dan `transfer_in`)
- ✅ **Riwayat Transaksi** – Lihat semua transaksi yang pernah dilakukan
- ✅ **Validasi Input** – Cegah transfer ke akun sendiri, saldo negatif, dan input tidak valid

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Deskripsi |
|----------|-----------|
| **Node.js** | Runtime JavaScript untuk menjalankan aplikasi |
| **MySQL** | Database relasional untuk menyimpan data akun dan transaksi |
| **Commander.js** | Membuat perintah CLI seperti `register`, `login`, dll |
| **Inquirer.js** | Menangani input interaktif di terminal |
| **phpMyAdmin / MySQL Workbench** | Manajemen database |
| **Visual Studio Code** | Editor kode utama |

---

## 📦 Instalasi

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/username/atm-cli-app_codewithfariz.git 
   cd atm-cli-app_codewithfariz
