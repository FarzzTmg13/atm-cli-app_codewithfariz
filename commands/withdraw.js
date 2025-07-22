// commands/withdraw.js
const inquirer = require('inquirer');
const db = require('../db');
const { formatMoney } = require('../utils');

module.exports = async (user) => {
  if (!user) {
    console.log("Anda harus login terlebih dahulu!");
    process.exit(1);
  }

  const answer = await inquirer.default.prompt([
    { name: 'amount', message: 'Jumlah yang ingin ditarik:' }
  ]);

  const amount = parseFloat(answer.amount);

  if (isNaN(amount) || amount <= 0) {
    console.log("Jumlah tidak valid!");
    process.exit(1);
  }

  try {
    const [rows] = await db.query('SELECT balance FROM accounts WHERE id = ?', [user.id]);
    const balance = rows[0].balance;

    if (balance < amount) {
      console.log("Saldo tidak mencukupi!");
      process.exit(1);
    }

    await db.query('UPDATE accounts SET balance = balance - ? WHERE id = ?', [amount, user.id]);
    await db.query(
      'INSERT INTO transactions (account_id, type, amount) VALUES (?, "withdraw", ?)',
      [user.id, amount]
    );
    console.log(`Berhasil menarik tunai: ${formatMoney(amount)}`);
    process.exit(0);
  } catch (err) {
    console.error("Gagal melakukan penarikan:", err);
    process.exit(1);
  }
};