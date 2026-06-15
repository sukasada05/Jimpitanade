📊 TOPOLOGI SISTEM

```
┌─────────────────────────────────────────────────────────────────────┐
│                        JIMPITAN BALI SYSTEM                         │
│                    Topologi Arsitektur Terintegrasi                  │
└─────────────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │   Pengguna   │
                              │  (Petugas)   │
                              └──────┬──────┘
                                     │
                            📱 Buka index.html
                                     │
                         ┌───────────┴───────────┐
                         │    GitHub Pages /      │
                         │   Hosting Statis       │
                         │   (PWA + Offline)      │
                         └───────────┬───────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
              ▼                      ▼                      ▼
    ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
    │    SUPABASE     │   │  GOOGLE APPS    │   │    TELEGRAM     │
    │   (Database     │   │     SCRIPT      │   │    BOT API      │
    │    Online)      │   │   (Backend)     │   │                 │
    └────────┬────────┘   └────────┬────────┘   └────────┬────────┘
             │                     │                      │
             ▼                     ▼                      ▼
    ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
    │  - nasabah      │   │  - CRUD API     │   │  Auto kirim     │
    │  - transaksi    │   │  - Sync Sheet   │   │  notifikasi     │
    │  - Realtime     │   │  - Telegram     │   │  ke Group       │
    └────────┬────────┘   └────────┬────────┘   └─────────────────┘
             │                     │
             │                     ▼
             │            ┌─────────────────┐
             │            │  GOOGLE SHEETS  │
             │            │  (Backup Data)  │
             │            │                 │
             │            │  - nasabah      │
             │            │  - transaksi    │
             │            └─────────────────┘
             │
             ▼
    ┌─────────────────┐
    │   SUPABASE      │
    │   REALTIME      │
    │   (Live Sync)   │
    └─────────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│                         ALUR DATA                                    │
└─────────────────────────────────────────────────────────────────────┘

  1. PETUGAS INPUT SETORAN
     │
     ├──> index.html (Frontend PWA)
     │      │
     │      ├──> Ambil daftar nasabah dari Supabase
     │      │
     │      ├──> Simpan transaksi ke Supabase (Database Utama)
     │      │
     │      ├──> Kirim ke Google Apps Script (Backend API)
     │      │      │
     │      │      ├──> Simpan ke Google Sheets (Backup)
     │      │      └──> Kirim notifikasi ke Telegram
     │      │
     │      ├──> Generate Struk PNG (html2canvas)
     │      │
     │      ├──> Download PNG ke HP Petugas
     │      │
     │      └──> Share PNG ke WhatsApp Nasabah
     │
     └──> SELESAI


┌─────────────────────────────────────────────────────────────────────┐
│                      ALUR NOTIFIKASI                                 │
└─────────────────────────────────────────────────────────────────────┘

  Setor → Google Apps Script → Telegram Bot → Group Telegram
                                        │
                                        └──> Notifikasi:
                                             "📋 JIMPITAN Mangsatria
                                              👤 Ni Luh Sari
                                              💰 Rp6.000 (3 hari)
                                              📅 15/6/2026"


┌─────────────────────────────────────────────────────────────────────┐
│                      ALUR SYNC DATA                                  │
└─────────────────────────────────────────────────────────────────────┘

  Supabase (Master) ←→ Google Sheets (Backup)
       │                      │
       │                      │
       └──────────┬───────────┘
                  │
          Sinkronisasi
          dua arah via
          Google Apps Script


┌─────────────────────────────────────────────────────────────────────┐
│                    TEKNOLOGI STACK                                   │
└─────────────────────────────────────────────────────────────────────┘

  FRONTEND:
  ├── HTML5 + Tailwind CSS (CDN)
  ├── Vanilla JavaScript
  ├── Bootstrap Icons
  ├── html2canvas (Struk PNG)
  └── PWA (Service Worker + Manifest)

  BACKEND:
  ├── Google Apps Script (Web App API)
  ├── Supabase (PostgreSQL Database)
  └── Telegram Bot API

  STORAGE:
  ├── Supabase (Primary Database)
  ├── Google Sheets (Backup Spreadsheet)
  └── Local Storage (PWA Cache)

  DEPLOY:
  └── GitHub Pages / Netlify / Vercel (Static Hosting)
```

---

📄 README.md

