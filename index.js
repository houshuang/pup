var fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const uuid = require('cuid');
var now = require('performance-now');

(async () => {
  const id = uuid();
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  var t0 = now();
  await page.goto('http://icchilisrv3.epfl.ch/debug?login=' + id, {
    waitUntil: 'networkidle'
  });
  await page.waitFor('.form-group');
  await page.click('.form-group:nth-child(1) input');
  await page.click('.form-group:nth-child(2) input');
  await page.click('.form-group:nth-child(3) input');
  await page.click('.form-group:nth-child(4) input');
  await page.click('.form-group:nth-child(5) input');
  var t1 = now();
  console.log(t1 - t0);
  fetch('http://icchilisrv3.epfl.ch:5400/logs', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ host: id, msg: '' + (t1 - t0) })
  }).catch(function(res) {
    console.log(res);
  });

  browser.close();
})();
