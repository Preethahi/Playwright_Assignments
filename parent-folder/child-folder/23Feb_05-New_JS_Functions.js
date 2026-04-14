const { time } = require("node:console")

function userProfile(name) {
    console.log("Hello, " + name + "!");
}
userProfile("Preetha")

// Task 2: Arrow Function
const double = (num) => {
    return num * 2;
};
console.log("Double value:", double(5));

// Task 3: Anonymous Function with setTimeout
setTimeout(function () {
    console.log("This message is delayed by 2 seconds");
}, 2000);

// Task 4: Callback Function
function getUserData(callback) {
    setTimeout(function () {
        callback(); // calling the callback after delay
    }, 3000);
}

// Task 4 call with callback function
getUserData(function () {
    console.log("Call Back Function");
});