```markdown
# 🌾 Jimpitan Bali - Mangsatria

> Aplikasi Tabungan Jimpitan Harian berbasis **Kalender Bali (6 Sasih = 210 Hari)**  
> Terintegrasi **Supabase**, **Google Sheets**, **Telegram**, dan **WhatsApp**

---

## 📊 Topologi Sistem

```

Pengguna (Petugas)
│
▼
index.html (PWA Frontend)
│
├──► Supabase (Database Utama)
├──► Google Apps Script (Backend API)
│       ├──► Google Sheets (Backup)
│       └──► Telegram Bot (Notifikasi)
├──► html2canvas (Generate Struk PNG)
└──► WhatsApp (Kirim Struk ke Nasabah)

```

---

## 🚀 Fitur Utama

| Fitur | Keterangan |
|---|---|
| 📱 **PWA** | Installable, offline mode |
| 💾 **Setor & Cetak** | Input setoran → auto generate struk PNG |
| 📤 **Share WhatsApp** | Kirim struk langsung ke nasabah |
| ☁️ **Supabase** | Database PostgreSQL online + realtime |
| 📊 **Google Sheets** | Backup otomatis setiap transaksi |
| 📢 **Telegram** | Notifikasi otomatis ke grup petugas |
| ✏️ **Edit/Hapus** | Koreksi transaksi yang salah |
| 📈 **Progress 210 Hari** | Pantau sisa hari setoran |
| 👤 **Dropdown Nasabah** | Data nasabah dari Supabase |
| 🌐 **CDN** | Tailwind CSS, Bootstrap Icons, html2canvas |

---

## 📁 Struktur Project

```

jimpitan-bali/
│
├── index.html              # Frontend utama (PWA)
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker (offline cache)
│
├── css/
│   └── style.css           # Custom CSS (minimal)
│
├── js/
│   └── app.js              # Logic + Supabase + Telegram
│
├── backend/
│   └── googleAppsScript.gs # Google Apps Script API
│
├── supabase/
│   └── schema.sql          # Struktur tabel Supabase
│
├── assets/
│   ├── icon-192.png        # Icon PWA 192x192
│   └── icon-512.png        # Icon PWA 512x512
│
└── README.md               # Dokumentasi

```

---

## ⚙️ Setup & Instalasi

### 1️⃣ Supabase (Database)

1. Buat project di [supabase.com](https://supabase.com)
2. Buka **SQL Editor** → copy isi `supabase/schema.sql` → Run
3. Catat `SUPABASE_URL` dan `SUPABASE_ANON_KEY` (Settings → API)

### 2️⃣ Google Apps Script (Backend)

1. Buka [script.google.com](https://script.google.com)
2. Buat project baru → copy isi `backend/googleAppsScript.gs`
3. Ganti `SPREADSHEET_ID` dengan ID Google Sheets Anda
4. Ganti `TELEGRAM_BOT_TOKEN` dan `TELEGRAM_CHAT_ID`
5. Deploy → **Web App** → Execute as: `Me` → Who has access: `Anyone`
6. Copy URL Web App

### 3️⃣ Google Sheets (Backup)

1. Buat spreadsheet baru
2. Buat 2 sheet: `nasabah` dan `transaksi`
3. **Sheet `nasabah`** header: `id | nama | desa | target_harian`
4. **Sheet `transaksi`** header: `id | nasabah_id | nominal | hari | tanggal_setor`
5. Copy Spreadsheet ID dari URL

### 4️⃣ Telegram Bot

1. Chat `@BotFather` di Telegram
2. `/newbot` → beri nama → dapatkan `BOT_TOKEN`
3. Buat grup → tambahkan bot → kirim pesan test
4. Buka `https://api.telegram.org/bot<TOKEN>/getUpdates` → dapatkan `CHAT_ID`

### 5️⃣ Update Konfigurasi

Edit `js/app.js`:

```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOi...';
const GAS_URL = 'https://script.google.com/macros/s/xxxxx/exec';
const TELEGRAM_BOT = '123456:ABC-DEF1234ghikl';
const TELEGRAM_CHAT = '-100123456789';
```

6️⃣ Deploy Frontend

GitHub Pages:

```bash
git init
git add .
git commit -m "Initial"
git branch -M main
git remote add origin https://github.com/USERNAME/jimpitan-bali.git
git push -u origin main
```

Settings → Pages → Source: main → Save

