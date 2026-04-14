import { expect, test } from "@playwright/test";

test(`Login Salesforce`, async ({ page }) => {

    await page.goto('https://login.salesforce.com/?locale=in');

    const isVisibile = await page.getByAltText("Salesforce").isVisible();
    console.log(isVisibile);
    
    await page.getByRole(`textbox`, { name: "Username" }).fill(`xxxxxxxxxxxxxxxxxxxxx`)
    await page.getByRole(`textbox`, { name: "Password" }).fill(`xxxxxxxxxxxxxxxxxxxxx`)
    await page.getByRole(`button`, { name: "Log In" }).click();

    await page.waitForTimeout(1000);

    await page.close();

})
