const express = require('express');
const cheerio = require('cheerio');
const { client, cleanStr } = require('../helpers');
const router = express.Router();

router.get('/chapter/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;
        const response = await client.get(`/chapter/${slug}/`);
        const $ = cheerio.load(response.data);

        const title = cleanStr($('.chapter_headpost h1').text());
        const images = [];

        $('.main-reading-area img').each((i, el) => {
            let src = $(el).attr('src');
            if (!src) src = $(el).attr('data-src');

            if (src) {
                const lowerSrc = src.toLowerCase();
                // Filter Iklan & Gambar Judi (GIF)
                const isAd = lowerSrc.includes('iklan') || 
                             lowerSrc.includes('banner') || 
                             lowerSrc.includes('histats') ||
                             lowerSrc.endsWith('.gif');

                if (!isAd) images.push(src);
            }
        });

        res.json({
            status: 200,
            data: { title, slug, total_images: images.length, images }
        });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;