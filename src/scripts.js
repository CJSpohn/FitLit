console.log("Hello World");

let userId = 30;

let allUsers = new UserRepository(userData);

console.log(allUsers.getAvgStepGoal())

let curUser = new User(allUsers.getUserData(30));

let userHydration = new Hydration(curUser);

console.log(curUser)
console.log("user first name:", curUser.getUserFirstName())

console.log("user hydration avg:", userHydration.getLifetimeHydrationAvg());
console.log("user hydration for date:", userHydration.getHydrationForSpecificDate("2019/06/15"));
console.log("user hydration for range:", userHydration.getHydrationDataForRange("2019/07/15", "2019/07/22"))

let userSleep = new Sleep(curUser);

console.log("user sleep avg:", userSleep.getLifetimeSleepHoursAvg())
console.log("user sleep quality avg:", userSleep.getLifetimeSleepQualityAvg())
