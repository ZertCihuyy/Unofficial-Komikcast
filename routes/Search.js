const express = require('express');
const cheerio = require('cheerio');
const { client, cleanStr, getSlug } = require('../helpers');
const router = express.Router();

router.get('/search/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const response = await client.get(`/?s=${keyword}`);
        const $ = cheerio.load(response.data);
        const result = [];

        $('.list-update_item').each((i, el) => {
            result.push({
                title: cleanStr($(el).find('.title').text()),
                type: cleanStr($(el).find('.type').text()),
                thumb: $(el).find('img').attr('src'),
                slug: getSlug($(el).find('a').attr('href'))
            });
        });

        res.json({ status: 200, keyword: keyword, data: result });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;