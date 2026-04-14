import { APIRequestContext, expect, test } from "@playwright/test";


test.use({storageState:"Data/login_SF.json"})

let  Id: any
let token : any
let inst_url : any
let tokenType : any 


test(`Salesforce Contact`, async ({ page,request }) => {

    await page.goto('https://orgfarm-a0bc339075-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome');
    await page.getByTitle("App Launcher",{exact:true}).click();
    await page.getByRole("button",{name:"View All Applications"}).click();
    await page.getByPlaceholder("Search apps or items...",{exact:true}).fill("Contacts");
    await page.getByRole('link', { name: 'Contacts' }).click();
    await page.locator("div[title='New']").click();
    await page.getByRole('combobox', { name: 'Salutation' }).click();
    await page.locator("//lightning-base-combobox-item[@data-value='Ms.']").click();
    await page.getByRole('textbox', { name: 'First Name' }).fill("Preetha_201");
    await page.getByPlaceholder('Last Name').fill("Murugesan_201")
    //await page.getByLabel('Phone', { exact: true }).fill("0447895565")
    await page.getByRole('textbox', { name: 'Mobile' }).fill("98457812551")
    await page.getByRole('textbox', { name: 'Title' }).fill("DR.")
    await page.getByRole('textbox', { name: 'Email' }).fill("agenda_201@gmail.com")
    await page.getByRole('textbox', { name: 'Department' }).fill("Banking")
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await page.locator("//span[contains(@class,'toastMessage')]").waitFor({ state: 'visible' });
    console.log(await page.locator("//span[contains(@class,'toastMessage')]").innerText());
    const message = await page.locator("//span[contains(@class,'toastMessage')]").innerText();
    expect(message).toContain('was created')
    const url = page.url(); // Get current URL
    Id = url.split("/Contact/")[1].split("/")[0];
    console.log("Contact ID:", Id);  
    await generateToken(request); 

    //Id = await fetchContact(request) 

    //Id = await updateContact(request)

    //Id = await deleteContact(request) 


    async function generateToken(request:APIRequestContext) { 
    
        const response = await request.post("https://login.salesforce.com/services/oauth2/token",
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                form: {
                    "client_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    "client_secret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    "username": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    "password": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    "grant_type": "password"
                }
                //Alt+Shift+f => format dcoument
            }
        )
    
        const responseBody = await response.json() // deserializarion
        console.log(responseBody);
    
        token = responseBody.access_token; 
        inst_url = responseBody.instance_url; 
        tokenType = responseBody.token_type; 
    
    }
    const getResponse = await request.get(`${inst_url}/services/data/v65.0/sobjects/Contact/${Id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  expect(getResponse.ok()).toBeTruthy();
  const contactData = await getResponse.json();
  console.log('GET Contact Response:', contactData);

   // --- Update the Contact via PATCH ---
  const updatePayload = {
    Phone: '044-42324565',
    Email: 'agenda_updated@gmail.com',
    Title: 'Dr.',
    Department: 'Sales',
  };

  const patchResponse = await request.patch(`${inst_url}/services/data/v65.0/sobjects/Contact/${Id}`,
    {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: updatePayload,
    }
  );
  expect(patchResponse.status()).toBe(204); // 204 No Content = successfully deleted
  console.log('Contact Updated Successfully');

  // --- Delete the Contact ---
  const deleteResponse = await request.delete(
    `${inst_url}/services/data/v65.0/sobjects/Contact/${Id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  expect(deleteResponse.status()).toBe(204); // 204 No Content = successfully deleted
  console.log('Contact Deleted Successfully');
});








