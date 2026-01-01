## Unofficial Komikcast API

Unofficial Komikcast API adalah REST API berbasis Node.js + Express untuk melakukan scraping data manga/komik dari situs Komikcast (Indonesia).
API ini menyediakan endpoint untuk home, search, detail komik, chapter, dan genre.
#
***> ⚠️ Disclaimer
Project ini dibuat untuk pembelajaran & riset.
Semua konten sepenuhnya milik Komikcast dan pemegang hak cipta masing-masing.***
#



---

🚀 Fitur Utama

📖 Daftar komik terbaru (Home)

🔍 Pencarian komik

📚 Detail komik & daftar chapter

🖼️ Ambil gambar chapter

🏷️ Filter komik berdasarkan genre

📃 Daftar semua genre

⚡ Response JSON cepat & ringan

🌐 CORS enabled (siap dipakai frontend)



---
🛠️ Tech Stack
Node.js
Express.js
Axios
Cheerio
Cors
---

📂 Struktur Project
```
├── routes/
│   ├── Home.js
│   ├── Search.js
│   ├── Komik.js
│   ├── Chapter.js
│   └── Genre.js
├── server.js
├── package.json
└── README.md
```

---

📦 Instalasi

1️⃣ Clone Repository
```bash
https://github.com/ZertCihuyy/Unofficial-Komikcast.git
cd unofficial-komikcast-api
```
2️⃣ Install Dependencies
```
npm install
```
3️⃣ Jalankan Server
```
node server.js
```

---

🌐 Base URL
```http://localhost:3000```

---

🔰 Root Endpoint

get /
```
{
  "message": "Welcome to Screpr Manga Indonesia",
  "developer": "ZertCihuy",
  "status": "🟢 online",
  "version": "1.0.0"
}
```

---

📌 Daftar Endpoint API

📘 Info API

GET /api

Menampilkan semua daftar endpoint yang tersedia.
---

🏠 Home (Komik Terbaru)

GET

/api/home/:page

Contoh

/api/home/1


---

🔍 Search Komik

GET

/api/search/:keyword

Contoh

/api/search/naruto


---

📚 Detail Komik

GET

/api/komik/:slug

Contoh

/api/komik/one-piece


---

🖼️ Baca Chapter

GET

/api/chapter/:slug

Contoh

/api/chapter/one-piece-chapter-1090


---

🏷️ Komik Berdasarkan Genre

GET

/api/genres/:slug/:page

Contoh

/api/genres/action/1


---

📃 List Semua Genre

GET

/api/genres/list


---

📡 Contoh Response
```
{
  "title": "One Piece",
  "author": "Eiichiro Oda",
  "status": "Ongoing",
  "genres": ["Action", "Adventure"],
  "chapters": [
    {
      "title": "Chapter 1090",
      "url": "/api/chapter/one-piece-chapter-1090"
    }
  ]
}
```

---

⚠️ Catatan Penting

API ini tidak menyimpan data

Semua data diambil real-time dari Komikcast

Struktur HTML Komikcast bisa berubah sewaktu-waktu

Gunakan cache di frontend/backend bila perlu



---

📜 Lisensi

MIT License

Bebas digunakan, dimodifikasi, dan dikembangkan
Asal tidak mengklaim kepemilikan konten


---

👨‍💻 Developer

ZertCihuy

🇮🇩 Indonesia

## Unofficial Manga Scraper API



---

⭐ Dukungan

Jika project ini membantu kamu:

⭐ Star repository

🔱 Fork & kembangkan

🐞 Laporkan bug via Issues



---

📜 Lisensi

MIT License

Bebas digunakan, dimodifikasi, dan dikembangkan
Asal tidak mengklaim kepemilikan konten


---

👨‍💻 Developer

ZertCihuy

🇮🇩 Indonesia

## Unofficial Manga Scraper API



---

⭐ Dukungan

Jika project ini membantu kamu:

⭐ Star repository

🔱 Fork & kembangkan

🐞 Laporkan bug via Issues
