// commands/login.js
const inquirer = require('inquirer');
const db = require('../db');

module.exports = async (callback) => {
  const answers = await inquirer.default.prompt([
    { name: 'id', message: 'Masukkan nomor akun Anda:' },
    { name: 'pin', message: 'Masukkan PIN:', mask: '*' }
  ]);

  const id = parseInt(answers.id);
  const pin = answers.pin;

  if (isNaN(id)) {
    console.log("Nomor akun harus berupa angka!");
    return callback(null);
  }

  try {
    const [rows] = await db.query('SELECT * FROM accounts WHERE id = ? AND pin = ?', [id, pin]);
    if (rows.length === 0) {
      console.log("Nomor akun atau PIN salah!");
      return callback(null);
    }
    console.log("Login berhasil!");
    callback(rows[0]);
  } catch (err) {
    console.error("Gagal login:", err);
    callback(null);
  }
};