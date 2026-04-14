import { chromium, test, expect } from "@playwright/test"

test('Edit Leadtest leaf application', async({page})=>
{
    await page.goto("http://leaftaps.com/opentaps/control/main")
    await page.locator("#username").fill("demosalesmanager");
    await page.locator("#password").fill("crmsfa");
    await page.locator("input[type='submit']").click();
    await page.getByText('CRM/SFA').click();

    //Edit the Lead
    await page.locator("a[href*='/crmsfa/control/createLeadForm']").click();
    await page.locator("a[href*='/crmsfa/control/findLeads']").click();
    //await page.locator("input.x-form-text.x-form-field[name='firstName']").fill('Preetha'); - cannot convert this to CSS as there are 
    // multiple first name fields in the page
    await page.locator('input[name="firstName"]:visible').fill('Preetha');
    //await page.locator('button.x-btn-text').click(); - this cannot come as pure CSS as it has text in it 
    // and CSS does not support text based locators 
    await page.getByRole('button', { name: 'Find Leads' }).click();
    //await page.locator("(//span[contains(text(),'Lead List')]/following::a[text() = 'Preetha'])[1]").click();
    // wait until at least one result link is visible
    await page.locator('a:has-text("Preetha")').first().waitFor({ state: 'visible' });
    // click the lead
    await page.locator('a:has-text("Preetha")').first().click();
    await page.locator("a:has-text('Edit')").click();
    //the below locators cannot be pure CSS as they have dynamic IDs and there are multiple fields with the same name
    await page.locator("input[id='updateLeadForm_firstNameLocal']").fill("Hiagreeva");
    await page.locator('#updateLeadForm_companyName').fill("Amazon Inc");
    await page.locator('#updateLeadForm_annualRevenue').fill("100000");
    await page.locator("#updateLeadForm_departmentName").fill("Automation Testing");
    await page.locator("#updateLeadForm_description").fill("This is a description for the lead");
    await page.selectOption(`//select[@id="updateLeadForm_ownershipEnumId"]`,{value:"OWN_PARTNERSHIP"});
    await page.getByRole('button', { name: 'Update' }).click();
    
     await page.close();
});
