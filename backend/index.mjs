import express from 'express';
import { chromium } from 'playwright';

const app = express();
const port = 3001;

app.get('/api', async (req, res) => {
  const PAGE = 'https://www.joyeriasuarez.com/es/joyeria/novedad/orion/';
  const browser = await chromium.launch(
    { headless: true }
  );
  
  const page = await browser.newPage();
  
  await page.goto(PAGE);
  
  const products = await page.$$eval(
    '.product',
    (results) => (
      results.map((result) => {      
        const title = result.querySelector('.link')?.textContent;
        const image = result.querySelector('img')?.src;
        const price = result.querySelector('.price')?.textContent.replace(/\n/g, '');
        const link = result.querySelector('.link')?.href;
        return { title, image, price, link };
      })
    )
  )
  
  const lessThan50 = products.filter((product) => {
    const price = product.price.replace(/[^0-9]/g, '');
    return price < 500;
  });
  
  const cheapest = lessThan50.reduce((prev, current) => {
    return prev.price < current.price ? prev : current;
  });
  
  console.log(cheapest);
  await browser.close();

  res.send(cheapest);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});