# ❓ FAQ & TROUBLESHOOTING WEBSITE DONGENG

---

## 🔧 COMMON ISSUES & SOLUTIONS

### ❌ ISSUE 1: "Failed to fetch" atau CORS Error

**Error di Console:**
```
Access to XMLHttpRequest at 'https://script.google.com/...' from origin 'https://...' has been blocked by CORS policy
```

**Penyebab:**
- URL Google Apps Script salah
- Google Apps Script belum di-deploy sebagai Web App
- Deployment settings tidak sesuai

**Solusi:**
1. Buka Google Apps Script Anda
2. Klik **Deployments** (ikon titik tiga)
3. Lihat URL Web App - salin URL lengkap
4. Paste ke `app.js` baris 5:
```javascript
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/{SCRIPT_ID}/usercopy';
```
5. Cek di Code.gs baris 1-4:
```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Harus benar!
```
6. Di Google Apps Script, Edit → Project Settings → Show "appsscript.json"
7. Cek ada permission untuk `spreadsheets.google.com`

---

### ❌ ISSUE 2: Data Buku Tidak Muncul

**Gejala:**
- Console tidak ada error
- Halaman loading tapi buku tidak muncul
- Terlihat placeholder loading terus

**Penyebab:**
- Sheet "Buku" belum dibuat
- Data belum ditambahkan ke sheet
- Code.gs `initializeSheets()` belum dijalankan

**Solusi:**
1. Buka Google Apps Script
2. Di code editor, pilih function `testGAS` dari dropdown
3. Klik **Run** (tombol play ▶️)
4. Lihat Executions - harusnya "Completed"
5. Buka Google Sheet Anda
6. Refresh, sekarang sheet "Buku" harusnya sudah ada
7. Refresh website - data harusnya muncul

---

### ❌ ISSUE 3: "Spreadsheet not found" atau "Invalid Spreadsheet ID"

**Error di Console:**
```
Invalid Spreadsheet ID
```

**Penyebab:**
- Spreadsheet ID di Code.gs salah
- Ada typo di ID

**Solusi:**
1. Buka Google Sheet Anda
2. Lihat URL: `https://docs.google.com/spreadsheets/d/{ID}/edit`
3. Copy ID (hanya bagian panjang)
4. Kembali ke Google Apps Script
5. Paste ke baris 1:
```javascript
const SPREADSHEET_ID = '1a2b3c4d5e6f7g8h9i0j'; // Ganti ini!
```
6. Jangan lupa save (Ctrl+S)

---

### ❌ ISSUE 4: Form Pesanan Tidak Mengirim Data

**Gejala:**
- Klik "Pesan" tapi tidak ada respons
- atau error "undefined GOOGLE_APPS_SCRIPT_URL"

**Solusi:**
1. Di `index.html`, pastikan ada `<script src="app.js"></script>` sebelum `</body>`
2. Di `app.js`, cek URL sudah benar (lihat ISSUE 1)
3. Di Console (F12), ketik:
```javascript
console.log(GOOGLE_APPS_SCRIPT_URL);
```
4. Harusnya muncul URL Google Apps Script
5. Jika undefined, berarti `app.js` tidak di-load

---

### ❌ ISSUE 5: Website Tampilan Berantakan atau Tidak Ada Styling

**Gejala:**
- Warna kuning tidak muncul
- Layout berantakan
- Teks kecil sekali

**Penyebab:**
- CSS belum ter-load (sudah di-bundle di index.html)
- Browser cache

**Solusi:**
1. Hard refresh: **Ctrl+Shift+R** (Windows) atau **Cmd+Shift+R** (Mac)
2. Buka DevTools (F12) → Network
3. Refresh dan lihat apakah file di-load
4. Pastikan index.html file sudah ter-upload lengkap (buka file, hitung baris - harusnya 500+ baris dengan CSS di dalamnya)

---

### ❌ ISSUE 6: Animasi/Scroll Effect Tidak Berjalan

**Gejala:**
- Elemen tidak fade in saat di-scroll
- Semua elemen langsung muncul

