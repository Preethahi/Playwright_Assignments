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
    //CSS is locator that starts with . or # or tagname and it is followed by the attribute
    await page.locator("input.inputBox[name='companyName']").fill("Amazon");
    //Using class + attribute
    await page.locator('input.inputBox[name="firstName"]').fill('Preetha');
    //Using tag + ID + attribute (optional)
    await page.locator('input#createLeadForm_lastName.inputBox[name="lastName"]').fill('Murugesan');
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
    await page.selectOption(`select[name="industryEnumId"]`,{value:"IND_HEALTH_CARE"});
    //default value of the Currency and country
    const currency = await page.locator('#createLeadForm_currencyUomId').inputValue();
    console.log(currency); 
    const country = await page.locator('#createLeadForm_generalCountryGeoId').inputValue();
    console.log(country); 
    
    await page.locator(".smallSubmit").click();
    //page.locator('input[type="submit"]')
    await page.waitForTimeout(3000);
     await page.close();

});
