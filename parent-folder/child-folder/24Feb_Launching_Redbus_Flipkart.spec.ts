import { test,chromium, webkit } from "@playwright/test"


test(`Launching RedBus using Edge browser`, async () => {
    
    const browser = await chromium.launch({channel:"msedge",headless:false});
    const context = await browser.newContext();
    const page =  await context.newPage();
    await page.goto('https://www.redbus.in');
    console.log(await page.title());
    console.log(await page.url());

});

test(`Launching Flipkart using Webkit browser`, async () => {

    const browser = await webkit.launch({headless:false});
    const context = await browser.newContext();
    const page =  await context.newPage();
    await page.goto('https://www.flipkart.com');
    console.log(await page.title());
    console.log(await page.url())   ;

});

test.only('Combine in the same test', async () => {
  // Chromium (Edge)
  const edgeBrowser = await chromium.launch({
    channel: 'msedge',
    headless: false
  });
  const edgePage = await edgeBrowser.newPage();
  await edgePage.goto('https://www.redbus.in');

  // WebKit (Safari-like)
  const webkitBrowser = await webkit.launch({ headless: false });
  const webkitPage = await webkitBrowser.newPage();
  await webkitPage.goto('https://www.flipkart.com');

  await edgePage.waitForTimeout(3000);
  await webkitPage.waitForTimeout(3000);

  await edgeBrowser.close();
  await webkitBrowser.close();
});
