import { expect, test } from "@playwright/test";

test(`dropdown`, async ({ page }) => {

    await page.goto('https://leafground.com/select.xhtml');

    const isVisibile = await page.locator("//div/i[contains(@class,'pi-home')]").isVisible();
    console.log(isVisibile);
    
    await page.selectOption(`//select[@class="ui-selectonemenu"]`, {value: "Playwright"});
    const dropdown = page.locator(`//select[@class="ui-selectonemenu"]/option`);
    const dropdownCount = await dropdown.count();
    expect(dropdownCount).toBeGreaterThan(4); 
    console.log(`No. of values in the dropdown is ${dropdownCount}`);
    for (let index = 0; index < dropdownCount; index++) { 
   
    console.log(await dropdown.nth(index).innerText());
    }
    //await page.locator('#j_idt87\\:country').click();
    //await page.locator("//li[text()='India']").click();

const cities = {
    Brazil: ["Rio de Janeiro", "Salvador", "Sao Paulo"],
    Germany: ["Berlin", "Frankfurt", "Munich"],
    India: ["Bengaluru", "Chennai", "Delhi"],
    USA: ["Denver", "New York", "San Francisco"]
};
   

// Select Country
await page.locator('#j_idt87\\:country').click();
await page.locator("//li[normalize-space()='Germany']").click();

// wait for city dropdown to update (IMPORTANT for AJAX)
const cityTrigger = page.locator("#j_idt87\\:city .ui-selectonemenu-trigger");
await cityTrigger.waitFor();

// open city dropdown
await cityTrigger.click();

// city options panel
const cityPanel = page.locator("//ul[contains(@id,'city_items')]");
await cityPanel.waitFor({ state: 'visible', timeout: 5000 });

// get city options
const cityOptions = cityPanel.locator("li");
await page.locator("//li[text()='Berlin']").click();
const count = await cityOptions.count();

// expected data
const expectedCities = cities["Germany"];

// validation results
const results: { city: string; status: string }[] = [];

for (let i = 0; i < count; i++) {
    const city = (await cityOptions.nth(i).innerText()).trim();

    results.push({
        city,
        status: expectedCities.includes(city) ? "correct" : "incorrect"
    });
}

console.log("City Validation Result:");
console.log(results);

    await page.locator("//button[contains(@class,'ui-autocomplete-dropdown')]").click();
    await page.locator("//li[text()='Appium']").click();
    await page.locator("//button[contains(@class,'ui-autocomplete-dropdown')]").click();
    await page.locator("//li[text()='AWS']").click();
    await page.locator("//button[contains(@class,'ui-autocomplete-dropdown')]").click();
    await page.locator("//li[text()='Playwright']").click();
    await page.locator("#j_idt87\\:lang .ui-selectonemenu-trigger").click();
    //await page.locator("//li[text()='English']").click();
    const dropdown1 = page.locator(`//ul[@id='j_idt87:lang_items']/li`);
    const dropdownCount1 = await dropdown1.count();
    expect(dropdownCount1).toBeGreaterThan(3); 
    console.log(`No. of values in the dropdown is ${dropdownCount1}`);
    for (let index = 1; index < dropdownCount1; index++) { 
   
    console.log(await dropdown1.nth(index).innerText());
    }
    const index = Math.floor(Math.random() * dropdownCount1);

    const option = dropdown1.nth(index);
    const text = await option.innerText();

    await option.click();

    console.log(`Selected: ${text}`);
    
    const translations = {
    two: [
        "Two",       // English
        "இரண்டு",    // Tamil
        "ಎರಡು",      // Kannada
        "రెండు",      // Telugu
        "രണ്ട്",      // Malayalam
        "दो"         // Hindi
    ]
};

     await page.locator("#j_idt87\\:value .ui-selectonemenu-trigger").click();

const options = page.locator("//li");
await options.first().waitFor();

for (let i = 0; i < await options.count(); i++) {
    const text = (await options.nth(i).innerText()).trim();

    if (translations.two.includes(text)) {
        await options.nth(i).click();
        break;
    }
}
    await page.waitForTimeout(2000);
    await page.close();

})
