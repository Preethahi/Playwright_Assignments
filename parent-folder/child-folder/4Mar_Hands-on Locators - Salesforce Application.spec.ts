import { expect, test } from "@playwright/test";


test.use({storageState:"Data/login_SF.json"})

test(`Create lead`, async ({ page }) => {

   await page.goto('https://orgfarm-a0bc339075-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome');
   await page.getByText('App Launcher', { exact: true }).click();
   await page.getByRole("button",{name:"View All Applications"}).click();
   await page.getByPlaceholder("Search apps or items...",{exact:true}).fill("Leads");
   await page.locator('mark').filter({ hasText: 'leads' }).last().click();
   await page.locator("div[title='New']").click();
   await page.locator('//input[@name="Phone"]').waitFor({ state: 'visible' });
   await page.locator('//input[@name="Phone"]').fill("9876543210");
   await page.getByRole('combobox', { name: /Salutation/i }).click();
   await page.locator("//lightning-base-combobox-item[@data-value='Ms.']").click();
   //await page.locator('button:has-text("Ms.")').click();
   await page.locator('//input[@name="lastName"]').fill("Leads_HiPreetha");
   await page.locator('//input[@name="Company"]').fill('Testleaf1');
   await page.getByRole('button', { name: 'Save', exact: true }).click();
   await page.locator("//span[contains(@class,'toastMessage')]").waitFor({ state: 'visible' });
   console.log(await page.locator("//span[contains(@class,'toastMessage')]").innerText());
   const message = await page.locator("//span[contains(@class,'toastMessage')]").innerText();
   expect(message).toContain('was created')
 
   
});

test.only(`Edit lead`, async ({ page }) => {

   await page.goto('https://orgfarm-a0bc339075-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome');
   await page.getByText('App Launcher', { exact: true }).click();
   await page.getByRole("button",{name:"View All Applications"}).click();
   await page.getByPlaceholder("Search apps or items...",{exact:true}).fill("Leads");
   await page.locator('mark').filter({ hasText: 'leads' }).last().click(); 
   await page.getByRole('button', { name: /Search/i }).click();
   await page.getByPlaceholder('Search...', { exact: false }).fill('Leads_HiPreetha');
   await page.keyboard.press('Enter');
   await page.waitForLoadState('domcontentloaded');
   await page.getByRole('link', { name: /Leads_HiPreetha/i }).first().click();
   await page.getByRole('heading', { name: /Leads_HiPreetha/i }).waitFor();
   await page.locator("lightning-button-menu[class='menu-button-item slds-dropdown_actions slds-dropdown-trigger slds-dropdown-trigger_click'] lightning-primitive-icon[variant='bare']").click()
   await page.locator("lightning-menu-item[data-target-selection-name='sfdc:StandardButton.Lead.Edit'] span").click()
   //await page.getByRole('button', { name: 'Edit' }).click();
   await page.getByRole('combobox', { name: /Salutation/i }).click();
   await page.locator("//lightning-base-combobox-item[@data-value='Mrs.']").click();
   await page.locator('//input[@name="lastName"]').fill('Leads_HiPreetha_Updated');
   await page.locator('//input[@name="Company"]').fill('Testleaf1_Updated');
   await page.getByRole('button', { name: 'Save', exact: true }).click();
   await page.locator("//span[contains(@class,'toastMessage')]").waitFor({ state: 'visible' });
   const message = await page.locator("//span[contains(@class,'toastMessage')]").innerText();
   console.log(message);
   expect(message).toContain('was saved');
   

});
