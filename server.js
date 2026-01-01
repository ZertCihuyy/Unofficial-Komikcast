const express = require('express');
const cors = require('cors');

// Import Routes
const homeRoute = require('./routes/Home');
const searchRoute = require('./routes/Search');
const komikRoute = require('./routes/Komik');
const chapterRoute = require('./routes/Chapter');
const genreRoute = require('./routes/Genre');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Screpr Manga Indonesia",
        developer: "ZertCihuy",
        status: "🟢 online ",
        version: "1.0.0 "
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: "Daftar Endpoint API",
        developer: "ZertCihuy",
        endpoints: {
            home: {
                method: "GET",
                url: "/api/home/:page",
                desc: "Daftar komik terbaru."
            },
            search: {
                method: "GET",
                url: "/api/search/:keyword",
                desc: "Cari komik."
            },
            detail: {
                method: "GET",
                url: "/api/komik/:slug",
                desc: "Detail komik & list chapter."
            },
            chapter: {
                method: "GET",
                url: "/api/chapter/:slug",
                desc: "Baca komik (gambar)."
            },
            genre: {
                method: "GET",
                url: "/api/genres/:slug/:page",
                example: "/api/genres/action/1",
                desc: "Daftar komik berdasarkan genre."
            },
            genre_list: {
                method: "GET",
                url: "/api/genres/list",
                desc: "Melihat semua daftar genre yang tersedia."
            }
        }
    });
});

app.use('/api', homeRoute);
app.use('/api', searchRoute);
app.use('/api', komikRoute);
app.use('/api', chapterRoute);
app.use('/api', genreRoute);

app.listen(PORT, () => {
    console.log(`
    ============================================
            Server Manga API Berjalan!
    --------------------------------------------
    👤 Developer : ZertCihuy
    📡 URL       : http://localhost:${PORT}
    ============================================
    `);
});