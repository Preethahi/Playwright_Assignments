import { expect, test } from "@playwright/test";

test(`Button Interaction`, async ({ page }) => {

    await page.goto('https://leafground.com/button.xhtml');

    const isVisibile = await page.locator("//div/i[contains(@class,'pi-home')]").isVisible();
    console.log(isVisibile);
    const isDisabled = await page.getByRole('button', { name: 'Disabled' }).isDisabled();
    console.log(isDisabled);
    await expect(page.getByRole('button', { name: 'Disabled' })).toBeDisabled();
    await page.locator("//div[contains(@class,'col-12')]/div[1]/button").nth(0).click();
    //await page.getByRole('button', { name: 'Click' }).click();
    await page.waitForTimeout(1000);
    await page.title().then(title => {
        console.log(`Page title after click: ${title}`);
    });  
    const isVisibile1 = await page.locator('div').filter({ hasText: '/ Dashboard' }).first().isVisible();
    console.log(isVisibile1);

});
