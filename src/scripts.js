console.log("Hello World");

let userId = 30;

let allUsers = new UserRepository(userData);

console.log(allUsers.getAvgStepGoal())

let curUser = new User(allUsers.getUserData(30));

let userHydration = new Hydration(curUser);

console.log(curUser)
console.log(curUser.getUserFirstName())

console.log(userHydration.getLifetimeHydrationAvg());
