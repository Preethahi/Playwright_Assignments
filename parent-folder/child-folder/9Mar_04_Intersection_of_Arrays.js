function intersectionofArrays(str) {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [4, 5, 6, 7, 8];

    const intersection = arr1.filter(value => arr2.includes(value));

    return intersection;
}
const result = intersectionofArrays();
console.log("Intersection of Arrays:", result);

function intersectionofArrays1(str) {
    const arr3 = [1, 2, 3, 4, 5,7,11];
    const arr4 = [4, 5, 6, 7, 8,9,10,11];
    intersection1 = [];

    for (let i = 0; i < arr3.length; i++) {
        for (let j = 0; j < arr4.length; j++) {
            if (arr3[i] === arr4[j]) {
                intersection1.push(arr3[i]);
            }
        }
    }


    return intersection1;
}
const result1 = intersectionofArrays1();
console.log("Intersection of Arrays1:", result1);
