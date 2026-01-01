const express = require('express');
const cheerio = require('cheerio');
const { client, cleanStr, getSlug } = require('../helpers');
const router = express.Router();

router.get('/home/:page', async (req, res) => {
    try {
        const page = req.params.page;
        const response = await client.get(`/daftar-komik/page/${page}/?sortby=update`);
        const $ = cheerio.load(response.data);
        const result = [];

        $('.list-update_item').each((i, el) => {
            result.push({
                title: cleanStr($(el).find('.title').text()),
                chapter: cleanStr($(el).find('.chapter').first().text()),
                type: cleanStr($(el).find('.type').text()),
                thumb: $(el).find('img').attr('src'),
                slug: getSlug($(el).find('a').attr('href')),
                link: $(el).find('a').attr('href')
            });
        });

        res.json({ status: 200, page: page, data: result });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;