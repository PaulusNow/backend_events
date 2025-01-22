# Backend Event Mania

Backend Aplikasi Event

## Deskripsi

Ini adalah backend untuk Aplikasi Event, sebuah aplikasi web yang memungkinkan pengguna untuk mengelola event - event yang sedang berlangsung. Backend ini dibangun menggunakan Node.js dan Express, menyediakan API RESTful untuk berinteraksi dengan frontend.

## Instalasi

1. Clone repositori:
   ```bash
   git clone <repository-url>
   cd ticket-app/backend
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

3. Buat file `.env` di direktori root dan tambahkan variabel lingkungan yang diperlukan. Anda dapat merujuk ke file `.env.example` untuk panduan.

## Penggunaan

Untuk memulai server backend, jalankan perintah berikut:
```bash
node app.js
```
Server akan dimulai pada port yang ditentukan (default adalah 3000).

## Endpoint API

### Pengguna
- **POST** `/api/users/register`: Mendaftar pengguna baru.
- **POST** `/api/users/login`: Masuk sebagai pengguna yang sudah ada.
- **GET** `/api/users/:id`: Mendapatkan detail pengguna.

### Acara
- **POST** `/api/events`: Membuat acara baru.
- **GET** `/api/events`: Mendapatkan daftar acara.
- **GET** `/api/events/:id`: Mendapatkan detail acara.
- **PUT** `/api/events/:id`: Memperbarui acara.
- **DELETE** `/api/events/:id`: Menghapus acara.

## Variabel Lingkungan

Variabel lingkungan berikut diperlukan:
- `DB_HOST`: Host database.
- `DB_USER`: Pengguna database.
- `DB_PASS`: Kata sandi database.
- `JWT_SECRET`: Kunci rahasia untuk JWT.

## Kontribusi

Kontribusi sangat diterima! Silakan buka isu atau kirim permintaan tarik untuk perbaikan atau fitur apa pun.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.
