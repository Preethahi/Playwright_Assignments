import { test , expect} from "@playwright/test";
import dotenv from "dotenv"

let filename =process.env.envFileName || "qa"
//Here if I dont set the environment using the command $env:envFileName it is set as undefined in that scenario by default "qa" environment should be taken


/*Notes:
process.env.envFileName ==> will pickup the environment that I will giva as an input from the terminal
In the terminal
$env:envFileName="prod" */

dotenv.config({path:`Data/${filename}.env`});

test(`Learn to handle ENV data parameterization`, async ({ page }) => {


       await page.goto(process.env.BaseUrl as string)
       await page.locator('//input[@id="username"]').fill(process.env.LF_Username as string);
       await page.locator('//input[@id="password"]').fill(process.env.LF_Password as string);

        await page.waitForTimeout(3000)
        await page.locator("input[type='submit']").click();
        await page.getByText('CRM/SFA').click();

        await page.locator("a[href*='/crmsfa/control/createLeadForm']").click();
        console.log(await page.title());
        await page.locator("//input[@id='createLeadForm_companyName']").fill(process.env.LF_companyname as string);
        await page.locator("//input[@id='createLeadForm_firstName']").fill(process.env.LF_firstname as string);
        await page.locator("//input[@id='createLeadForm_lastName']").fill(process.env.LF_lastname as string);
        await page.selectOption('#createLeadForm_dataSourceId', { label: "Direct Mail" });
        await page.selectOption(`#createLeadForm_marketingCampaignId`,{value:"DEMO_MKTG_CAMP"});
        
        const dropdown = page.locator(`//select[@id="createLeadForm_marketingCampaignId"]/option`);
        const dropdownCount = await dropdown.count();
        //expect(dropdownCount).toBeGreaterThan(10); 
        console.log(`No. of values in the dropdown is ${dropdownCount}`);
        for (let index = 0; index < dropdownCount; index++) { // index<13, -> 0<13, 1<13,...
           
        console.log(await dropdown.nth(index).innerText());
        }
        await page.selectOption('#createLeadForm_industryEnumId', { value: process.env.LF_industry as string });
        await page.selectOption('#createLeadForm_currencyUomId', { label: process.env.LF_currency as string });
        
        await page.evaluate(() => {
             window.scrollBy(0, 500); // scroll 500px down
        });
        await page.selectOption('#createLeadForm_generalCountryGeoId', { label: process.env.LF_country as string });
       
      
        //const states = await page.locator('#createLeadForm_generalStateProvinceGeoId option').allTextContents();
        //console.log(states);
        await page.selectOption(`//select[@id="createLeadForm_generalStateProvinceGeoId"]`,{value:process.env.LF_state as string});
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
