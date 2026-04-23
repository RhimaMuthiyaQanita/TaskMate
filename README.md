# TaskMate 📋

Aplikasi web manajemen task harian berbasis HTML, CSS, dan JavaScript vanilla.

**Link Web:** (https://task-mate-blond.vercel.app/)

---

## Fitur

- **Mengelola Task** — tambah, edit, hapus task (CRUD)
- **Prioritas Task** — label High / Medium / Low dengan warna berbeda
- **Progress Task** — progress bar persentase task selesai
- **Ringkasan Harian** — kartu statistik total, selesai, belum, dan prioritas tinggi
- **Filter Task** — filter berdasarkan status dan prioritas
- **Penyimpanan Lokal** — data tersimpan di localStorage (tidak hilang saat refresh)

---

## Teknologi

- HTML5
- CSS3 (Flexbox, Grid, CSS Variables, Responsive)
- JavaScript (Vanilla, DOM Manipulation, localStorage)

---

## Cara Menjalankan Lokal

```bash
# Clone repository
gh repo clone RhimaMuthiyaQanita/TaskMate

# Masuk folder
cd taskmate

# Buka di browser (tidak perlu server)
# Bisa langsung buka index.html di browser
```

---

## Pengujian Kualitas Sistem

Pengujian dilakukan secara manual berdasarkan 5 aspek kualitas.

### 1. Functionality (Fungsionalitas)

| No | Skenario Pengujian | Input | Output yang Diharapkan | Hasil | Status |
|----|-------------------|-------|----------------------|-------|--------|
| F-01 | Tambah task baru | Nama: "Belajar HTML", Prioritas: High, Tanggal: 2025-06-01 | Task muncul di daftar dengan badge High | Task berhasil ditambahkan dan tampil | ✅ Pass |
| F-02 | Tambah task tanpa nama | Nama kosong, klik Tambah | Muncul notifikasi "Nama task tidak boleh kosong!" | Toast muncul, task tidak ditambahkan | ✅ Pass |
| F-03 | Tandai task selesai | Klik checkbox task | Task berubah tampilan (coret, opacity turun), progress bertambah | Task berubah status done | ✅ Pass |
| F-04 | Edit task | Ubah nama dan prioritas, klik Simpan | Task diperbarui sesuai input baru | Task berhasil diperbarui | ✅ Pass |
| F-05 | Hapus task | Klik tombol hapus, konfirmasi OK | Task hilang dari daftar | Task berhasil dihapus | ✅ Pass |
| F-06 | Filter berdasarkan prioritas | Klik filter "High" | Hanya task prioritas High yang tampil | Filter berjalan sesuai | ✅ Pass |
| F-07 | Filter task selesai | Klik filter "Selesai" | Hanya task yang sudah done yang tampil | Filter berjalan sesuai | ✅ Pass |

### 2. Usability (Kemudahan Penggunaan)

| No | Skenario Pengujian | Metode | Hasil Pengamatan | Status |
|----|-------------------|--------|-----------------|--------|
| U-01 | Kemudahan menambah task | Observasi | Form tambah task mudah ditemukan, label jelas | ✅ Pass |
| U-02 | Tombol aksi mudah dibedakan | Observasi | Tombol edit dan hapus terpisah dengan ikon berbeda | ✅ Pass |
| U-03 | Feedback setelah aksi | Observasi | Toast notifikasi muncul setiap ada perubahan | ✅ Pass |
| U-04 | Tampilan prioritas jelas | Observasi | Warna badge dan border kiri task berbeda per prioritas | ✅ Pass |
| U-05 | Responsif di layar kecil | Resize browser ke 375px | Layout menyesuaikan, tidak ada elemen yang terpotong | ✅ Pass |

### 3. Performance (Performa)

Diuji menggunakan **Google Lighthouse** (Desktop mode).

| No | Skenario Pengujian | Kondisi | Hasil | Status |
|----|-------------------|---------|-------|--------|
| P-01 | Lighthouse Performance Score | Desktop, Navigation mode | **100 / 100** | ✅ Pass |
| P-02 | Lighthouse Accessibility Score | Desktop, Navigation mode | **92 / 100** | ✅ Pass |
| P-03 | Lighthouse Best Practices Score | Desktop, Navigation mode | **100 / 100** | ✅ Pass |
| P-04 | Lighthouse SEO Score | Desktop, Navigation mode | **90 / 100** | ✅ Pass |
| P-05 | Summary & progress update | Toggle task selesai | Data terupdate langsung tanpa reload | ✅ Pass |

### 4. Compatibility (Kompatibilitas Browser)

| No | Browser | Tampilan | Fungsi | Status |
|----|---------|---------|--------|--------|
| C-01 | Google Chrome | Normal | Semua fitur berjalan | ✅ Pass |
| C-02 | Microsoft Edge | Normal | Semua fitur berjalan | ✅ Pass |
| C-03 | Chrome Mobile (Android) | - | - | ⏳ Diuji setelah deploy Vercel |

### 5. Security (Keamanan Input)

| No | Skenario Pengujian | Input | Output yang Diharapkan | Hasil | Status |
|----|-------------------|-------|----------------------|-------|--------|
| S-01 | Injeksi HTML pada nama task | `<b>bold</b>` atau `<script>alert(1)</script>` | Teks ditampilkan apa adanya, tidak dieksekusi sebagai HTML | Input di-escape, aman | ✅ Pass |
| S-02 | Input melebihi batas karakter | Ketik lebih dari 100 karakter di nama task | Input terpotong di 100 karakter (maxlength) | Dibatasi oleh atribut HTML | ✅ Pass |
| S-03 | Konfirmasi sebelum hapus | Klik hapus task | Muncul dialog konfirmasi, tidak langsung terhapus | Konfirmasi muncul | ✅ Pass |

---

## Struktur Folder

```
taskmate/
├── index.html    # Struktur halaman utama
├── style.css     # Semua styling dan tampilan
├── app.js        # Logika aplikasi (CRUD, filter, render)
└── README.md     # Dokumentasi
```

---

## Developer

Dibuat sebagai proyek Daily Project 7 — mata kuliah Rekayasa Kebutuhan.
