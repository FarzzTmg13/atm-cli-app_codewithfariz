// atm.js
const inquirer = require('inquirer');
const { formatMoney } = require('./utils');
const db = require('./db');

// Import command functions
const register = require('./commands/register');
const login = require('./commands/login');
const checkBalance = require('./commands/checkBalance');
const deposit = require('./commands/deposit');
const withdraw = require('./commands/withdraw');
const transfer = require('./commands/transfer');
const showTransactionHistory = require('./commands/showTransactionHistory');

let currentUser = null;

async function showMainMenu() {
  const { action } = await inquirer.default.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Pilih aksi:',
      choices: [
        'Cek Saldo',
        'Setor Tunai',
        'Tarik Tunai',
        'Transfer',
        'Riwayat Transaksi',
        'Logout'
      ]
    }
  ]);

  switch (action) {
    case 'Cek Saldo':
      await checkBalance(currentUser);
      break;
    case 'Setor Tunai':
      await deposit(currentUser);
      break;
    case 'Tarik Tunai':
      await withdraw(currentUser);
      break;
    case 'Transfer':
      await transfer(currentUser);
      break;
    case 'Riwayat Transaksi':
      await showTransactionHistory(currentUser);
      break;  
    case 'Logout':
      currentUser = null;
      console.log("Logout berhasil.");
      await showAuthMenu();
      return;
  }

  await showMainMenu();
}

async function showAuthMenu() {
  const { choice } = await inquirer.default.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Selamat datang di ATM',
      choices: [
        'Register',
        'Login',
        'Keluar'
      ]
    }
  ]);

  switch (choice) {
    case 'Register':
        const success = await register(); // register mengembalikan status
        if (success) {
            console.log("✅ Registrasi berhasil! Silakan login untuk melanjutkan.");
        } else {
            console.log("⚠️ Registrasi gagal. Silakan coba lagi.");
        }
        await showAuthMenu();
        break;
    case 'Login':
      await new Promise((resolve) => {
        login((user) => {
          currentUser = user;
          resolve();
        });
      });
      if (currentUser) {
        console.log(`Selamat datang, ${currentUser.name}!`);
        await showMainMenu();
      } else {
        await showAuthMenu();
      }
      break;
    case 'Keluar':
      console.log("Terima kasih telah menggunakan ATM kami.");
      process.exit(0);
  }
}

// Jalankan aplikasi
showAuthMenu();