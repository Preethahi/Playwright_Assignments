function launchBrowser(browserName){ // browserName ="firefox"

    if (browserName==="chrome") {

        console.log("Launching Chrome browser");    

    } else {
        console.log("Launching " + browserName + " browser");
    }
}

launchBrowser("Firefox")
launchBrowser("chrome")

function runTests(testType){ 
   switch(testType){
    case  "regression":{
        console.log("Running regression tests");
        break;
    }
    case "sanity": {
        console.log("Running sanity tests");
        break;
    }
    default: {
        console.log("Running smoke tests");
    }
    
   }
}
runTests("sanity")
runTests("integration"); 
