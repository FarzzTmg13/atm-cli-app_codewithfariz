// commands/checkBalance.js
const db = require('../db');
const { formatMoney } = require('../utils');

module.exports = async (user) => {
  if (!user) {
    console.log("Anda harus login terlebih dahulu!");
    process.exit(1);
  }

  try {
    const [rows] = await db.query('SELECT balance FROM accounts WHERE id = ?', [user.id]);
    console.log(`Saldo Anda: ${formatMoney(rows[0].balance)}`);
    process.exit(0);
  } catch (err) {
    console.error("Gagal memeriksa saldo:", err);
    process.exit(1);
  }
};