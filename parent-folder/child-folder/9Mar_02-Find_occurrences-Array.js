//this will count even the spaces and special characters as well
function findOccurrencests(str) {
    var count = {};
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var char = str_1[_i];
        if (count[char]) {
            count[char]++;
        }
        else {
            count[char] = 1;
        }
    }
    return count;
}
console.log(findOccurrencests("hello world"));
//This will count only the characters and ignore the spaces and special characters
function countCharacters(str) {
    var count = {};
    for (var _i = 0, str_2 = str; _i < str_2.length; _i++) {
        var char = str_2[_i];
        count[char] = (count[char] || 0) + 1;
    }
    return count;
}
var result = countCharacters("typescript");
for (var key in result) {
    console.log(key + " : " + result[key]);
}
