import { expect, test } from "@playwright/test";
import { createCase, deleteCase, fetchCase, generateToken } from "./25Mar_Case_apiutility";

test.use({storageState:"Data/login_SF.json"})

let lcasenumber : any

test(`Playwright locators`, async ({ page,request }) => {

    await generateToken(request); 

    await createCase(request) 

    lcasenumber = await fetchCase(request) 

    await page.goto('https://orgfarm-a0bc339075-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome');

    await page.getByTitle("App Launcher",{exact:true}).click();

    await page.getByRole("button",{name:"View All Applications"}).click();

    await page.getByPlaceholder("Search apps or items...",{exact:true}).fill("Cases");
    await page.getByRole('link', { name: 'Cases' }).click();

    const searchBox = page.getByPlaceholder("Search this list...");

    await searchBox.fill(lcasenumber);

    await searchBox.press("Enter")

    
    //await page.locator("//span[text()='Status']/following::button").click();
    await page.getByText(lcasenumber, { exact: true }).click();
    await page.locator('button[name="Edit"]').click();
    await page.getByRole('combobox', { name: '*Status' }).click();
    await page.getByRole('option', { name: 'Working' }).click();
    await page.getByRole('combobox', { name: 'Priority' }).click();
    await page.getByRole('option', { name: 'Low' }).click();
    await page.getByRole('combobox', { name: 'Case Origin' }).click();
    await page.getByRole('option', { name: 'Phone' }).click();
    await page.getByRole('combobox', { name: 'SLA Violation' }).click();
    await page.getByRole('option', { name: 'No' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Working')).toBeVisible();
    await page.waitForTimeout(3000)

    await deleteCase(request) 
})





