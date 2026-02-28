const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');
const crypto = require('crypto');

/**
 * 🎓 WeChat Post Crawler (Authenticated Version)
 * Optimized for the 'appmsgpublish' endpoint.
 */

// 配置区
const CONFIG = {
    BIZ: process.env.WECHAT_BIZ || 'Mzg4OTUxODMyOQ==',
    TOKEN: process.env.WECHAT_TOKEN,
    COOKIE: process.env.WECHAT_COOKIE,
    OUTPUT_JSON: path.join(process.cwd(), 'public/content/wechat-posts.json'),
    IMAGES_DIR: path.join(process.cwd(), 'public/images/covers'),
};

async function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

async function processImage(url, id) {
    if (!url) return null;
    const fileName = `${id}.webp`;
    const filePath = path.join(CONFIG.IMAGES_DIR, fileName);
    const publicPath = `/images/covers/${fileName}`;

    if (fs.existsSync(filePath)) return publicPath;

    try {
        console.log(`Downloading: ${url.substring(0, 40)}...`);
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer',
            timeout: 10000,
            headers: { 'Referer': 'https://mp.weixin.qq.com/' }
        });

        await sharp(response.data)
            .resize(800)
            .webp({ quality: 80 })
            .toFile(filePath);

        return publicPath;
    } catch (e) {
        console.error(`Image failed: ${id}`, e.message);
        return null;
    }
}

async function fetchFromBackend() {
    if (!CONFIG.TOKEN || !CONFIG.COOKIE) {
        console.warn('⚠️ Credentials missing.');
        return null;
    }

    const url = `https://mp.weixin.qq.com/cgi-bin/appmsgpublish`;
    const params = {
        sub: 'list',
        begin: 0,
        count: 10,
        fakeid: CONFIG.BIZ,
        type: '101_1',
        free_publish_type: '1',
        sub_action: 'list_ex',
        token: CONFIG.TOKEN,
        lang: 'zh_CN',
        f: 'json',
        ajax: '1'
    };

    try {
        const response = await axios.get(url, {
            params,
            headers: {
                'Cookie': CONFIG.COOKIE,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://mp.weixin.qq.com/'
            }
        });

        if (response.data.base_resp?.ret !== 0) {
            console.error('API Error:', response.data.base_resp?.err_msg);
            return null;
        }

        // 🎓 修复点：微信嵌套 JSON 字符串解析
        let publishPage = response.data.publish_page;
        if (typeof publishPage === 'string') {
            publishPage = JSON.parse(publishPage);
        }

        const list = publishPage.publish_list || [];
        const posts = [];

        for (const entry of list) {
            let info = entry.publish_info;
            if (typeof info === 'string') {
                info = JSON.parse(info);
            }

            if (info.appmsgex && info.appmsgex.length > 0) {
                const article = info.appmsgex[0];
                posts.push({
                    id: crypto.createHash('md5').update(article.link).digest('hex'),
                    title: article.title,
                    url: article.link,
                    coverSrc: article.cover,
                    publishDate: new Date(article.create_time * 1000).toISOString().split('T')[0],
                    excerpt: article.digest || '...'
                });
            }
        }
        return posts;
    } catch (e) {
        console.error('Fetch failed:', e.message);
        return null;
    }
}

async function main() {
    console.log('--- 🚀 Syncing WeChat Posts ---');
    await ensureDir(CONFIG.IMAGES_DIR);

    const rawPosts = await fetchFromBackend();

    if (!rawPosts || rawPosts.length === 0) {
        console.log('No new posts or fetch failed. Using cache.');
        return;
    }

    const finalPosts = [];
    for (const p of rawPosts) {
        const cover = await processImage(p.coverSrc, p.id);
        finalPosts.push({
            id: p.id,
            title: p.title,
            url: p.url,
            cover: cover || '/images/project/placeholder.webp',
            publishDate: p.publishDate
        });
    }

    fs.writeFileSync(CONFIG.OUTPUT_JSON, JSON.stringify({ posts: finalPosts }, null, 4));
    console.log(`--- ✅ Successfully updated ${finalPosts.length} posts ---`);
}

main();
