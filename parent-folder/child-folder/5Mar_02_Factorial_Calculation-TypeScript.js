function factorial(n) {
    if (n < 0) {
        console.log("Factorial is not defined for negative numbers.");
        return 0; // or throw error
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
console.log(factorial(5));
