// ========================================
// KONFIGURASI - ISI DENGAN LINK GOOGLE APPS SCRIPT ANDA
// ========================================
// Setelah membuat Google Apps Script, deploy sebagai Web App
// Copy URL-nya dan paste di bawah
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/{SCRIPT_ID}/usercopy'; // GANTI INI

// ========================================
// FETCH DATA BUKU DARI GOOGLE SHEETS
// ========================================
async function fetchBooks() {
    try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL + '?action=getBooks');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data buku berhasil diambil:', data);
        return data.books || [];
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}

// ========================================
// RENDER BOOK CARDS
// ========================================
function renderBooks(books) {
    const container = document.getElementById('booksContainer');
    
    if (!books || books.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #b0b0b0; padding: 2rem;">Belum ada data buku. Silakan tambahkan data ke Google Sheets Anda.</p>';
        return;
    }

    container.innerHTML = books.map((book, index) => `
        <div class="book-card" style="animation-delay: ${0.4 + index * 0.1}s">
            <div class="book-image">
                ${getEmojiByCategory(book.kategori || 'Umum')}
                ${book.status ? `<span class="book-status">${book.status}</span>` : ''}
            </div>
            <div class="book-info">
                <h3>${book.judul || 'Judul Tidak Ada'}</h3>
                <p class="book-author">👤 ${book.penulis || 'Penulis Tidak Ada'}</p>
                <p class="book-description">${book.deskripsi || 'Deskripsi tidak tersedia'}</p>
                <div class="book-footer">
                    <span class="book-price">Rp${formatPrice(book.harga)}</span>
                    <span class="book-location">📍 ${book.kategori || 'Umum'}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Trigger scroll animations untuk card yang baru dirender
    observeElements();
}

// ========================================
// GET EMOJI BERDASARKAN KATEGORI
// ========================================
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
        'Umum': '📖'
    };
    return emojiMap[kategori] || '📖';
}

// ========================================
// FORMAT HARGA
// ========================================
function formatPrice(price) {
    if (!price) return '0';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// ========================================
// SCROLL ANIMATION DENGAN INTERSECTION OBSERVER
// ========================================
function observeElements() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe semua elemen yang ingin di-animate
    document.querySelectorAll('.book-card, .feature-card, .stat-item, .about-image, .about-text, .testimonial-content, .final-cta, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// SMOOTH SCROLL UNTUK NAVIGATION LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// FORM HANDLING (JIKA ADA)
// ========================================
const orderForm = document.querySelector('form');
if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Ambil data dari form
        const formData = new FormData(orderForm);
        const data = {
            action: 'addOrder',
            nama: formData.get('nama'),
            email: formData.get('email'),
            nomorTelepon: formData.get('nomorTelepon'),
            alamat: formData.get('alamat'),
            bukuDipesan: formData.get('bukuDipesan'),
            jumlah: formData.get('jumlah'),
            tanggal: new Date().toISOString()
        };

        try {
            const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if (result.success) {
                alert('Pesanan berhasil dikirim! Terima kasih.');
                orderForm.reset();
            } else {
                alert('Terjadi kesalahan: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim pesanan.');
        }
    });
}

// ========================================
// TAMBAH TESTIMONI (OPSIONAL)
// ========================================
async function submitTestimoni(nama, email, pesan) {
    const data = {
        action: 'addTestimoni',
        nama: nama,
        email: email,
        pesan: pesan,
        tanggal: new Date().toISOString()
    };

    try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

// ========================================
// INISIALISASI SAAT HALAMAN DIMUAT
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Halaman dimuat, mengambil data buku...');
    
    // Fetch dan render buku
    const books = await fetchBooks();
    renderBooks(books);
    
    // Setup scroll observers
    observeElements();
    
    // Setup smooth scroll dan other interactions
    setupInteractions();
});

// ========================================
// SETUP INTERAKSI LAINNYA
// ========================================
function setupInteractions() {
    // Animate header on scroll
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(244, 196, 48, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Video button click (untuk future implementation)
    const videoBtn = document.querySelector('.secondary-button');
    if (videoBtn) {
        videoBtn.addEventListener('click', () => {
            alert('Video akan segera hadir!');
        });
    }
}

// ========================================
// HELPER: CHECK CONNECTION KE GOOGLE APPS SCRIPT
// ========================================
async function checkConnection() {
    try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL + '?action=test');
        const data = await response.json();
        console.log('Koneksi berhasil:', data);
        return true;
    } catch (error) {
        console.error('Gagal terhubung ke Google Apps Script:', error);
        console.warn('Pastikan URL Google Apps Script benar di variabel GOOGLE_APPS_SCRIPT_URL');
        return false;
    }
}

// Cek koneksi saat halaman load
window.addEventListener('load', () => {
    checkConnection();
});

// ========================================
// EXPORT FUNCTIONS UNTUK TESTING
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchBooks, renderBooks, submitTestimoni };
}
