// commands/deposit.js
const inquirer = require('inquirer');
const db = require('../db');
const { formatMoney } = require('../utils');

module.exports = async (user) => {
  if (!user) {
    console.log("Anda harus login terlebih dahulu!");
    process.exit(1);
  }

  const answer = await inquirer.default.prompt([
    { name: 'amount', message: 'Jumlah yang ingin disetor:' }
  ]);

  const amount = parseFloat(answer.amount);

  if (isNaN(amount) || amount <= 0) {
    console.log("Jumlah tidak valid!");
    process.exit(1);
  }

  try {
    await db.query('UPDATE accounts SET balance = balance + ? WHERE id = ?', [amount, user.id]);
    await db.query(
      'INSERT INTO transactions (account_id, type, amount) VALUES (?, "deposit", ?)',
      [user.id, amount]
    );
    console.log(`Berhasil menyetor: ${formatMoney(amount)}`);
    process.exit(0);
  } catch (err) {
    console.error("Gagal menyetor:", err);
    process.exit(1);
  }
};