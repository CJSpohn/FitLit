console.log('Hello World');

let userId = 30;

let allUsers = new UserRepository(userData);

console.log(allUsers.getAvgStepGoal())

let curUser = new User(allUsers.getUserData(30));

let userHydration = new Hydration(curUser);

console.log(curUser)
console.log('user first name:', curUser.getUserFirstName())

console.log('user hydration avg:', userHydration.getLifetimeHydrationAvg());
console.log('user hydration for date:', userHydration.getHydrationForSpecificDate('2019/06/15'));
console.log('user hydration for range:', userHydration.getHydrationDataForRange('2019/07/15', '2019/07/22'))

let userSleep = new Sleep(curUser);

console.log('user sleep avg:', userSleep.getLifetimeSleepAttAvg('hoursSlept'))
console.log('user sleep quality avg:', userSleep.getLifetimeSleepAttAvg('sleepQuality'))
console.log('user sleep quality for specific date (should be 5.7):', userSleep.getSleepInfoForSpecificDate('2019/06/15', 'hoursSlept'))
console.log('user sleep hours for specific date (should be 2.4):', userSleep.getSleepInfoForSpecificDate('2019/06/15', 'sleepQuality'))
console.log('user sleep info for range: (quality)', userSleep.getSleepInfoForRange('2019/06/15', '2019/06/22', 'sleepQuality'))
console.log('user sleep info for range: (hours)', userSleep.getSleepInfoForRange('2019/06/15', '2019/06/22', 'hoursSlept'))
console.log('all user sleep quality', userSleep.getAllUsersAvgSleepQuality())
console.log('get all users over avg of 3', userSleep.getAllUsersSleepQualityAvgOver3('2019/06/20', '2019/06/27'))
console.log('get sleep record winner for date:', userSleep.getSleepRecordForDate('2019/06/20'));
