// commands/showTransactionHistory.js
const db = require('../db');

module.exports = async (user) => {
  if (!user) {
    console.log("❌ Anda harus login terlebih dahulu.");
    return;
  }

  try {
    const [rows] = await db.query(
      `SELECT type, amount, target_id, created_at 
       FROM transactions 
       WHERE account_id = ? 
       ORDER BY created_at DESC`,
      [user.id]
    );

    if (rows.length === 0) {
      console.log("📊 Belum ada transaksi.");
      return;
    }

    console.log(`\n📋 Riwayat Transaksi - ${user.name}`);
    console.log("-".repeat(60));

    rows.forEach((trx) => {
      let deskripsi = "";

      switch (trx.type) {
        case 'deposit':
          deskripsi = `Setor tunai`;
          break;
        case 'withdraw':
          deskripsi = `Tarik tunai`;
          break;
        case 'transfer_out':
          deskripsi = `Transfer ke akun ${trx.target_id}`;
          break;
        case 'transfer_in':
          deskripsi = `Dana masuk dari akun ${trx.target_id}`;
          break;
        default:
          deskripsi = trx.type;
      }

      // Konversi amount dari string ke number
      const amount = parseFloat(trx.amount);
      const waktu = trx.created_at; // Sudah dalam format string dari MySQL

      if (isNaN(amount)) {
        console.log(`${waktu} | ${deskripsi.padEnd(30)} | Rp?.??`);
      } else {
        console.log(
          `${waktu} | ${deskripsi.padEnd(30)} | Rp${amount.toFixed(2)}`
        );
      }
    });
    console.log("-".repeat(60));
  } catch (err) {
    console.error("Error teknis:", err.message);
    console.log("❌ Gagal memuat riwayat transaksi. Silakan coba lagi.");
  }
};