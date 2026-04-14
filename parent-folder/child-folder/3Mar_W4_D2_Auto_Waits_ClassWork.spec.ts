import { expect, test } from "@playwright/test";

test(`Auto waits`, async ({ page }) => {

    await page.goto('https://leafground.com/waits.xhtml');
    await page.locator("button[id='j_idt87\\:j_idt89'] span[class='ui-button-text ui-c']").click();
    await page.getByText('I am here', { exact: true }).waitFor({ state: 'visible', timeout: 7000 });
    expect(await page.getByText('I am here', { exact: true })).toBeVisible();
    const message1 = await page.getByText('I am here', { exact: true }).innerText();
    console.log(message1);

    await page.locator("button[id='j_idt87\\:j_idt92'] span[class='ui-button-text ui-c']").click();
    const message2 = await page.locator("button[id='j_idt87\\:j_idt93'] span[class='ui-button-text ui-c']").innerText();
    console.log(message2); 
    await page.getByText('I am about to hide', { exact: true }).waitFor({ state: 'hidden', timeout: 7000 });
    const isCheck= await page.locator("button[id='j_idt87\\:j_idt93'] span[class='ui-button-text ui-c']").isHidden();
    console.log(isCheck);
    
    await page.locator("button[id='j_idt87\\:j_idt95'] span[class='ui-button-text ui-c']").click();
    await page.locator('.ui-growl-item').waitFor({ state: 'hidden' });
    //const toast = page.locator('.ui-growl-item').first()

    //if (await toast.isVisible()) {
     //  await toast.locator('.ui-growl-icon-close').click();
    //}

  await page.locator("#j_idt87\\:j_idt98").click();
  await page.getByText('Did you notice?', { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
  console.log(await page.getByText('Did you notice?', { exact: true }).innerText());
    

});    
