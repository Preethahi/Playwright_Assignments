import { test,expect } from "@playwright/test";
import {parse} from "csv-parse/sync"
import fs from "fs"

test.describe.serial("Test to execute the scripts in serials mode",async () => {

   let records : any[] = parse(fs.readFileSync("Data/lead.csv"),{columns:true,skip_empty_lines:true})
    
for( let data of records){

test(`Learn to handle CSV data parameterization ${data.tcid}`, async ({ page }) => {


    await page.goto('http://leaftaps.com/opentaps/control/main')

        await page.locator('//input[@id="username"]').fill(data.username);
        await page.locator('//input[@id="password"]').fill(data.password);
        await page.locator("input[type='submit']").click();
        await page.getByText('CRM/SFA').click();

        await page.locator("a[href*='/crmsfa/control/createLeadForm']").click();
        console.log(await page.title());
        await page.locator("//input[@id='createLeadForm_companyName']").fill(data.company);
        await page.locator("//input[@id='createLeadForm_firstName']").fill(data.firstname);
        await page.locator("//input[@id='createLeadForm_lastName']").fill(data.lastname);
        await page.selectOption('#createLeadForm_dataSourceId', { label: "Direct Mail" });
        await page.selectOption(`#createLeadForm_marketingCampaignId`,{value:"DEMO_MKTG_CAMP"});
        
        const dropdown = page.locator(`//select[@id="createLeadForm_marketingCampaignId"]/option`);
        const dropdownCount = await dropdown.count();
        //expect(dropdownCount).toBeGreaterThan(10); 
        console.log(`No. of values in the dropdown is ${dropdownCount}`);
        for (let index = 0; index < dropdownCount; index++) { // index<13, -> 0<13, 1<13,...
           
        console.log(await dropdown.nth(index).innerText());
        }
        await page.selectOption('#createLeadForm_industryEnumId', { value: data.industry });
        await page.selectOption('#createLeadForm_currencyUomId', { label: data.currency });
        
        await page.evaluate(() => {
             window.scrollBy(0, 500); // scroll 500px down
        });
        await page.selectOption('#createLeadForm_generalCountryGeoId', { label: data.country });
       
      
        //const states = await page.locator('#createLeadForm_generalStateProvinceGeoId option').allTextContents();
        //console.log(states);
        await page.selectOption(`//select[@id="createLeadForm_generalStateProvinceGeoId"]`,{value:data.state});
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
