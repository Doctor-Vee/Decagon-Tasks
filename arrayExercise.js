students = [
  { name: "Funke", age: 10 },
  { name: "Bola", age: 12 },
  { name: "Bolu", age: 11 },
  { name: "Sade", age: 13},
]

//Task 1 - .map
// Add a number property to every member of the array indexing from 1
task1 = students.map((value, index)=>{
 value['num'] = index + 1
 return value
})


// Task 2 - .some
// Check if anybody in the array has a name that starts with "S"
task2 = students.some((value)=>{
 return value.name[0] == "S" || value.name[0] == "s";
})


// Task 3 - .every
// Check if the names of all the members of the array have a length of 4
task3 = students.every((value)=>{
  return value.name.length >= 4;
 })


//  Task 4 - .filter
// Return an array of all members that have even numbered ages
task4 = students.filter((value)=> value.age % 2 == 0)


// Task 5 - .reduce
// Return an object that displays:
//     i - the number of even ages
//     ii - the number of odd ages
//     iii - the total age
task5 = {
  oddAge: students.reduce((oddAge, value) => value.age % 2 !== 0 ? oddAge + 1 : oddAge, 0),
  evenAge: students.reduce((evenAge, value) => value.age % 2 === 0 ? evenAge + 1 : evenAge, 0),
  totalAge: students.reduce((totalAge, value) => totalAge + value.age, 0)
}
console.log("Task 1 = Add a number property to every member of the array indexing from 1")
console.log(task1)
console.log("\nTask 2 = Check if anybody in the array has a name that starts with 'S'")
console.log(task2)
console.log("\nTask 3 = Check if the names of all the members of the array have a length of 4")
console.log(task3)
console.log("\nTask 4 = Return an array of all members that have even numbered ages")
console.log(task4)
console.log("\nTask 5 = Return an object that displays the number of even and odd ages and the total age")
console.log(task5)