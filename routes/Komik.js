const express = require('express');
const cheerio = require('cheerio');
const { client, cleanStr, getSlug } = require('../helpers');
const router = express.Router();

router.get('/komik/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;
        const response = await client.get(`/komik/${slug}/`);
        const $ = cheerio.load(response.data);

        const info = {
            title: cleanStr($('.komik_info-content-body-title').text()),
            native_title: cleanStr($('.komik_info-content-native').text()),
            sinopsis: cleanStr($('.komik_info-description-sinopsis').text()),
            thumb: $('.komik_info-content-thumbnail img').attr('src'),
            rating: $('.data-rating').attr('data-ratingkomik') || "-",
            genres: []
        };

        $('.komik_info-content-genre a').each((i, el) => {
            info.genres.push($(el).text());
        });

        const chapters = [];
        $('#chapter-wrapper li.komik_info-chapters-item').each((i, el) => {
            const linkTag = $(el).find('a.chapter-link-item');
            const timeTag = $(el).find('.chapter-link-time');
            
            if (linkTag.length > 0) {
                chapters.push({
                    title: cleanStr(linkTag.text()),
                    date: cleanStr(timeTag.text()),
                    slug: getSlug(linkTag.attr('href')),
                    link: linkTag.attr('href')
                });
            }
        });

        res.json({
            status: 200,
            data: { ...info, total_chapters: chapters.length, chapter_list: chapters }
        });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;