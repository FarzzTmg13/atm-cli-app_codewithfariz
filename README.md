# Simulasi Mesin ATM CLI by Fariz Husain Albar
## Follow Instagram: fariz.webdev

Aplikasii simulasi mesin ATM berbasis **Command Line Interface (CLI)** yang dibangun dengan **Node.js** dan **MySQL**. Proyek ini mensimulasikan fungsi dasar ATM seperti registrasi, login, cek saldo, setor tunai, tarik tunai, transfer, dan riwayat transaksi — semua dijalankan melalui terminal.

---

## Fitur Utama

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

2. **Install Dependensi**
   ```bash
   npm install

3. **Buat Database MySQL**
   - Buka phpMyAdmin atau MySQL CLI
   - Buat database bernama backend (atau sesuaikan di db.js)
   - Jalankan script SQL di bawah

4. **Buat Tabel Database**
   ```bash
   -- Tabel accounts
   CREATE TABLE accounts (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       pin VARCHAR(4) NOT NULL,
       balance DECIMAL(10,2) DEFAULT 0.00,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   -- Tabel transactions
   CREATE TABLE transactions (
       id INT AUTO_INCREMENT PRIMARY KEY,
       account_id INT NOT NULL,
       type ENUM('deposit', 'withdraw', 'transfer_in', 'transfer_out') NOT NULL,
       amount DECIMAL(10,2) NOT NULL,
       target_id INT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (account_id) REFERENCES accounts(id),
       FOREIGN KEY (target_id) REFERENCES accounts(id)
   );

5. **Konfigurasi koneksi Database**
   - Buka file db.js
   - Sesuaikan user, password, dan database jika diperlukan.
     
   ```bash
   const pool = mysql.createPool({
     host: 'localhost',
     user: 'root',
     password: '',        // ubah jika ada password
     database: 'backend', // sesuaikan nama database
     ...
   });


**Cara Penggunaan**
   - Jalankan aplikasi:
     ```bash
     node atm.js
