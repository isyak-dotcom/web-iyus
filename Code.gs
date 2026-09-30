// ========================================
// GOOGLE APPS SCRIPT FOR DONGENG BOOK STORE
// Copy semua code ini ke Google Apps Script Editor
// ========================================

// SETUP SPREADSHEET ID
// 1. Buat Google Sheet baru
// 2. Copy ID dari URL: docs.google.com/spreadsheets/d/{SHEET_ID}/edit
// 3. Paste di bawah

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // GANTI INI

// ========================================
// INISIALISASI SHEET
// ========================================
function initializeSheets() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let bukuSheet = spreadsheet.getSheetByName('Buku');
  let orderSheet = spreadsheet.getSheetByName('Pesanan');
  let testimoniSheet = spreadsheet.getSheetByName('Testimoni');

  // Buat sheet Buku jika belum ada
  if (!bukuSheet) {
    bukuSheet = spreadsheet.insertSheet('Buku');
    bukuSheet.appendRow(['ID', 'Judul', 'Penulis', 'Kategori', 'Harga', 'Status', 'Deskripsi', 'Tanggal Ditambah']);
    
    // Sample data
    bukuSheet.appendRow([1, 'Cinderella', 'Charles Perrault', 'Dongeng Klasik', 85000, 'FOR SALE', 'Cerita klasik tentang gadis muda yang bermimpi', new Date()]);
    bukuSheet.appendRow([2, 'Malin Kundang', 'Cerita Rakyat', 'Cerita Lokal', 65000, 'FOR SALE', 'Legenda rakyat dari Minangkabau yang penuh pesan moral', new Date()]);
    bukuSheet.appendRow([3, 'Snow White', 'Grimm Brothers', 'Dongeng Klasik', 85000, 'NEW', 'Cerita tentang putri salju yang indah dan tujuh kurcaci', new Date()]);
    bukuSheet.appendRow([4, 'The Enchanted Garden', 'Sarah Anderson', 'Dongeng Modern', 95000, 'FOR SALE', 'Petualangan modern di taman yang penuh magic', new Date()]);
  }

  // Buat sheet Pesanan jika belum ada
  if (!orderSheet) {
    orderSheet = spreadsheet.insertSheet('Pesanan');
    orderSheet.appendRow(['ID', 'Nama', 'Email', 'Nomor Telepon', 'Alamat', 'Buku Dipesan', 'Jumlah', 'Tanggal Pesan', 'Status']);
  }

  // Buat sheet Testimoni jika belum ada
  if (!testimoniSheet) {
    testimoniSheet = spreadsheet.insertSheet('Testimoni');
    testimoniSheet.appendRow(['ID', 'Nama', 'Email', 'Pesan', 'Tanggal', 'Rating']);
  }

  return { bukuSheet, orderSheet, testimoniSheet };
}