**Solusi:**
1. Animasi memerlukan JavaScript `Intersection Observer`
2. Browser lama (IE11) tidak support
3. Cek browser version Anda di [caniuse.com](https://caniuse.com)
4. Jika perlu IE support, buka `app.js` dan beri polyfill

---

## ❓ FREQUENTLY ASKED QUESTIONS

### Q1: Bagaimana cara mengganti warna dominan dari kuning ke warna lain?

**Jawab:**
Di `index.html`, cari di bagian `<style>` (sekitar baris 14-17):

```css
:root {
    --primary-yellow: #F4C430;
    --dark-yellow: #D4A017;
    /* ... */
}
```

Ganti nilai hex color:
- `#F4C430` = Warna utama (kuning cerah)
- `#D4A017` = Warna hover (kuning gelap)

Contoh warna lain:
- **Merah:** `#FF6B6B` (utama) dan `#D63031` (gelap)
- **Biru:** `#4ECDC4` (utama) dan `#0984E3` (gelap)
- **Hijau:** `#00B894` (utama) dan `#00A550` (gelap)

---

### Q2: Bagaimana cara menambah buku baru?

**Jawab:**
Mudah! Cukup buka Google Sheet Anda:
1. Buka tab "Buku"
2. Klik baris paling bawah yang kosong
3. Isi kolom:
   - **ID** = nomor unik (1, 2, 3, dst)
   - **Judul** = nama buku
   - **Penulis** = nama penulis
   - **Kategori** = salah satu dari: Dongeng Klasik, Cerita Lokal, Dongeng Modern, Buku Edukasi, dll
   - **Harga** = harga dalam rupiah (angka saja, contoh: 85000)
   - **Status** = FOR SALE, NEW, FOR RENT, atau RECOMMENDED
   - **Deskripsi** = penjelasan singkat buku
   - **Tanggal Ditambah** = otomatis (biarkan kosong)

4. Refresh website - buku baru langsung muncul!

---

### Q3: Bagaimana cara mengubah kategori buku?

**Jawab:**
Emoji buku otomatis sesuai kategori. Kategori yang tersedia:

| Kategori | Emoji |
|----------|-------|
| Dongeng Klasik | 👸 |
| Cerita Lokal | 🏮 |
| Dongeng Modern | ✨ |
| Buku Edukasi | 📚 |
| Petualangan | 🗺️ |
| Fantasi | 🧙 |
| Misteri | 🔍 |
| Persahabatan | 👫 |
| Alam | 🌿 |
| Umum | 📖 |

Ingin tambah kategori?
Di `app.js`, cari function `getEmojiByCategory()`:

```javascript
function getEmojiByCategory(kategori) {
    const emojiMap = {
        'Dongeng Klasik': '👸',
        'Kategori Baru': '🎭', // Tambahkan di sini
        // ...
    };
}
```

---

### Q4: Bagaimana cara setup email notification saat ada pesanan?

**Jawab:**
Di `Code.gs`, ada function `sendOrderNotification()` yang sudah siap.

Uncomment untuk enable:

```javascript
function sendOrderNotification(orderData) {
  try {
    const email = 'email@anda.com'; // Ganti ini!
    // ... 
    GmailApp.sendEmail(email, subject, message); // Uncomment baris ini
  }
}
```

**Cara:**
1. Buka Google Apps Script
2. Cari function `sendOrderNotification`
3. Ganti `email` dengan email Anda
4. Uncomment baris: `GmailApp.sendEmail(email, subject, message);`
5. Save & Deploy ulang

---

### Q5: Apakah website ini mobile-friendly?

**Jawab:**
**YA!** Website sudah fully responsive di:
- 📱 Phone (320px - 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (1024px+)

Semua animasi dan form juga berfungsi di mobile.

---

### Q6: Bagaimana cara hosting website?

**Jawab:**
Ada 4 pilihan hosting gratis:

1. **Netlify** (Recommended)
   - Drag & drop folder
   - Auto HTTPS
   - Cepat & reliable

2. **GitHub Pages**
   - Gratis selamanya
   - Cocok untuk portfolio
   - Good untuk version control

3. **Firebase Hosting**
   - Google product
   - CLI based
   - Good untuk scaling

4. **Vercel**
   - Untuk Next.js/React
   - Deploy dengan git push
   - Very fast

**Lihat detail di PANDUAN_SETUP.md bagian "Hosting Website"**

---

### Q7: Bisa pakai payment gateway?

**Jawab:**
Bisa! Buat form pesanan dengan payment gateway:

**Opsi populer:**
1. **Midtrans** (Indonesia, recommended)
2. **Stripe** (Global)
3. **PayPal**
4. **GCash** (Philippines)

Ada sample integration? Belum di project ini, tapi flow-nya:
1. User submit form
2. Validasi data di server
3. Generate payment token dari Midtrans API
4. Redirect ke payment page
5. Callback ke server saat berhasil
6. Update status di Google Sheet

Lihat dokumentasi Midtrans untuk detail.

---

### Q8: Bagaimana data aman?

**Jawab:**
Data Anda tersimpan di Google Sheets yang:
- ✅ Encrypted end-to-end
- ✅ Automatic backup
- ✅ Access control bisa diatur
- ✅ Audit logs tersedia
- ✅ Compliant dengan GDPR

**Security tips:**
1. Jangan share Spreadsheet ID publik
2. Set permission sheet ke "Private"
3. Backup data regularly
4. Gunakan Google Workspace untuk fitur admin lebih lengkap

---

### Q9: Berapa biaya setup ini?

**Jawab:**
**GRATIS!** 🎉

- Google Sheet = Gratis
- Google Apps Script = Gratis (hingga 13 juta execution/hari)
- Website = Bisa gratis (Netlify, GitHub Pages)
- Domain = Optional (bisa pakai subdomain gratis dulu)

Total biaya per tahun: **ZERO** (jika pakai free hosting + free domain)

---

### Q10: Bagaimana cara backup data?

**Jawab:**
Backup data Anda dengan:

**Pilihan 1: Manual Download**
```
Google Sheet → File → Download → CSV/Excel
```

**Pilihan 2: Automatic di Google Drive**
```
Setting → Back up to Google Drive (auto setiap hari)
```

**Pilihan 3: Script Backup**
Tambahkan ke Code.gs:
```javascript
function backupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const copy = spreadsheet.copy('BACKUP_' + new Date());
  Logger.log('Backup created: ' + copy.getId());
}
```

Jalankan `backupSheet()` sebelum membuat perubahan besar.

---

### Q11: Bagaimana cara menghapus buku?

**Jawab:**
**Opsi 1: Langsung di Sheet**
1. Buka Google Sheet → Tab "Buku"
2. Right click baris buku yang mau dihapus
3. Pilih "Delete row"
4. Refresh website

**Opsi 2: Menggunakan Script**
Di `Code.gs` sudah ada function `deleteBuku(id)`:

```javascript
deleteBuku(1); // Hapus buku dengan ID 1
```

Jalankan di Google Apps Script Editor.

---

### Q12: Bikin admin dashboard bisa?

**Jawab:**
Bisa! Ada 2 cara:

**Opsi 1: Google Sheets Add-on**
- Kurang flexible, tapi cepat

**Opsi 2: Buat halaman admin terpisah**
- Buat `admin.html` dengan form add/edit/delete
- Protect dengan password simple
- Update Google Sheet via Apps Script

**Opsi 3: Google Data Studio**
- Dashboard analytics real-time
- Koneksi langsung ke Google Sheet
- Gratis!

---

## 📞 CARA DEBUGGING

Jika ada error, ikuti langkah ini:

### Step 1: Buka Console (F12)
```
Di browser → F12 → Console tab
```

### Step 2: Lihat Error Message
Catatan error yang ada, misalnya:
```
Uncaught TypeError: GOOGLE_APPS_SCRIPT_URL is not defined
```

### Step 3: Search Error di FAQ ini
Cek error message Anda di atas

### Step 4: Check Google Apps Script Logs
```
Google Apps Script Editor → Executions (icon jam)
Lihat logs dan error dari server
```

### Step 5: Test Function Manual
Di Google Apps Script Editor:
```
Pilih function → Run → lihat hasil
```

---

## 🆘 MASIH BINGUNG?

Jika masalah belum teratasi:

1. **Screenshot error** dan URL
2. **Check Console** (F12) → lihat error message
3. **Check Google Apps Script Logs**
4. **Copy error message** dan search di Google
5. **Buat issue** di GitHub jika pakai GitHub

---

## ✅ CHECKLIST DEBUGGING

Sebelum hubungi support, pastikan:

- [ ] Sudah baca panduan setup (PANDUAN_SETUP.md)
- [ ] Google Apps Script sudah di-deploy
- [ ] URL Apps Script sudah di-paste ke app.js
- [ ] Spreadsheet ID sudah di-paste ke Code.gs
- [ ] Sheet "Buku" sudah ada
- [ ] Console (F12) di-check sudah tidak ada error
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Test di browser berbeda
- [ ] Cek internet connection

---

**Semoga bermanfaat! Jika masih ada pertanyaan, jangan ragu untuk tanya! 😊**

Happy coding & happy selling! 📖✨
