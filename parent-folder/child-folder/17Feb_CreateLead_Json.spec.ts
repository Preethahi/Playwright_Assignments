import { test ,expect} from "@playwright/test";
import  credentials  from "../../Data/lead.json";


test.describe.serial("Test to execute the scripts in serials mode",async () => {
    
for( let data of credentials){


test(`Learn to handle JSON data parameterization ${data.TCaseId}`, async ({ page }) => {


    await page.goto('http://leaftaps.com/opentaps/control/main')

        await page.locator('//input[@id="username"]').fill(data.Username);
        await page.locator('//input[@id="password"]').fill(data.Password);
        await page.locator("input[type='submit']").click();
        await page.getByText('CRM/SFA').click();

        await page.locator("a[href*='/crmsfa/control/createLeadForm']").click();
        console.log(await page.title());
        await page.locator("//input[@id='createLeadForm_companyName']").fill(data.CompanyName);
        await page.locator("//input[@id='createLeadForm_firstName']").fill(data.FirstName);
        await page.locator("//input[@id='createLeadForm_lastName']").fill(data.LastName);
        await page.selectOption('#createLeadForm_dataSourceId', { label: "Direct Mail" });
        await page.selectOption(`#createLeadForm_marketingCampaignId`,{value:"DEMO_MKTG_CAMP"});
        const dropdown = page.locator(`//select[@id="createLeadForm_marketingCampaignId"]/option`);
        const dropdownCount = await dropdown.count();
        //expect(dropdownCount).toBeGreaterThan(10); 
        console.log(`No. of values in the dropdown is ${dropdownCount}`);
        for (let index = 0; index < dropdownCount; index++) { // index<13, -> 0<13, 1<13,...
           
        console.log(await dropdown.nth(index).innerText());
        }
        await page.selectOption(`//select[@id="createLeadForm_industryEnumId"]`,{index:6});
        await page.selectOption(`//select[@id="createLeadForm_currencyUomId"]`,{value:"INR"});
        await page.evaluate(() => {
             window.scrollBy(0, 500); // scroll 500px down
        });
        await page.selectOption(`//select[@id="createLeadForm_generalCountryGeoId"]`,{value:"IND"});
        await page.selectOption(`//select[@id="createLeadForm_generalStateProvinceGeoId"]`,{value:"IN-TN"});
        const dropdown1 = page.locator(`//select[@id="createLeadForm_generalStateProvinceGeoId"]/option`);
        const dropdownCount1 = await dropdown1.count();
        expect(dropdownCount1).toBeGreaterThan(10); 
        console.log(`No. of values in the dropdown is ${dropdownCount1}`);
        for (let index = 0; index < dropdownCount1; index++) { // index<13, -> 0<13, 1<13,...
           
        console.log(await dropdown1.nth(index).innerText());
        }  
        await page.locator("//input[@class='smallSubmit']").click();
        await page.waitForTimeout(3000);

})
}
})
