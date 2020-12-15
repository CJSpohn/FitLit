//Global variables
let allUsers = new UserRepository(userData);
let currentUser;

//query selectors
const dropDownForUsers = document.querySelector('.js-all-users');
const goToDashboardButton = document.querySelector('.js-enter-dashboard');
const welcomeMessage = document.querySelector('.js-welcome');

//widgets
const infoCard = document.querySelector('.js-user-info');
const allUserStepGoalCard = document.querySelector('.js-step-goal');
const lifetimeHydrationAvg = document.querySelector('.js-hy-lifetime-avg');
const dailyHydration = document.querySelector('.js-hy-daily');
const weeklyHydration = document.querySelector('.js-hy-weekly');
const lifetimeSleepHoursAvg = document.querySelector('.js-sh-lifetime-avg');
const dailySleep = document.querySelector('.js-sl-daily');
const weeklySleep = document.querySelector('.js-sl-weekly');
const dailyActivity = document.querySelector('.js-ac-daily');
const activityComparison = document.querySelector('.js-ac-comparison');

//buttons
const hydrationButton = document.querySelector('.js-hydration');
const sleepButton = document.querySelector('.js-sleep');
const activityButton = document.querySelector('.js-activity');
const profileButton = document.querySelector('.js-profile');
const hydrationStartCalender = document.querySelector('.js-hy-start');
const hydrationEndCalender = document.querySelector('.js-hy-end');

//pages
const mainPage = document.querySelector('.js-main-page');
const loginPage = document.querySelector('.js-login');
const hydrationDisplay = document.querySelector('.js-hydration-display');
const sleepDisplay = document.querySelector('.js-sleep-display');
const activityDisplay = document.querySelector('.js-activity-display');
const profileDisplay = document.querySelector('.js-profile-display');


//Functions
const hidePages = () => {
  hydrationDisplay.classList.add('hidden');
  sleepDisplay.classList.add('hidden');
  activityDisplay.classList.add('hidden');
  profileDisplay.classList.add('hidden');
}

const updateNavDisplay = (buttonToHighlight) => {
  profileButton.classList.remove('nav-button-select');
  sleepButton.classList.remove('nav-button-select');
  hydrationButton.classList.remove('nav-button-select');
  activityButton.classList.remove('nav-button-select');
  buttonToHighlight.classList.add('nav-button-select');
}

const displayPage = (pageToShow) => {
  hidePages();
  if (pageToShow === 'activity') {
    updateNavDisplay(activityButton);
    activityDisplay.classList.remove('hidden');
  } else if (pageToShow === 'sleep') {
    updateNavDisplay(sleepButton);
    sleepDisplay.classList.remove('hidden');
  } else if (pageToShow === 'hydration') {
    updateNavDisplay(hydrationButton);
    hydrationDisplay.classList.remove('hidden');
  } else if (pageToShow === 'profile') {
    updateNavDisplay(profileButton);
    profileDisplay.classList.remove('hidden');
  }
}

const switchPage = () => {
  loginPage.classList.toggle('hidden');
  mainPage.classList.toggle('hidden');
}

const instantiateUser = () => {
  const selectedUser = allUsers.getUserData(parseInt(dropDownForUsers.value));
  currentUser = new User(selectedUser);
}

const welcomeUser = () => {
  welcomeMessage.innerText = `Welcome ${currentUser.getUserFirstName()}`;
}

const compareStepGoals = () => {
  const allUsersStepGoal = allUsers.getAvgStepGoal();
  if (currentUser.dailyStepGoal > allUsersStepGoal) {
    allUserStepGoalCard.innerHTML += `
      <p class="widget-text">Your step goal of ${currentUser.dailyStepGoal} steps is ${currentUser.dailyStepGoal - allUsersStepGoal} steps more than the average user step goal!</p>
    `
  } else {
    allUserStepGoalCard.innerHTML += `
    <p class="widget-text">Your step goal of ${currentUser.dailyStepGoal} steps is ${allUsersStepGoal - currentUser.dailyStepGoal} steps fewer than the average user step goal!<p>
    `
  }
}
//WIDGET  CREATOR FUNCTIONS
const writeWeeklyHydration = (userHydration) => {
  const hydrationWeekly = userHydration.getHydrationDataForRange('2019/09/10', '2019/09/22');
  barChart('.hy-bar-chart', hydrationWeekly, 'numOunces');
}

const writeDailyHydration = (userHydration) => {
  const hydrationToday = userHydration.getHydrationForSpecificDate('2019/09/22');
  dailyHydration.innerHTML += `
    <p class="widget-text">
      You have consumed
      <span class="user-stat">${hydrationToday}</span>
      ounces of water today.
    </p>
  `
}
//REFACTOR
const createUserInfo = () => {
  for (let key in currentUser) {
    infoCard.innerHTML += `
      <p>${key}: ${currentUser[key]}</p>
    `
  }
}

const writeUserHydrationAvg = (userHydration) => {
  const userLifetimeAvg = userHydration.getLifetimeHydrationAvg();
  lifetimeHydrationAvg.innerHTML += `
    <p class="widget-text">
      You've consumed
      <span class="user-stat">${userLifetimeAvg}</span>
      ounces per day since starting FitLit!
    </p>
  `
}
//INSERT BAR CHART
const writeWeeklySleep = (userSleep) => {
  const sleepWeekly = userSleep.getSleepInfoForRange('2019/09/16', '2019/09/22');

}

