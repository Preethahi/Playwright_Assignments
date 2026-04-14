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
    await page.locator("//a[text()='Find Leads']").click();
    await page.locator("//input[@id='ext-gen248']").fill('Preetha');
    await page.locator("//button[contains(text(),'Leads')]").click();
    await page.locator("(//span[contains(text(),'Lead List')]/following::a[text() = 'Preetha'])[1]").click();
    await page.locator("//a[contains(text(),'Edit')]").click();
    await page.locator("//input[@id='updateLeadForm_firstNameLocal']").fill("Hiagreeva");
    await page.locator('#updateLeadForm_companyName').fill("Amazon Inc");
    await page.locator('#updateLeadForm_annualRevenue').fill("100000");
    await page.locator("#updateLeadForm_departmentName").fill("Automation Testing");
    await page.locator("#updateLeadForm_description").fill("This is a description for the lead");
    await page.selectOption(`//select[@id="updateLeadForm_ownershipEnumId"]`,{value:"OWN_PARTNERSHIP"});
    await page.getByRole('button', { name: 'Update' }).click();
    
});
