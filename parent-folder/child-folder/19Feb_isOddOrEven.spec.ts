import { test } from "@playwright/test";

function isOddOrEven(number:number){
  return number % 2 === 0 ? "Even" : "Odd";
}

test('Check odd or even', async () => {
  const number = Number(process.env.NUM);
  
  //Take input from the user in the Runtime
  console.log("Input:", number);
  console.log("Result:", isOddOrEven(number));
});

//to run the command: $env:NUM=25; npx playwright test isOddOrEven.spec.ts
