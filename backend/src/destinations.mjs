import { chromium } from 'playwright';

export const iberiaDestinations = async () => {
  console.log('searching');
  
  const iberiaPage = 'https://www.iberia.com/';
  let destinations = [];

  const browser = await chromium.launch({
    headless: false, // Run in headful mode
    args: ['--disable-http2']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  });

  const page = await context.newPage();
  
  try {
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('/destination/')) {
        const responseBody = await response.text();
        destinations = responseBody;
        console.log('Response from /destination/:', responseBody);
      }
    });

    await page.waitForTimeout(3000); // Introduce a delay
    await page.goto(iberiaPage);
  } catch (error) {
    console.error('Error navigating to page:', error);
  } finally {
    await browser.close();
    console.log('finish');
    return destinations;
  }
};