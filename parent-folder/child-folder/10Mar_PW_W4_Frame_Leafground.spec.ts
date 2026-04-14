import { test,expect } from "@playwright/test";


test(`Test to handle Frames`, async ({ page }) => {

    await page.goto("https://leafground.com/frame.xhtml");

    const frames = page.frames();
    console.log("Frame count:", frames.length);

    //await page.frameLocator("#frame1").locator("button").click();
    await page.frameLocator('[src*="default.xhtml"]').getByRole('button').click();
    const message1 = await page.frameLocator('[src*="default.xhtml"]').getByRole('button').innerText();
    console.log(message1);

    await page.frameLocator('[src*="nested.xhtml"]').getByRole('button').click();
    const message2 = await page.frameLocator('[src*="nested.xhtml"]').getByRole('button').innerText();
    console.log(message2);  

    await page.frameLocator('[src*="page.xhtml"]').frameLocator('[src*="framebutton.xhtml"]').getByRole('button').click();
    const message3 = await page.frameLocator('[src*="page.xhtml"]').frameLocator('[src*="framebutton.xhtml"]').getByRole('button').innerText();
    console.log(message3);  


});
