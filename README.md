
# 🤖 Agnthub Automation Bot

Automasi harian untuk [Agnthub Quests](https://quests.agnthub.ai) menggunakan Node.js.  
Script ini akan melakukan **daily check-in otomatis** dan menjalankan semua task bertipe **SOCIAL** secara looping dengan delay acak.

---

## 🚀 Fitur

- ✅ Daily check-in otomatis
- 🔁 Looping semua SOCIAL task aktif
- ⏱ Delay acak antar round (5–15 detik)
- 📈 Menampilkan poin terbaru setelah setiap round
- 🧠 Bisa dijalankan secara manual atau otomatis (cronjob)

---

## 📦 Instalasi

### 1. Clone repositori

```bash
git clone https://github.com/yourusername/agnthub-automation.git
cd agnthub-automation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat file `.env`

Buat file `.env` di root folder dengan isi seperti ini:

```env
PRIVY_ID_TOKEN=your_id_token_here
PRIVY_TOKEN=your_token_here
```

> ⚠️ **Penting:** Jangan pernah upload `.env` ke GitHub. Ini berisi kredensial pribadi.

---

## 🔐 Cara Mendapatkan Token `.env`

Untuk menjalankan bot, kamu perlu 2 token dari browser saat login ke Agnthub:

- `privy-id-token`
- `privy-token`

### Langkah-langkah:

1. Buka [https://quests.agnthub.ai](https://quests.agnthub.ai) dan login
2. Tekan `F12` untuk membuka Developer Tools
3. Buka tab **Application**
4. Pilih **Cookies > https://quests.agnthub.ai**
5. Temukan dan salin nilai dari:
   - `privy-id-token`
   - `privy-token`
6. Tempelkan ke file `.env` seperti ini:

```env
PRIVY_ID_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6...
PRIVY_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

## 🧠 Cara Jalankan

```bash
node agnthubAutomation.js
```

Yang akan terjadi:
1. 🔐 Melakukan autentikasi
2. 📅 Daily check-in
3. 📋 Menemukan dan menjalankan SOCIAL tasks
4. ⏳ Menunggu delay acak
5. ⭐ Menampilkan total poin setelah round

---

## 🗂 Struktur Proyek

```
agnthub-automation/
├── .env.example         # Contoh environment variable
├── .gitignore           # Hindari upload token
├── agnthubAutomation.js # Script utama
├── package.json         # Dependencies
└── README.md            # Dokumentasi ini
```

---

## ⏲️ Otomatisasi dengan Cron (Opsional)

Jalankan script ini secara otomatis setiap hari (misalnya jam 08:00) dengan cron:

```bash
crontab -e
```

Tambahkan baris ini:

```
0 8 * * * /usr/bin/node /path/to/agnthubAutomation.js >> /path/to/log.txt 2>&1
```

---

## ⚠️ Disclaimer

> Script ini dibuat untuk **otomatisasi pribadi**.  
> Gunakan dengan bijak dan **patuhi ketentuan Agnthub**.  
> Penulis tidak bertanggung jawab atas penyalahgunaan.

---

## 👨‍💻 Kontribusi

Pull request dan ide sangat diterima!

1. Fork repositori ini
2. Buat branch fitur: `git checkout -b fitur-baru`
3. Commit perubahan: `git commit -am 'Tambah fitur'`
4. Push branch: `git push origin fitur-baru`
5. Buka Pull Request

---

## 📫 Kontak

Dibuat dengan ❤️ oleh [@yourusername](https://github.com/yourusername)  
Ganti `yourusername` di atas dengan username GitHub kamu.
