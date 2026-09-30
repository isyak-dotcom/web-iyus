# 🎨 CUSTOMIZE REFERENCE - Panduan Lengkap Customization

Panduan lengkap cara customize setiap aspek website DONGENG.

---

## 📋 DAFTAR ISI
1. [Mengubah Warna](#mengubah-warna)
2. [Mengubah Teks & Copy](#mengubah-teks--copy)
3. [Menambah Kategori Buku](#menambah-kategori-buku)
4. [Menambah Fitur](#menambah-fitur)
5. [Mengubah Layout](#mengubah-layout)
6. [Menambah Section Baru](#menambah-section-baru)
7. [Font & Typography](#font--typography)
8. [Code Snippets](#code-snippets)

---

## 🎨 MENGUBAH WARNA

### Lokasi: `index.html` - bagian `<style>`

Cari di sekitar **baris 14-17:**

```css
:root {
    --primary-yellow: #F4C430;
    --dark-yellow: #D4A017;
    --dark-bg: #1a1a1a;
    --light-text: #f0f0f0;
    --accent-dark: #2a2a2a;
    --text-gray: #b0b0b0;
}
```

### Penjelasan Setiap Warna

| Variable | Penggunaan | Default |
|----------|-----------|---------|
| `--primary-yellow` | Button, link, accent utama | `#F4C430` (kuning cerah) |
| `--dark-yellow` | Hover state, gelap | `#D4A017` (kuning gelap) |
| `--dark-bg` | Background utama | `#1a1a1a` (hitam) |
| `--light-text` | Text heading, utama | `#f0f0f0` (putih) |
| `--accent-dark` | Card background | `#2a2a2a` (hitam gelap) |
| `--text-gray` | Secondary text, description | `#b0b0b0` (abu-abu) |

### Contoh: Ubah Ke Tema Biru

```css
:root {
    --primary-yellow: #4ECDC4;  /* Cyan/Teal */
    --dark-yellow: #0984E3;     /* Blue gelap */
    --dark-bg: #0D1B2A;         /* Dark navy */
    --light-text: #E8F4F8;      /* Light cyan */
    --accent-dark: #1A2633;     /* Navy accent */
    --text-gray: #7FA4B8;       /* Gray-blue */
}
```

### Contoh: Ubah Ke Tema Merah Romantis

```css
:root {
    --primary-yellow: #FF6B6B;  /* Red cerah */
    --dark-yellow: #D63031;     /* Red gelap */
    --dark-bg: #2C2C2C;         /* Dark gray */
    --light-text: #FFE5E5;      /* Light pink */
    --accent-dark: #3D3D3D;     /* Gray accent */
    --text-gray: #A0A0A0;       /* Medium gray */
}
```

### Contoh: Ubah Ke Tema Hijau Alam

```css
:root {
    --primary-yellow: #00B894;  /* Green cerah */
    --dark-yellow: #00A550;     /* Green gelap */
    --dark-bg: #1A2726;         /* Dark green-gray */
    --light-text: #E8F5E9;      /* Light green */
    --accent-dark: #263238;     /* Dark accent */
    --text-gray: #607D8B;       /* Gray-green */
}
```

### Tools untuk Mencari Warna
- [Coolors.co](https://coolors.co) - Palette generator
- [Color-hex.com](https://color-hex.com) - Hex color converter
- [Colordot.it](https://color.hailpixel.com) - Interactive picker

---

## 📝 MENGUBAH TEKS & COPY

### Lokasi: `index.html` - HTML content

Cari text yang ingin diubah dan ganti langsung.

#### Mengubah Title & Meta

**Baris ~4:**
```html
<title>DONGENG - Toko Buku Cerita Dongeng Terbaik</title>
```

Ubah jadi:
```html
<title>Nama Toko Anda - Penjualan Buku Dongeng Premium</title>
```

#### Mengubah Logo/Brand Name

**Baris ~109:**
```html
<div class="logo">📖 DONGENG</div>
```

Ubah jadi:
```html
<div class="logo">📖 NAMA TOKO ANDA</div>
```

#### Mengubah Hero Text

**Baris ~183-189:**
```html
<h1>Jelajahi Dunia <span>Dongeng Ajaib</span></h1>
<p>Temukan koleksi cerita dongeng terbaik, petualangan luar biasa, dan imajinasi tanpa batas...</p>
```

Ubah sesuai keinginan.

#### Mengubah Feature Descriptions

**Baris ~215-245:**
```html
<div class="feature-card">
    <div class="feature-icon">📖</div>
    <h3>Koleksi Lengkap</h3>
    <p>Ribuan cerita dari penulis terkenal...</p>
</div>
```

Ubah text dalam `<h3>` dan `<p>`.

---

## ➕ MENAMBAH KATEGORI BUKU

### Langkah 1: Tambah di Google Sheet

Di sheet "Buku", saat menambah buku baru, gunakan kategori yang belum ada di list emoji.

### Langkah 2: Update app.js

**Lokasi: `app.js` - baris 70-85**

```javascript
function getEmojiByCategory(kategori) {
    const emojiMap = {
        'Dongeng Klasik': '👸',
        'Cerita Lokal': '🏮',
        'Dongeng Modern': '✨',
        'Buku Edukasi': '📚',
        'Petualangan': '🗺️',
        'Fantasi': '🧙',
        'Misteri': '🔍',
        'Persahabatan': '👫',
        'Alam': '🌿',
        // TAMBAHKAN DI SINI:
        'Komik': '💭',
        'Sains': '🔬',
        'Sejarah': '📜',
        'Biografi': '👤',
        'Umum': '📖'
    };
    return emojiMap[kategori] || '📖';
}
```

### Emoji Suggestions

```
Kategori                Emoji
Komik                   💭 atau 🎨
Sains & Teknologi       🔬 atau 🚀
Sejarah                 📜 atau 🏛️
Biografi                👤 atau 📖
Horor                   👻 atau 😱
Humor                   😂 atau 🤣
Cinta & Romantis        💕 atau 💑
Thriller                🔪 atau 😰
Spiritual               🙏 atau ✨
Self-help               💪 atau 🧠
Poetry                  📝 atau ✍️
Drama                   🎭 atau 😢
Adventure               🗺️ atau 🏕️
Mystery                 🔍 atau 🕵️
Science Fiction         🚀 atau 🛸
```

---

## ➕ MENAMBAH FITUR

### Fitur 1: Search/Filter Buku

**Tambah di `index.html` sebelum `<div id="booksContainer">`:**

```html
<div style="
    max-width: 1400px;
    margin: 0 auto 2rem;
    padding: 0 3rem;
    display: flex;
    gap: 1rem;
">
    <input 
        type="text" 
        id="searchInput" 
        placeholder="Cari judul atau penulis..." 
        style="
            flex: 1;
            padding: 0.8rem;
            background: var(--accent-dark);
            border: 1px solid rgba(244, 196, 48, 0.2);
            border-radius: 8px;
            color: var(--light-text);
        "
    >
    <button 
        onclick="filterBooks()" 
        class="cta-button"
    >
        Cari
    </button>
</div>
```

**Tambah di `app.js`:**

```javascript
function filterBooks(books) {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    if (!searchTerm) {
        return books;
    }
    
    return books.filter(book => 
        book.judul.toLowerCase().includes(searchTerm) ||
        book.penulis.toLowerCase().includes(searchTerm) ||
        book.kategori.toLowerCase().includes(searchTerm)
    );
}

// Update renderBooks function
function renderBooks(allBooks) {
    const filtered = filterBooks(allBooks);
    const container = document.getElementById('booksContainer');
    
    if (!filtered || filtered.length === 0) {
        container.innerHTML = '<p style="...">Buku tidak ditemukan</p>';
        return;
    }
    
    container.innerHTML = filtered.map((book, index) => 
        // ... render code
    ).join('');
}
```

---

### Fitur 2: Rating/Bintang

**Tambah di book card (dalam `renderBooks`):**

```javascript
<div style="display: flex; justify-content: space-between; align-items: center;">
    <span class="book-price">Rp${formatPrice(book.harga)}</span>
    <span style="color: var(--primary-yellow);">⭐ 4.8</span>
</div>
```

---

### Fitur 3: View Lebih Detail

**Tambah function di `app.js`:**

```javascript
function showBookDetail(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    const modal = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div style="
                background: var(--accent-dark);
                padding: 2rem;
                border-radius: 15px;
                max-width: 600px;
                color: var(--light-text);
            ">
                <h2>${book.judul}</h2>
                <p>Penulis: ${book.penulis}</p>
                <p>Kategori: ${book.kategori}</p>
                <p>Harga: Rp${formatPrice(book.harga)}</p>
                <p>${book.deskripsi}</p>
                <button onclick="closeModal()" class="cta-button">
                    Tutup
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modal);
}
```

---

## 🎯 MENGUBAH LAYOUT

### Mengubah Number of Book Cards Per Row

**Lokasi: `index.html` baris ~645**

Cari:
```css
.books-container {
    ...
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    ...
}
```

Ubah `minmax(280px, 1fr)` untuk mengontrol lebar card:
```css
/* 4 cards wide */
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

/* 3 cards wide */
grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

/* 2 cards wide */
grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
```

---

### Mengubah Feature Cards Layout

**Dari 4 kolom jadi 2 kolom:**

**Baris ~1090:**
```css
.features-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
```

Ubah jadi:
```css
.features-grid {
    grid-template-columns: repeat(2, 1fr);  /* 2 kolom */
}
```

---

### Mengubah Hero Section

Dari side-by-side jadi stacked:

**Baris ~558:**
```css
.hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;  /* 1fr 1fr = side by side */
    ...
}
```

Ubah jadi:
```css
.hero-content {
    display: grid;
    grid-template-columns: 1fr;  /* Full width */
    ...
}
```

---

## 📄 MENAMBAH SECTION BARU

### Contoh: Tambah Newsletter Section

**Tambah sebelum `</body>`:**

```html
<section style="
    background: var(--primary-yellow);
    color: var(--dark-bg);
    padding: 4rem 3rem;
    text-align: center;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out 0.3s forwards;
">
    <div style="max-width: 600px; margin: 0 auto;">
        <h2>Dapatkan Info Buku Terbaru</h2>
        <p>Subscribe newsletter kami untuk diskon eksklusif & promo spesial</p>
        <div style="
            display: flex;
            gap: 0.5rem;
            margin-top: 1.5rem;
        ">
            <input 
                type="email" 
                placeholder="email@anda.com"
                style="
                    flex: 1;
                    padding: 0.8rem;
                    border: none;
                    border-radius: 8px;
                    background: var(--dark-bg);
                    color: var(--light-text);
                "
            >
            <button style="
                background: var(--dark-bg);
                color: var(--primary-yellow);
                padding: 0.8rem 2rem;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 700;
            ">
                Subscribe
            </button>
        </div>
    </div>
</section>
```

---

## 🔤 FONT & TYPOGRAPHY

### Mengubah Font Family

**Baris ~11:**
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

Ubah ke font favorit Anda:

```css
/* Google Fonts */
font-family: 'Poppins', sans-serif;
font-family: 'Inter', sans-serif;
font-family: 'Merriweather', serif;
font-family: 'Playfair Display', serif;
font-family: 'Montserrat', sans-serif;
```

**Untuk menggunakan Google Fonts, tambah di `<head>`:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

---

### Mengubah Font Size

**Heading 1 (Hero title):**
```css
.hero-text h1 {
    font-size: 3.5rem;  /* Ubah angka ini */
}
```

**Heading 2 (Section title):**
```css
.section-intro h2 {
    font-size: 2.5rem;  /* Ubah angka ini */
}
```

**Paragraph:**
```css
.hero-text p {
    font-size: 1.1rem;  /* Ubah angka ini */
}
```

---

### Mengubah Line Height (spasi baris)

```css
body {
    line-height: 1.6;  /* 1.4-1.8 recommended untuk readability */
}
```

---

## 💻 CODE SNIPPETS

### Snippet 1: Tambah Google Analytics

**Tambah di `<head>` (sebelum `</head>`):**

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

Ganti `G-XXXXXXX` dengan Google Analytics ID Anda.

---

### Snippet 2: Tambah WhatsApp Chat Button

**Tambah sebelum `</body>`:**

```html
<a href="https://wa.me/62812xxxxxxx?text=Halo%20DONGENG" 
   target="_blank"
   style="
       position: fixed;
       bottom: 30px;
       right: 30px;
       background: #25D366;
       color: white;
       width: 60px;
       height: 60px;
       border-radius: 50%;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: 30px;
       text-decoration: none;
       box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
       z-index: 999;
   ">
   💬
</a>
```

Ganti `62812xxxxxxx` dengan nomor WhatsApp Anda.

---

### Snippet 3: Tambah Social Share Button

**Tambah di setiap book card:**

```html
<div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
    <a href="https://facebook.com/sharer/sharer.php?u=${window.location.href}" 
       target="_blank"
       style="color: var(--primary-yellow); text-decoration: none;">f</a>
    <a href="https://twitter.com/intent/tweet?url=${window.location.href}&text=${book.judul}" 
       target="_blank"
       style="color: var(--primary-yellow); text-decoration: none;">𝕏</a>
    <a href="https://wa.me/?text=${book.judul} ${window.location.href}" 
       target="_blank"
       style="color: var(--primary-yellow); text-decoration: none;">💬</a>
</div>
```

---

### Snippet 4: Tambah Toast Notification

**Tambah function di `app.js`:**

```javascript
function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, duration);
}

// Gunakan:
// showToast('Berhasil!', 'success');
// showToast('Error!', 'error');
```

---

### Snippet 5: Dark/Light Mode Toggle

**Tambah di navigation:**

```html
<button id="themeToggle" style="
    background: transparent;
    color: var(--primary-yellow);
    border: 1px solid var(--primary-yellow);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1rem;
">
    🌙
</button>
```

**Tambah di `app.js`:**

```javascript
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

themeToggle?.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});

function applyTheme(theme) {
    if (theme === 'light') {
        htmlElement.style.colorScheme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        htmlElement.style.colorScheme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);
```

---

## 🎬 MENGUBAH ANIMASI

### Mengubah Durasi Animasi

**Baris ~1085 (fadeInUp):**
```css
@keyframes fadeInUp {
    /* 0.8s adalah durasi - ubah ke nilai lain */
    animation: fadeInUp 0.8s ease-out forwards;
}
```

Opsi durasi:
```css
0.3s - Sangat cepat
0.5s - Cepat
0.8s - Normal (default)
1s - Lambat
1.5s - Sangat lambat
```

---

### Mengubah Easing Function

```css
/* ease-out (default) - cepat di awal, lambat di akhir */
animation: fadeInUp 0.8s ease-out;

/* ease-in-out - lambat di awal & akhir */
animation: fadeInUp 0.8s ease-in-out;

/* ease-in - lambat di awal */
animation: fadeInUp 0.8s ease-in;

/* linear - speed konstan */
animation: fadeInUp 0.8s linear;
```

---

### Menambah Animasi Bounce

```css
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

/* Gunakan di element */
.some-element {
    animation: bounce 1s ease-in-out infinite;
}
```

---

## 🔗 EXTERNAL RESOURCES

- [Google Fonts](https://fonts.google.com)
- [Coolors.co](https://coolors.co)
- [CSS Tricks](https://css-tricks.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [W3Schools](https://w3schools.com)

---

**Happy Customizing! 🎨✨**

Jika ada pertanyaan tentang customization, check FAQ_TROUBLESHOOTING.md atau test di Console.
