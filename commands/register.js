// commands/register.js
const inquirer = require('inquirer');
const db = require('../db');

module.exports = async () => {
  const answers = await inquirer.default.prompt([
    { name: 'name', message: 'Masukkan nama Anda:' },
    { name: 'pin', message: 'Masukkan PIN (4 digit):', mask: '*' }
  ]);

  const { name, pin } = answers;

  // Validasi nama
  if (!name.trim()) {
    console.log("❌ Nama tidak boleh kosong.");
    return false;
  }

  if (!isNaN(name)) {
    console.log("❌ Nama tidak boleh berupa angka.");
    return false;
  }

  // Opsional: Validasi nama minimal ada huruf (bukan hanya simbol/angka)
  const hasLetter = /[a-zA-Z]/.test(name);
  if (!hasLetter) {
    console.log("❌ Nama harus mengandung huruf.");
    return false;
  }

  // Validasi PIN
  if (pin.length !== 4 || isNaN(pin)) {
    console.log("❌ PIN harus terdiri dari 4 angka.");
    return false;
  }

  try {
    // Cek apakah nama sudah dipakai
    const [existing] = await db.query(
      'SELECT * FROM accounts WHERE name = ?',
      [name]
    );

    if (existing.length > 0) {
      console.log("❌ Gagal membuat akun: Nama ini sudah terdaftar.");
      return false;
    }

    // Coba buat akun
    const [result] = await db.query(
      'INSERT INTO accounts (name, pin) VALUES (?, ?)',
      [name, pin]
    );

    console.log(`✅ Akun berhasil dibuat! Nomor akun Anda: ${result.insertId}`);
    return true;
  } catch (err) {
    console.error("🚨 Error teknis:", err.sqlMessage || err.message);
    console.log("❌ Gagal membuat akun: Terjadi kesalahan pada sistem.");
    return false;
  }
};