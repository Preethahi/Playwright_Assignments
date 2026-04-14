import { APIRequestContext,expect, request } from "@playwright/test"

let token : any
let inst_url : any
let tokenType : any 
let Id : any

export async function generateToken(request:APIRequestContext) { 

    const response = await request.post("https://login.salesforce.com/services/oauth2/token",
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            form: {
                "client_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "client_secret": "xxxxxxxxxxxxxxxxxxxxxxxxx",
                "username": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "password": "xxxxxxxxxxxxxxxxxxxxxxx",
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
export async function createContact(request:APIRequestContext) {
    //Creation of lead using an API call (request fixture)

    const response = await request.post(`${inst_url}/services/data/v65.0/sobjects/Contact`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${tokenType} ${token}`
            },
            data: {
                "FirstName": "Preetha",
                "LastName": "Murugesan",
                "Phone": "9841523456",
                "Email": "example@gmail.com",
                "Title": "Ms",
                "Department": "Testing"
            }
        }
    )

    const responseBody = await response.json()
    console.log(responseBody); //{ id: '00QNS00000oJ0qj2AC', success: true, errors: [] }

    Id = responseBody.Id
}

export async function fetchContact(request:APIRequestContext):Promise<string> {
    //Retreive the lead using an API call (request fixture)  

    const response = await request.get(`${inst_url}/services/data/v65.0/sobjects/Contact/${Id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${tokenType} ${token}`
            }
        }
    )

    const responseBody = await response.json()
    console.log(responseBody); 
    console.log(responseBody.Id)    
    return responseBody.Id
}
async function updateContact(request:APIRequestContext):Promise<void> {


    const response = await request.patch(`${inst_url}/services/data/v65.0/sobjects/Contact/${Id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${tokenType} ${token}`
            },
            data: {
                "Phone": "9841523456",
                "Email": "example@gmail.com",
                "Title": "Mrs.",
                "Department": "Testing"
               
            }
        }
    )

    console.log(response.status());
    expect(response.status()).toBe(204)
    
    //Assert status text:
    console.log(response.statusText());
    expect(response.statusText()).toBe("No Content")
    
}

export async function deleteContact(request:APIRequestContext):Promise<void> {
    //Retreive the lead using an API call (request fixture)  

    const response = await request.delete(`${inst_url}/services/data/v65.0/sobjects/Contact/${Id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${tokenType} ${token}`
            }
        }
    )
        console.log(response.status());
        expect(response.status()).toBe(204)
        
        //Assert status text:
        console.log(response.statusText());
        expect(response.statusText()).toBe("No Content")
    
}

