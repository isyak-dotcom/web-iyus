# 📖 PANDUAN SETUP WEBSITE DONGENG

Panduan lengkap untuk setup website penjualan buku dongeng dengan Google Sheets integration.

---

## 📋 DAFTAR ISI
1. [Persiapan](#persiapan)
2. [Setup Google Sheets](#setup-google-sheets)
3. [Setup Google Apps Script](#setup-google-apps-script)
4. [Konfigurasi Website](#konfigurasi-website)
5. [Hosting Website](#hosting-website)
6. [Testing & Debugging](#testing--debugging)

---

## 🚀 PERSIAPAN

Siapkan:
- ✅ Akun Google (Gmail)
- ✅ Browser modern (Chrome, Firefox, Safari)
- ✅ Text Editor (VS Code, Notepad++, atau online editor)

---

## 🗂️ SETUP GOOGLE SHEETS

### Langkah 1: Buat Google Sheet Baru
1. Buka [Google Sheets](https://sheets.google.com)
2. Klik **"+ Lembar Kerja Kosong"**
3. Beri nama: **"DONGENG_DATABASE"**
4. Biarkan sistem membuat sheets otomatis saat script dijalankan

### Langkah 2: Ambil Spreadsheet ID
1. Lihat URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
2. **Salin SHEET_ID** (string panjang antara `/d/` dan `/edit`)
3. **Simpan ID ini untuk langkah berikutnya**

Contoh URL:
```
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit#gid=0
```
Maka SHEET_ID = `1a2b3c4d5e6f7g8h9i0j`

---

## 📱 SETUP GOOGLE APPS SCRIPT

### Langkah 1: Buat Project Google Apps Script
1. Buka [Google Apps Script](https://script.google.com)
2. Klik **"Proyek Baru"** atau **"New Project"**
3. Beri nama: **"DONGENG API"**
4. Hapus code default dan **COPY SELURUH CODE dari file `Code.gs`**

### Langkah 2: Ganti Spreadsheet ID
Di atas code, cari baris ini:
```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
```

Ganti dengan:
```javascript
const SPREADSHEET_ID = '1a2b3c4d5e6f7g8h9i0j'; // Ganti dengan ID Anda
```

### Langkah 3: Deploy sebagai Web App
1. Klik **"Deploy"** (tombol biru di atas)
2. Pilih **"New Deployment"**
3. Pilih **"Type: Web app"** (dari dropdown)
4. Atur:
   - **Execute as:** Akun Google Anda
   - **Who has access:** "Anyone"
5. Klik **"Deploy"**
6. Terima akses (Google akan minta permission)
7. **COPY URL dari dialog** yang muncul

Contoh URL yang akan didapat:
```
https://script.google.com/macros/d/1a2b3c4d5e6f7g8h9i0j/usercopy
```

### Langkah 4: Catat URL untuk Website
**Simpan URL ini**, nanti akan digunakan di `app.js`

---

## 🌐 KONFIGURASI WEBSITE

### Langkah 1: Update app.js
1. Buka file **`app.js`**
2. Cari baris ini (sekitar baris 5):
```javascript
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/{SCRIPT_ID}/usercopy';
```

3. Ganti dengan URL dari langkah sebelumnya:
```javascript
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/1a2b3c4d5e6f7g8h9i0j/usercopy';
```

### Langkah 2: Verifikasi Semua File
Pastikan Anda memiliki 3 file:
- ✅ `index.html` - Website utama
- ✅ `app.js` - JavaScript handler
- ✅ `Code.gs` - Google Apps Script (sudah di-upload ke GAS)

---

## 🏠 HOSTING WEBSITE

### PILIHAN 1: Netlify (Recommended - Gratis)
1. Buat folder di komputer: `dongeng-website`
2. Letakkan **index.html** dan **app.js** di folder tersebut
3. Buka [Netlify](https://www.netlify.com)
4. Klik **"Sites"** → **"Add new site"** → **"Deploy manually"**
5. Drag & drop folder `dongeng-website`
6. Tunggu selesai, Anda akan dapat URL (contoh: `https://dongeng-abc123.netlify.app`)

### PILIHAN 2: GitHub Pages (Gratis)
1. Buat GitHub repo baru: `dongeng-website`
2. Upload `index.html` dan `app.js`
3. Di **Settings** → **Pages**, pilih source: `main branch`
4. Tunggu deploy, akses di: `https://username.github.io/dongeng-website`

### PILIHAN 3: Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. `firebase init`
3. Upload files
4. `firebase deploy`

### PILIHAN 4: Vercel
1. Buka [Vercel](https://vercel.com)
2. Upload project folder
3. Auto-deploy selesai

---

## 🧪 TESTING & DEBUGGING

### Test 1: Cek Koneksi Google Apps Script
1. Buka website Anda
2. Buka **Developer Tools** (F12)
3. Buka tab **Console**
4. Lihat pesan - harusnya: **"Koneksi berhasil"**

Jika error, cek:
- ✅ URL Google Apps Script benar di `app.js`
- ✅ Google Apps Script sudah di-deploy sebagai Web App
- ✅ Permission "Anyone" sudah diatur

### Test 2: Cek Data Buku
1. Di Console (F12), jalankan:
```javascript
checkConnection();
```

2. Lihat hasilnya di Console
3. Data buku harusnya sudah muncul di halaman

### Test 3: Tambah Data Manual di Google Sheets
1. Buka Google Sheet Anda
2. Sheet "Buku" seharusnya sudah dibuat dengan sample data
3. Refresh website - data baru harusnya muncul otomatis

---

## 📊 STRUKTUR DATA GOOGLE SHEETS

### Sheet "Buku" - Kolom:
| Kolom | Tipe | Contoh |
|-------|------|--------|
| ID | Number | 1 |
| Judul | Text | Cinderella |
| Penulis | Text | Charles Perrault |
| Kategori | Text | Dongeng Klasik |
| Harga | Number | 85000 |
| Status | Text | FOR SALE / NEW / FOR RENT |
| Deskripsi | Text | Cerita klasik tentang... |
| Tanggal Ditambah | Date | 2024-01-15 |

### Sheet "Pesanan" - Kolom:
| Kolom | Tipe |
|-------|------|
| ID | Number |
| Nama | Text |
| Email | Text |
| Nomor Telepon | Text |
| Alamat | Text |
| Buku Dipesan | Text |
| Jumlah | Number |
| Tanggal Pesan | Date |
| Status | Text |

### Sheet "Testimoni" - Kolom:
| Kolom | Tipe |
|-------|------|
| ID | Number |
| Nama | Text |
| Email | Text |
| Pesan | Text |
| Tanggal | Date |
| Rating | Number |

---

## 🎨 KATEGORI & EMOJI

Kategori yang tersedia (dengan emoji otomatis):
- 👸 Dongeng Klasik
- 🏮 Cerita Lokal
- ✨ Dongeng Modern
- 📚 Buku Edukasi
- 🗺️ Petualangan
- 🧙 Fantasi
- 🔍 Misteri
- 👫 Persahabatan
- 🌿 Alam
- 📖 Umum

Emoji akan otomatis ditampilkan sesuai kategori buku.

---

## ❓ TROUBLESHOOTING

### Error: "CORS Error" atau "Failed to fetch"
**Solusi:**
- Cek URL Google Apps Script di `app.js`
- Deploy ulang Google Apps Script (Settings → Deployment)
- Pastikan permission "Anyone" sudah diatur

### Error: "Spreadsheet not found"
**Solusi:**
- Cek Spreadsheet ID di Code.gs
- Pastikan Google Apps Script memiliki akses ke Sheet
- Run function `testGAS()` di Google Apps Script editor

### Data buku tidak muncul
**Solusi:**
- Di Google Apps Script, jalankan function `initializeSheets()`
- Check sheet "Buku" sudah ada
- Lihat Console (F12) untuk error messages

### Form pesanan tidak berfungsi
**Solusi:**
- Buat form HTML dengan name attributes
- Contoh form ada di bawah panduan ini
- Test di Console sebelum production

---

## 💡 TIPS & TRIK

### Menambah Fitur
1. **Search/Filter Buku:**
```javascript
function searchBooks(keyword) {
  // Tambahkan filter ke array books
}
```

2. **Payment Integration:**
Gunakan Midtrans, Stripe, atau GCash API

3. **Admin Dashboard:**
Buat sheet terpisah untuk admin dengan password

### SEO & Performance
- Tambahkan `<meta>` tags di `<head>` index.html
- Compress images
- Use lazy loading untuk book cards
- Add social media meta tags (Open Graph)

### Backup Data
Selalu backup Google Sheet Anda:
- Download sebagai CSV
- atau gunakan automatic backup di Google Drive

---

## 📞 SUPPORT

Jika ada error atau pertanyaan:

1. Cek console (F12) untuk error message
2. Check Google Apps Script logs (Execution → Runtime)
3. Test function di Google Apps Script editor:
```javascript
testGAS();
```

---

## 🎯 NEXT STEPS

Setelah setup berhasil:
1. ✅ Tambahkan lebih banyak buku ke Google Sheet
2. ✅ Customize warna/font sesuai brand Anda
3. ✅ Setup email notifications
4. ✅ Add payment gateway
5. ✅ Setup analytics (Google Analytics)
6. ✅ Optimize untuk mobile

---

## 📝 CHECKLIST SETUP LENGKAP

- [ ] Google Sheet dibuat dan ID dikopi
- [ ] Google Apps Script dibuat dan di-deploy
- [ ] URL GAS dikopi dan ditaruh di app.js
- [ ] Website files (index.html, app.js) sudah ready
- [ ] Website di-upload ke hosting
- [ ] Website dapat diakses dari browser
- [ ] Data buku muncul di website
- [ ] Console tidak ada error
- [ ] Responsif di mobile

---

**Selamat! Website DONGENG Anda siap digunakan! 🎉📖✨**

Jika ada pertanyaan, check dokumentasi atau test di console.

