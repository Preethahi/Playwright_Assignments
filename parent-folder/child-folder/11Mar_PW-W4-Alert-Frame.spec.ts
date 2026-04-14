import { test,expect } from "@playwright/test";


test(`Test to handle alerts`, async ({ page }) => {


    await page.goto("https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm");

    page.on("dialog", async (alert) => {
      
        const message = alert.message(); 
        console.log(message);


        const alertType = alert.type(); // TO get the type of alert
        console.log(alertType);
        
        await alert.accept(); 

    })

    const frame = await page.frameLocator("#iframeResult");
    await frame.locator("//button[text()='Try it']").click();
    const text = await frame.locator("p#demo").innerText();
    console.log(text);
    expect(text).toBe("You pressed OK!");
    await page.waitForTimeout(3000)
   
    
});
