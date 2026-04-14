import { expect, test } from "@playwright/test";

test(`Login Salesforce`, async ({ page }) => {

    await page.goto('https://login.salesforce.com/?locale=in');

    const isVisibile = await page.getByAltText("Salesforce").isVisible();
    console.log(isVisibile);
    
    await page.getByRole(`textbox`, { name: "Username" }).fill(`murugesanpreetha.34038b5fdd3a@agentforce.com`)
    await page.getByRole(`textbox`, { name: "Password" }).fill(`HiPreetha@143`)
    await page.getByRole(`button`, { name: "Log In" }).click();

    await page.waitForTimeout(1000);

    await page.close();

})