Alternatif: Netlify, Vercel, atau hosting statis lainnya.

---

📝 Cara Penggunaan

1. Setup Awal

· Buka aplikasi
· Tab Atur → pilih nasabah dari dropdown
· Isi target/hari dan desa
· Klik Mulai Tabungan

2. Setor Harian

· Tab Setor → pilih chip (1/2/3/5/7 hari) atau masukkan nominal manual
· Klik Setor & Kirim WA
· Struk otomatis terdownload & muncul share WhatsApp

3. Edit Transaksi

· Tab Edit → klik Edit/Hapus pada transaksi

4. Lihat Riwayat

· Tab Riwayat → total setor, progress, tabel transaksi

---

📊 Contoh Struk

```
      -JIMPITAN Mangsatria-
         Desa Padang Bulia
------------------------------------------------------------
Nasabah         : Ni Luh Sari
Target/hari     : Rp2.000/hari
Tgl setor       : 15/6/2026 s.d. 17/6/2026
                     (3 hari)
------------------------------------------------------------
15/6/2026                  Rp2.000
16/6/2026                  Rp2.000
17/6/2026                  Rp2.000
------------------------------------------------------------
Jumlah Setor              Rp6.000
------------------------------------------------------------
      Terima kasih
    Om Swastiastu 🙏
```

---

📢 Notifikasi Telegram

```
📋 JIMPITAN Mangsatria
📍 Desa Padang Bulia
👤 Nasabah: Ni Luh Sari
💰 Setor: Rp6.000 (3 hari)
📅 Tgl: 15/06/2026
🙏 Om Swastiastu
```

---

🔧 Teknologi

Teknologi Fungsi
HTML5 + Tailwind CSS UI responsive mobile-first
Vanilla JavaScript Logic frontend
Supabase Database PostgreSQL + Realtime
Google Apps Script Backend API + Sync
Google Sheets Backup spreadsheet
Telegram Bot API Notifikasi otomatis
html2canvas Generate struk PNG
Service Worker PWA + offline cache
Bootstrap Icons Icon set

---

🌐 CDN yang Digunakan

CDN URL
Tailwind CSS cdn.tailwindcss.com
Bootstrap Icons cdn.jsdelivr.net/npm/bootstrap-icons
html2canvas cdn.jsdelivr.net/npm/html2canvas
Google Fonts fonts.googleapis.com (JetBrains Mono, Plus Jakarta Sans)

---

🔒 Keamanan

· Supabase: Row Level Security aktif
· Google Apps Script: Deploy sebagai Web App terbatas
· Telegram: Token bot tersimpan di backend
· HTTPS: Diwajibkan untuk PWA & Service Worker

---

📄 Lisensi

MIT © Mangsatria - Desa Padang Bulia

---

🤝 Kontribusi

1. Fork repo
2. Buat branch fitur (git checkout -b fitur-baru)
3. Commit perubahan (git commit -m 'Add fitur')
4. Push ke branch (git push origin fitur-baru)
5. Buat Pull Request

---

📞 Kontak

· Desa: Padang Bulia
· Sistem: Jimpitan Mangsatria
· Periode: 6 Sasih (210 Hari)

---

Dibuat dengan ❤️ untuk kemudahan mencatat tabungan harian masyarakat Bali

```

---

## 📋 Ringkasan File Final

| No | File | Deskripsi |
|---|---|---|
| 1 | `index.html` | Frontend PWA ringkas |
| 2 | `css/style.css` | CSS minimal (tailwind extend) |
| 3 | `js/app.js` | Logic + Supabase + Telegram |
| 4 | `manifest.json` | PWA manifest |
| 5 | `sw.js` | Service Worker (offline) |
| 6 | `backend/googleAppsScript.gs` | API backend |
| 7 | `supabase/schema.sql` | Database schema |
| 8 | `README.md` | Dokumentasi lengkap |
| 9 | `assets/icon-192.png` | Icon PWA |
| 10 | `assets/icon-512.png` | Icon PWA |

---

Semua file sudah siap pakai. Tinggal:
1. Setup Supabase
2. Deploy Google Apps Script
3. Buat Telegram Bot
4. Update konfigurasi di `js/app.js`
5. Upload ke GitHub Pages

Sistem langsung jalan: **dropdown nasabah live, backup sheet otomatis, notif Telegram realtime, struk PNG ke WhatsApp**.