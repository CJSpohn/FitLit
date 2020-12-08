console.log("Hello World");

let userId = 30;

let allUsers = new UserRepository(userData);

console.log(allUsers.getAvgStepGoal())

let curUser = new User(allUsers.getUserData(30));

let userHydration = new Hydration(curUser);

let userActivity = new Activity(curUser);

console.log(curUser)
console.log(curUser.getUserFirstName())

console.log(userHydration.getLifetimeHydrationAvg());
console.log(userHydration.getHydrationForSpecificDate("2019/06/15"));
console.log(userHydration.getHydrationDataForRange("2019/07/15", "2019/07/22"));
console.log(userActivity.getMinutesActiveDataForRange("2019/07/15", "2019/07/22"));
