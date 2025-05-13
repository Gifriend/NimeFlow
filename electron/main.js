// electron/main.js
import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Mendapatkan __dirname di konteks ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cek sederhana untuk environment development
// NOTE: Anda mungkin perlu cara yang lebih kuat untuk mendeteksi mode dev
const isDev = process.env.NODE_ENV !== 'production';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'), // Opsional jika perlu preload script
      nodeIntegration: false, // Praktik terbaik: biarkan false
      contextIsolation: true,  // Praktik terbaik: biarkan true
    },
  });

  if (isDev) {
    // Development: Muat dari server Vite dev
    // Pastikan port ini (5173) cocok dengan yang digunakan Vite DAN yang ada di perintah wait-on di package.json
    mainWindow.loadURL('http://localhost:4321');
    mainWindow.webContents.openDevTools(); // Buka DevTools otomatis
  } else {
    // Production: Muat build statis dari Vite
    // Path ini berasumsi 'dist' ada di root, dan 'main.js' ada di 'electron'
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  mainWindow.on('closed', () => {
    // Handle event window ditutup jika perlu
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // Di macOS, buat ulang window jika di-klik di dock & tidak ada window lain
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Keluar aplikasi saat semua window ditutup (kecuali di macOS)
  if (process.platform !== 'darwin') {
    app.quit();
  }
});