//this will count even the spaces and special characters as well
function findOccurrencests1(str:string): {[key: string]: number}{
    const count: { [key: string]: number} = {};
    for (const char of str) {
        if (count[char]) {
            count[char]++;
        } else {
            count[char] = 1;
        }
    }
    return count;

}
console.log(findOccurrencests1("hello world"));

//This will count only the characters and ignore the spaces and special characters
function countCharacters2 (str: string): { [key: string]: number } {
    let count: { [key: string]: number } = {};

    for (let char of str) {
        count[char] = (count[char] || 0) + 1;
    }

    return count;
}

const result2 = countCharacters2("typescript");

for (const key in result2) {
    console.log(key + " : " + result2[key]);
}
