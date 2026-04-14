import { test, expect } from "@playwright/test";
import * as path from "path";


test(`File Upload with and without input tag with type attribute`,async ({page}) => {
    
    await page.goto(`https://the-internet.herokuapp.com/upload`);

    //with input tag
    const uploadFile =  page.locator(`(//input[@type="file"])[1]`)
    await uploadFile.setInputFiles(path.join(__dirname,`../../Data/TestLeaf_Logo.png`))
    const value = await page.getByRole(`button`, {name:"Choose File"}).inputValue();
    expect(value).toContain("TestLeaf_Logo.png")
    page.waitForTimeout(3000);
    
    //without input tag
    const filePromise = page.waitForEvent("filechooser")
    await page.locator(`[id="drag-drop-upload"]`).click();
    const fileUpload = await filePromise
    await fileUpload.setFiles(path.join(__dirname,`../../Data/Qeagle-Logo.png`))
    await page.waitForTimeout(3000)
    await expect(page.locator(`//span[contains(text(), 'Qeagle-Logo.png')]`)).toBeVisible();



});
test(`File Download`,async ({page}) => {
    
    await page.goto(`https://the-internet.herokuapp.com/download`);
    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator(`//a[text()='some-file.txt']`).click()
    ]);
    const path1 = await download.path();
    console.log(path1);
    const fileName = await download.suggestedFilename();
    console.log(fileName);
    await download.saveAs(path.join(__dirname,`../../Data/${fileName}`));
    await page.waitForTimeout(3000);                
        
});
