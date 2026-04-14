import { APIRequestContext,expect, request } from "@playwright/test"

let token : any
let inst_url : any
let tokenType : any 
let id : any

export async function generateToken(request:APIRequestContext) { //This local variable request is userdefined is holding the request fixture value

    const response = await request.post("https://login.salesforce.com/services/oauth2/token",
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            form: {
                "client_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "client_secret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "username": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "password": "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "grant_type": "password"
            }
            //Alt+Shift+f => format dcoument
        }
    )

    const responseBody = await response.json() // deserializarion
    console.log(responseBody);

    token = responseBody.access_token; //00DNS000001rTAX!AQEAQMlxRc13Xpi9xe2fnfuvv4Oxq4ehqf8xGF1uvUNoTL2f_tLaP0CdS9RgWT8TS7MO125CU3OxoGwBODs5rDCDXmONjmHi
    inst_url = responseBody.instance_url; // https://testleaf22-dev-ed.develop.my.salesforce.com
    tokenType = responseBody.token_type; // Bearer

}

export async function createCase(request:APIRequestContext) {
    //Creation of lead using an API call (request fixture)

    const response = await request.post(`${inst_url}/services/data/v65.0/sobjects/Case`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${tokenType} ${token}`
            },
            data: {
                "status": "Escalated",
                "Origin": "Email"
            }
        }
    )

    const responseBody = await response.json()
    console.log(responseBody); //{ id: '00QNS00000oJ0qj2AC', success: true, errors: [] }

    id = responseBody.id

}



export async function fetchCase(request:APIRequestContext):Promise<string> {
    //Retreive the lead using an API call (request fixture)  

    const response = await request.get(`${inst_url}/services/data/v65.0/sobjects/Case/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${tokenType} ${token}`
            }
        }
    )

    const responseBody = await response.json()
    console.log(responseBody); //{ id: '00QNS00000oJ0qj2AC', success: true, errors: [] }
    console.log(responseBody.CaseNumber)    //  CaseNumber: '00001000'
    return responseBody.CaseNumber
}

export async function deleteCase(request:APIRequestContext):Promise<void> {
    //Retreive the lead using an API call (request fixture)  

    const response = await request.delete(`${inst_url}/services/data/v65.0/sobjects/Case/${id}`,
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