// ========================================
// HANDLE WEB REQUEST
// ========================================
function doGet(e) {
  const action = e.parameter.action;
  
  try {
    if (action === 'test') {
      return ContentService.createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Google Apps Script terhubung!' 
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (action === 'getBooks') {
      return getBooks();
    }
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: 'Action tidak dikenali' 
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    if (action === 'addOrder') {
      return addOrder(data);
    }
    
    if (action === 'addTestimoni') {
      return addTestimoni(data);
    }

    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: 'Action tidak dikenali' 
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ========================================
// GET SEMUA BUKU
// ========================================
function getBooks() {
  try {
    initializeSheets();
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const bukuSheet = spreadsheet.getSheetByName('Buku');
    const data = bukuSheet.getDataRange().getValues();

    // Header adalah row pertama, data dimulai dari row 2
    const books = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      books.push({
        id: row[0],
        judul: row[1],
        penulis: row[2],
        kategori: row[3],
        harga: row[4],
        status: row[5],
        deskripsi: row[6],
        tanggalDitambah: row[7]
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      books: books 
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error di getBooks: ' + error);
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ========================================
// TAMBAH PESANAN
// ========================================
function addOrder(data) {
  try {
    initializeSheets();
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const orderSheet = spreadsheet.getSheetByName('Pesanan');
    
    // Generate ID
    const allData = orderSheet.getDataRange().getValues();
    const nextId = allData.length; // ID berdasarkan jumlah row

    // Tambah data
    orderSheet.appendRow([
      nextId,
      data.nama,
      data.email,
      data.nomorTelepon,
      data.alamat,
      data.bukuDipesan,
      data.jumlah,
      new Date(),
      'PENDING'
    ]);

    // Send email notif (optional)
    sendOrderNotification(data);

    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      message: 'Pesanan berhasil ditambahkan!',
      orderId: nextId
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error di addOrder: ' + error);
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ========================================
// TAMBAH TESTIMONI
// ========================================
function addTestimoni(data) {
  try {
    initializeSheets();
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const testimoniSheet = spreadsheet.getSheetByName('Testimoni');
    
    // Generate ID
    const allData = testimoniSheet.getDataRange().getValues();
    const nextId = allData.length;

    // Tambah data
    testimoniSheet.appendRow([
      nextId,
      data.nama,
      data.email,
      data.pesan,
      new Date(),
      data.rating || 5
    ]);

    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      message: 'Testimoni berhasil ditambahkan!',
      testimoniId: nextId
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error di addTestimoni: ' + error);
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ========================================
// SEND EMAIL NOTIFICATION (OPTIONAL)
// ========================================
function sendOrderNotification(orderData) {
  try {
    const email = Session.getActiveUser().getEmail();
    const subject = `Pesanan Baru dari ${orderData.nama}`;
    const message = `
      Pesanan Baru:
      
      Nama: ${orderData.nama}
      Email: ${orderData.email}
      Nomor Telepon: ${orderData.nomorTelepon}
      Alamat: ${orderData.alamat}
      Buku: ${orderData.bukuDipesan}
      Jumlah: ${orderData.jumlah}
      Tanggal: ${new Date()}
    `;

    // Uncomment untuk mengirim email
    // GmailApp.sendEmail(email, subject, message);
    Logger.log('Notifikasi pesanan: ' + JSON.stringify(orderData));
  } catch (error) {
    Logger.log('Error sending notification: ' + error);
  }
}

// ========================================
// GET BUKU BERDASARKAN ID
// ========================================
function getBukuById(id) {
  try {
    initializeSheets();
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const bukuSheet = spreadsheet.getSheetByName('Buku');
    const data = bukuSheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == id) {
        return {
          id: data[i][0],
          judul: data[i][1],
          penulis: data[i][2],
          kategori: data[i][3],
          harga: data[i][4],
          status: data[i][5],
          deskripsi: data[i][6]
        };
      }
    }
    return null;
  } catch (error) {
    Logger.log('Error di getBukuById: ' + error);
    return null;
  }
}

// ========================================
// UPDATE STATUS PESANAN
// ========================================
function updateOrderStatus(orderId, newStatus) {
  try {
    initializeSheets();
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const orderSheet = spreadsheet.getSheetByName('Pesanan');
    const data = orderSheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == orderId) {
        orderSheet.getRange(i + 1, 9).setValue(newStatus);
        return true;
      }
    }
    return false;
  } catch (error) {
    Logger.log('Error di updateOrderStatus: ' + error);
    return false;
  }
}

// ========================================
// GET TOTAL STATS
// ========================================
function getStats() {
  try {
    initializeSheets();
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const bukuSheet = spreadsheet.getSheetByName('Buku');
    const orderSheet = spreadsheet.getSheetByName('Pesanan');

    const totalBuku = bukuSheet.getDataRange().getValues().length - 1; // exclude header
    const totalPesanan = orderSheet.getDataRange().getValues().length - 1; // exclude header

    return {
      totalBuku: totalBuku,
      totalPesanan: totalPesanan,
      ratingAveragr: 4.9,
      tahunPengalaman: 10
    };
  } catch (error) {
    Logger.log('Error di getStats: ' + error);
    return null;
  }
}

// ========================================
// DELETE BUKU
// ========================================
function deleteBuku(id) {
  try {
    initializeSheets();
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const bukuSheet = spreadsheet.getSheetByName('Buku');
    const data = bukuSheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == id) {
        bukuSheet.deleteRow(i + 1);
        return true;
      }
    }
    return false;
  } catch (error) {
    Logger.log('Error di deleteBuku: ' + error);
    return false;
  }
}

// ========================================
// TESTING FUNCTION
// ========================================
function testGAS() {
  Logger.log('Testing Google Apps Script...');
  initializeSheets();
  
  const books = getBooks();
  Logger.log('Books retrieved: ' + JSON.stringify(books));
  
  const stats = getStats();
  Logger.log('Stats: ' + JSON.stringify(stats));
}
