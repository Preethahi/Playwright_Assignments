//Example 1: String Length

let s = "Hello World";

let arr = s.split(" "); 

console.log(arr);        
let n=arr.length;
console.log(arr.length)
console.log(arr[n-1].length);

//Example 2:

let a = " fly me to the moon "
let words=a.trim();
console.log(a.trim());
let arr1=words.split(" ");
console.log(arr1);
let n1=arr1.length;
console.log(arr1[n1-1].length); 

//Example 3:
let s1 ="Hello World";

s1=s1.replace(" ","");
console.log(s1);
let s2=s1.toLowerCase();
console.log(s2);

s2=s2.split("");
s2.sort();
s2=s2.join("");
console.log(s2);


//Method 1
function Anagram(s1,s2){
 s3=s1.split("");
 s3.sort();
 s3=s3.join("");
 console.log(s3);

  s4=s2.split("");
 s4.sort();
 s4=s4.join("");
 console.log(s4);

if (s3 === s4){
    console.log("The string is an anagram");
}
else{
    console.log("The string is not an anagram");
}
}
Anagram('listen', 'silent')

//Method 2
function isAnagram(str1, str2) {
    
    str1 = str1.toLowerCase().replace(/\s/g, "");
    str2 = str2.toLowerCase().replace(/\s/g, "");
    if (str1.length !== str2.length) {
        return false;
    }
    return str1.split("").sort().join("") === str2.split("").sort().join("");
}
console.log(isAnagram('listen', 'silent')); 
console.log(isAnagram('hello', 'world'));  


//Method 3
function isAnagram1(str1, str2) {
    str1 = str1.toLowerCase().replace(/\s/g, "");
    str2 = str2.toLowerCase().replace(/\s/g, "");
  
    let sortedStr1 = str1.split("").sort().join("");
    let sortedStr2 = str2.split("").sort().join("");
   
    if (sortedStr1 === sortedStr2) {

        return true;
    } else {
        return false;
    }
}


console.log(isAnagram1('listen', 'silent')); 
console.log(isAnagram1('hello', 'world'));   
