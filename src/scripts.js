

console.log("Hello World");

let userId = 30;

let allUsers = new UserRepository(userData);

let curUser = allUsers.getUserData(30)

let curUserObject = new User(curUser);

console.log(curUserObject)
