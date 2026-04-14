

function isOddOrEven(number){

    if (number % 2 === 0){
        console.log("Even")
    }
    else{
        console.log("Odd")
    }

}
isOddOrEven(1524)


//Another way of getting the input in the Runtime from the user and checking whether it is odd or even
function isOddOrEven1(number){
    return number % 2 === 0 ? "Even" : "Odd";
}
console.log(isOddOrEven1(1111));

const readline = require('readline');

function isOddOrEven2(number){
    return number % 2 === 0 ? "Even" : "Odd";
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a number: ", (input) => {
    const result = isOddOrEven2(Number(input));
    console.log(result);
    rl.close();
});



