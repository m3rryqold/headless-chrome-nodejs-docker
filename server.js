
// // server.js
// const express = require('express');
// const puppeteer = require('puppeteer');

// const app = express();

// // /?url=https://google.com
// app.get('/', (req, res) => {
//     const {url} = req.query;
//     if (!url || url.length === 0) {
//         return res.json({error: 'url query parameter is required'});
//     }

//     const imageData = await Screenshot(url);
//     // const imageData = Screenshot(url);

//     res.set('Content-Type', 'image/jpeg');
//     res.set('Content-Length', imageData.length);
//     res.send(imageData);
// });

// app.listen(process.env.PORT || 3000);

// async function Screenshot(url) {
//    const browser = await puppeteer.launch({
//        headless: true,
//        executablePath: '/usr/bin/chromium-browser',
//        args: [
//        "--no-sandbox",
//        "--disable-gpu",
//        ]
//    });

//     const page = await browser.newPage();
//     await page.goto(url, {
//       timeout: 0,
//       waitUntil: 'networkidle0',
//     });
//     const screenData = await page.screenshot({encoding: 'binary', type: 'jpeg', quality: 30});

//     await page.close();
//     await browser.close();

//     // Binary data of an image
//     return screenData;
// }

const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/screenshot', async (req, res) => {
    console.log('Taking screenshot');
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/google-chrome',
        args: [
            "--no-sandbox",
            "--disable-gpu",
        ]
    });
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    const imageBuffer = await page.screenshot();
    await browser.close();

    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
    console.log('Screenshot taken');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});