const writeDailySleep = (userSleep) => {
  const userDailySleep = userSleep.getSleepInfoForSpecificDate('2019/09/22');
  dailySleep.innerHTML += `
    <p>Sleep Quality: ${userDailySleep.sleepQuality}</p>
    <p>Hours Slept: ${userDailySleep.hoursSlept}</p>
  `
}

const writeSleepAvg = (userSleep) => {
  const userLifetimeSleepHoursAvg = userSleep.getLifetimeSleepAttAvg('hoursSlept');
  const userLifetimeSleepQualityAvg = userSleep.getLifetimeSleepAttAvg('sleepQuality');
  lifetimeSleepHoursAvg.innerHTML += `
    <p class="widget-text">
      You've slept
      <span class="user-stat">${userLifetimeSleepHoursAvg}</span>
      hours per day with an average quality of
      <span class="user-stat">${userLifetimeSleepQualityAvg}</span>
      since starting FitLit!
    </p>
  `
}

const writeDailyActivity = (userActivity) => {
  const activityToday = userActivity.getActivityForSpecificDate('2019/09/22');
  const milesWalked = userActivity.getMilesForSpecificDate('2019/09/22');
  dailyActivity.innerHTML += `
    <p class="ac-stats">Steps taken: ${activityToday.numSteps}</p>
    <p class="ac-stats">Minute Active: ${activityToday.minutesActive}</p>
    <p class="ac-stats">Miles walked: ${milesWalked}</p>
  `
}

const calculateUserDifferences = (userActivity) => {
  const activityTodayUser = userActivity.getActivityForSpecificDate('2019/09/22');
  const activityTodayAvg = userActivity.getActivityAvgsForAllUsers('2019/09/22');

  const userDifferences = {
    minutesActive: parseInt(activityTodayUser.minutesActive - activityTodayAvg.minutesActive),
    flightsOfStairs: parseInt(activityTodayUser.flightsOfStairs - activityTodayAvg.flightsOfStairs),
    numSteps: parseInt(activityTodayUser.numSteps - activityTodayAvg.numSteps)
  }

  return userDifferences;
}

const editNumberStyling = (element, att, result) => {
  if (result[att] > 0) {
    element.classList.add('positive')
  } else {
    element.classList.add('negative')
  }
}

const writeActivityComparison = (userActivity) => {
  const compareSteps = document.querySelector('.js-steps');
  const compareFlights = document.querySelector('.js-flights');
  const compareMinutes = document.querySelector('.js-minutes');

  //TODO: Move this function into Activity as a method
  let differences = calculateUserDifferences(userActivity);

  compareSteps.innerText = `${differences.numSteps}`;
  compareFlights.innerText = `${differences.flightsOfStairs}`;
  compareMinutes.innerText = `${differences.minutesActive}`;

  editNumberStyling(compareSteps, 'numSteps', differences);
  editNumberStyling(compareFlights, 'flightsOfStairs', differences);
  editNumberStyling(compareMinutes, 'minutesActive', differences);
}

const displayCalender = () => {
  const picker1 = datepicker('.js-hy-start', {
    id: 1,
    onSelect: (picker1, date) => {
      picker2.show();
      console.log(picker1.getRange())},
    startDate: new Date(2019, 5, 15),
    minDate: new Date(2019, 5, 15),
    maxDate: new Date(2019, 8, 22)
    });
  const picker2 = datepicker('.js-hy-end', {
    id: 1,
    onSelect: (picker2, date) => console.log(picker2.getRange()),
    // minDate: new Date(2019, 6, 15),
    // maxDate: new Date(2019, 9, 22)
    });
  picker1.show();
}


const makeProfileWidgets = () => {
  createUserInfo();
  compareStepGoals();
}

const makeActivityWidgets = () => {
  writeDailyActivity(new Activity(currentUser));
  writeActivityComparison(new Activity(currentUser));
}

const makeHydrationWidgets = () => {
  writeDailyHydration(new Hydration(currentUser));
  writeUserHydrationAvg(new Hydration(currentUser));
  writeWeeklyHydration(new Hydration(currentUser));
}

const makeSleepWidgets = () => {
  writeWeeklySleep(new Sleep(currentUser, sleepData, userData));
  writeSleepAvg(new Sleep(currentUser));
  writeDailySleep(new Sleep(currentUser));
}

const populateWidgets = () => {
  makeProfileWidgets();
  makeActivityWidgets();
  makeSleepWidgets();
  makeHydrationWidgets();
}

const goToDashboard = () => {
  switchPage();
  instantiateUser();
  welcomeUser();
  populateWidgets();
}

//Event listeners
window.onload = () => {
  allUsers.users.forEach(user => {
  dropDownForUsers.innerHTML += `
    <option value='${user.id}'>${user.name}</option>
    `
  })};

goToDashboardButton.addEventListener('click', goToDashboard);
hydrationButton.addEventListener('click', function() {
  displayPage('hydration')
});
sleepButton.addEventListener('click', function() {
  displayPage('sleep')
});
activityButton.addEventListener('click', function() {
  displayPage('activity')
});
profileButton.addEventListener('click', function() {
  displayPage('profile')
});

hydrationStartCalender.addEventListener('click', displayCalender);
hydrationEndCalender.addEventListener('click', displayCalender);
