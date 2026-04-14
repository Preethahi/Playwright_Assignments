//Differentiate between var, let, and const - Observe redeclaration behavior - Predict scope-based errors

var genderType = "female"
function printGender(){
    let color = "brown"
    if (genderType.startsWith("female")){
        var age  = 30;
        let color = "pink";
        console.log("Inside if-block color:"  + color);
    }
    console.log("Outside if-block age:", age); 
}
printGender()
console.log("Global genderType:", genderType);  
genderType = "male";
console.log("Global genderType:", genderType);  
printGender();
