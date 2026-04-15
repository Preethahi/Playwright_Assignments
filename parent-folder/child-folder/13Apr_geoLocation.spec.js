import { test } from "@playwright/test";

 test.use({
        geolocation:{
            latitude:40.6952648,
            longitude:-74.6390576
        },
        permissions:[`geolocation`,`notifications`]
    })

test(`Learning Geolocation`,async ({page}) => {  

    await page.goto(`https://www.google.com/maps`);
    await page.getByRole('button', { name: 'Your location' }).click();
    await page.waitForTimeout(5000)

})
