console.log("Hello World");

let userId = 30;

let allUsers = new UserRepository(userData);

console.log(allUsers.getAvgStepGoal())

let curUser = allUsers.getUserData(30)

let curUserObject = new User(curUser);

console.log(curUserObject)
console.log(curUserObject.getUserFirstName())
