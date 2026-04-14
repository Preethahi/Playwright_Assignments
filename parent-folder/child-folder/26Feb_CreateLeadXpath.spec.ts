import { chromium, test, expect } from "@playwright/test"

test('Create Lead test leaf application', async({page})=>
{
    await page.goto("http://leaftaps.com/opentaps/control/main")
    await page.locator("#username").fill("demosalesmanager");
    await page.locator("#password").fill("crmsfa");
    await page.locator("input[type='submit']").click();
    await page.getByText('CRM/SFA').click();

    //Create the Lead
    await page.locator("a[href*='/crmsfa/control/createLeadForm']").click();
    console.log(await page.title());
    await page.locator("//input[@id='createLeadForm_companyName']").fill("Amazon");
    await page.locator("//input[@id='createLeadForm_firstName']").fill("Preetha");
    await page.locator("//input[@id='createLeadForm_lastName']").fill("Murugesan");
    await page.locator('#createLeadForm_personalTitle').fill("Ms.");
    await page.locator('#createLeadForm_personalTitle').fill('Dr');
    await page.locator('#createLeadForm_annualRevenue').fill("50000");
    await page.locator("#createLeadForm_departmentName").fill("Testing");
    await page.locator("#createLeadForm_primaryPhoneNumber").fill("9876543210");

    //dropdown
    const dropdown = page.locator(`//select[@id="createLeadForm_dataSourceId"]/option`);
    const dropdownCount = await dropdown.count();
    expect(dropdownCount).toBeGreaterThan(10); 
    console.log(`No. of values in the dropdown is ${dropdownCount}`);
    for (let index = 0; index < dropdownCount; index++) { // index<13, -> 0<13, 1<13,...
   
    console.log(await dropdown.nth(index).innerText());
    }
    await page.selectOption(`//select[@id="createLeadForm_industryEnumId"]`,{value:"IND_HEALTH_CARE"});
    //default value of the Currency and country
    const currency = await page.locator('#createLeadForm_currencyUomId').inputValue();
    console.log(currency); 
    const country = await page.locator('#createLeadForm_generalCountryGeoId').inputValue();
    console.log(country); 
    
    await page.locator("//input[@class='smallSubmit']").click();
    await page.waitForTimeout(3000);
    await page.locator("//a[contains(text(),'Edit')]").click();
    await page.locator("//input[@id='updateLeadForm_firstNameLocal']").fill("Hiagreeva");
    await page.locator('#updateLeadForm_companyName').fill("Amazon Inc");
    await page.locator('#updateLeadForm_annualRevenue').fill("100000");
    await page.locator("#updateLeadForm_departmentName").fill("Automation Testing");
    await page.locator("#updateLeadForm_description").fill("This is a description for the lead");
    await page.selectOption(`//select[@id="updateLeadForm_ownershipEnumId"]`,{value:"OWN_PARTNERSHIP"});
    await page.getByRole('button', { name: 'Update' }).click();

});
