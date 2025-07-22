// commands/transfer.js
const inquirer = require('inquirer');
const db = require('../db');
const { formatMoney } = require('../utils');

module.exports = async (user) => {
  if (!user) {
    console.log("Anda harus login terlebih dahulu!");
    process.exit(1);
  }

  const answers = await inquirer.default.prompt([
    { name: 'targetId', message: 'Nomor akun tujuan:' },
    { name: 'amount', message: 'Jumlah yang ingin ditransfer:' }
  ]);

  const targetId = parseInt(answers.targetId);
  const amount = parseFloat(answers.amount);

  if (isNaN(targetId) || isNaN(amount) || amount <= 0) {
    console.log("Input tidak valid!");
    process.exit(1);
  }

  if (targetId === user.id) {
    console.log("❌ Tidak bisa transfer ke akun sendiri.");
    return;
    }

  try {
    const [[sender]] = await db.query('SELECT balance FROM accounts WHERE id = ?', [user.id]);
    if (sender.balance < amount) {
      console.log("Saldo tidak mencukupi!");
      process.exit(1);
    }

    // Update saldo pengirim
    await db.query('UPDATE accounts SET balance = balance - ? WHERE id = ?', [amount, user.id]);

    // Update saldo penerima
    await db.query('UPDATE accounts SET balance = balance + ? WHERE id = ?', [amount, targetId]);

    // Tambahkan transaksi pengirim
    await db.query(
      'INSERT INTO transactions (account_id, type, amount, target_id) VALUES (?, "transfer_out", ?, ?)',
      [user.id, amount, targetId]
    );

    // Tambahkan transaksi penerima
    await db.query(
      'INSERT INTO transactions (account_id, type, amount, target_id) VALUES (?, "transfer_in", ?, ?)',
      [targetId, amount, user.id]
    );

    console.log(`Transfer sebesar ${formatMoney(amount)} ke akun ${targetId} berhasil.`);
    process.exit(0);
  } catch (err) {
    console.error("Gagal melakukan transfer:", err);
    process.exit(1);
  }
};