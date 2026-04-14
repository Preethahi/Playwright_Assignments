import { expect, test } from "@playwright/test";


test.use({storageState:"Data/login_SF.json"})

test(`Login to Home page`, async ({ page }) => {

   await page.goto('https://xxxxxxxxxxxxxxxxx-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome');
   await page.getByTitle("App Launcher",{exact:true}).click();
   await page.getByRole("button",{name:"View All Applications"}).click();
   await page.getByPlaceholder("Search apps or items...",{exact:true}).fill("Accounts");
   await page.waitForTimeout(3000)
   await page.getByRole("link",{name:"Accounts"}).click();
   await page.locator("div[title='New']").click();
   await page.getByLabel('*Account Name', { exact: true }).waitFor({ state: 'visible' });
   await page.getByLabel('*Account Name', { exact: true }).fill("MPreetha_account_104");
   await page.getByRole('combobox', { name: 'Rating' }).click();
   await page.locator("//lightning-base-combobox-item[@data-value='Warm']").click();
   await page.mouse.wheel(0, 250);
   await page.getByRole('combobox', { name: 'Type' }).click();
   await page.locator("//span[@title='Prospect']").click();
   await page.getByRole('combobox', { name: 'Industry' }).click();
   await page.locator("//span[@title='Banking']").click();
   await page.getByRole('combobox', { name: 'Ownership' }).click();
   await page.locator("//span[@title='Public']").click();
   await page.getByRole('button', { name: 'Save', exact: true }).click();
   await page.locator("//span[contains(@class,'toastMessage')]").waitFor({ state: 'visible' });
   console.log(await page.locator("//span[contains(@class,'toastMessage')]").innerText());
   const message = await page.locator("//span[contains(@class,'toastMessage')]").innerText();
   expect(message).toContain('was created')
   await page.locator('input[type="file"]').first().setInputFiles('Data/Qeagle-Logo.png');
   await page.waitForTimeout(1000);
   await expect(page.locator('div.fileName')).toHaveText('Qeagle-Logo.png');
   await page.waitForTimeout(3000);
   
});
   
   
   
