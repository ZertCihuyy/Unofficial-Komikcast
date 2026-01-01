const axios = require('axios');

const BASE_URL = "https://komikcast03.com";

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Referer': 'https://komikcast03.com/'
};

const cleanStr = (str) => str ? str.replace(/\n/g, '').trim() : "";

const getSlug = (url) => url ? url.split('/').filter(part => part !== "").pop() : "";

const client = axios.create({
    baseURL: BASE_URL,
    headers: HEADERS,
    timeout: 10000
});

module.exports = { BASE_URL, client, cleanStr, getSlug };