const express = require('express');
const cheerio = require('cheerio');
const { client, cleanStr, getSlug } = require('../helpers');
const router = express.Router();

// Endpoint: /api/genres/action/1
router.get('/genres/:slug/:page', async (req, res) => {
    try {
        const slug = req.params.slug; // misal: "action"
        const page = req.params.page || 1;
        
        // URL Pattern: https://komikcast03.com/genres/action/page/1/
        const url = page == 1 
            ? `/genres/${slug}/` 
            : `/genres/${slug}/page/${page}/`;

        const response = await client.get(url);
        const $ = cheerio.load(response.data);
        const result = [];

        // Mengambil Title Genre dari <h1>
        const genreTitle = cleanStr($('.releases h1 span').text()) || slug;

        // Parsing List Komik berdasarkan HTML yang kamu kirim
        $('.list-update_item').each((i, el) => {
            result.push({
                title: cleanStr($(el).find('.title').text()),
                chapter: cleanStr($(el).find('.chapter').text()),
                type: cleanStr($(el).find('.type').text()),
                rating: cleanStr($(el).find('.numscore').text()),
                thumb: $(el).find('img').attr('src'),
                slug: getSlug($(el).find('a').attr('href')),
                link: $(el).find('a').attr('href')
            });
        });

        // Cek halaman selanjutnya
        const hasNextPage = $('.pagination .next').length > 0;

        res.json({ 
            status: 200, 
            genre: genreTitle,
            page: parseInt(page),
            has_next: hasNextPage,
            data: result 
        });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Endpoint untuk list semua genre yang tersedia
router.get('/genres/list', async (req, res) => {
    try {
        // Kita ambil list genre dari halaman action saja sebagai sampel
        const response = await client.get(`/genres/action/`);
        const $ = cheerio.load(response.data);
        const genres = [];

        $('.genresx li a').each((i, el) => {
            genres.push({
                title: $(el).text(),
                slug: getSlug($(el).attr('href')),
                link: $(el).attr('href')
            });
        });

        res.json({ status: 200, data: genres });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;