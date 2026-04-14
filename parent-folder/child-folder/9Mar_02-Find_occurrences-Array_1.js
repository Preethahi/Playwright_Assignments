function findOccurrences(str) {
    const count = {};

    for (const char of str) {
        if (char === " ") continue; // 🚫 skip space

        count[char] = (count[char] || 0) + 1;
    }

    return count;
}

const result = findOccurrences("hello world");

console.log("Char | Count");
console.log("-------------");

for (const key in result) {
    console.log(key + "    | " + result[key]);
}
