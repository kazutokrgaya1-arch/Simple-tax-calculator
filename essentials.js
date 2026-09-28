//Arrow function
const greet = (a, b) => a -b;

console.log(greet(23,45));

//literal templates
let name = "genesis";
let age = 19;

console.log(`Hello my name is ${name} and I am ${age} years old.`);

let tim = 10;
let min = 5;

console.log(`total price is ${tim * min}`)

//destructuring
const numbers = [10, 22, 30];

const [a, b, c] = numbers;

console.log(a);
console.log(b);
console.log(c);

//spread operators
const students = {
    name:  "genesis",
    age: 19,
    course: "javascript"
}
const newStudent ={
    ...students,
    school: "north west samar state university"
}
console.log(newStudent);

//Array transformations
//map()
const numbers1 = [10, 20, 30];

const double = numbers1.map((num)=> num * 2);
console.log(double);

//filter()
const numbers2 = [10, 20, 30, 40, 50];

const accepted = numbers2.filter(num => num > 30);
console.log(accepted);

//reduce()
const numbers3 = [10, 20, 70]

const total = numbers3.reduce((re, duce) => re + duce,0);
console.log(total);

//OPtional chaining
const sstudent={
    address: {
        location: "Brgy.Solsogon"
    }
};
const student = {
    profile:{
         ...sstudent,
    name: "Genesis",
    age:19

    }
   
}
console.log(
    `${student?.profile?.name} lives in ${student?.profile?.address?.location}`
    );