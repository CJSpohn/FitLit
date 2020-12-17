//Global variables
let allUsers = new UserRepository(userData);
let currentUser, userSleep, userActivity, userHydration;

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
const startCalendar = document.querySelector('.date-start');
const endCalendar = document.querySelector('.date-end');
const changeDateButton = document.querySelector('.change-dates');

//pages
const mainPage = document.querySelector('.js-main-page');
const loginPage = document.querySelector('.js-login');
const hydrationDisplay = document.querySelector('.js-hydration-display');
const sleepDisplay = document.querySelector('.js-sleep-display');
const activityDisplay = document.querySelector('.js-activity-display');
const profileDisplay = document.querySelector('.js-profile-display');

//misc
const sleepCheckBox = document.querySelector('.js-sleep-checkbox');
const sleepChartLabel = document.querySelector('.js-sl-chart-label');
const activityChartLabel = document.querySelector('.js-ac-label');
const activityRadios = document.querySelectorAll('input[name="activity-radio"]');

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
  userSleep = new Sleep(currentUser, sleepData, allUsers); //, allUsers, sleepData
  userActivity = new Activity(currentUser, activityData, allUsers);
  userHydration = new Hydration(currentUser, hydrationData, allUsers);
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
const writeWeeklyHydration = (date1, date2) => {
  const hydrationWeekly = userHydration.getHydrationDataForRange(date1, date2);
  barChart('.hy-bar-chart', hydrationWeekly, 'numOunces', 'cornflowerblue');
}

const writeDailyHydration = () => {
  const hydrationToday = userHydration.getHydrationForSpecificDate('2019/09/22');
  dailyHydration.innerHTML += `
    <p class="widget-text">
      You have consumed
      <span class="hy-user-stat">${hydrationToday}</span>
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

const writeUserHydrationAvg = () => {
  const userLifetimeAvg = userHydration.getLifetimeHydrationAvg();
  const userRanking = userHydration.getUserRank();
  lifetimeHydrationAvg.innerHTML += `
    <p class="widget-text">
      You're average consumption of
      <span class="hy-user-stat">${userLifetimeAvg}</span>
      ounces per day since starting FitLit is rank <span class="hy-user-stat">${userRanking}</span> among all of our users!
    </p>
  `

}
//INSERT BAR CHART
const writeWeeklySleep = (date1, date2) => {
  const sleepWeekly = userSleep.getSleepInfoForRange(date1, date2);
  if (sleepCheckBox.checked === true) {
    sleepChartLabel.innerText = 'Sleep Quality'
    barChart('.sl-bar-chart', sleepWeekly, 'sleepQuality', 'mediumpurple')
  } else {
    sleepChartLabel.innerText = 'Hours Slept'
    barChart('.sl-bar-chart', sleepWeekly, 'hoursSlept', 'mediumpurple')
  }
}

const writeDailySleep = () => {
  const userDailySleep = userSleep.getSleepInfoForSpecificDate('2019/09/22');
  document.querySelector('.js-sleep-hours-p').innerHTML += `Hours: <span class="sl-user-stat">${userDailySleep.hoursSlept}</span>`
  document.querySelector('.js-sleep-quality-p').innerHTML += `Quality: <span class="sl-user-stat">${userDailySleep.sleepQuality}</span>`
}

const writeSleepAvg = () => {
  const userLifetimeSleepHoursAvg = userSleep.getLifetimeSleepAttAvg('hoursSlept');
  const userLifetimeSleepQualityAvg = userSleep.getLifetimeSleepAttAvg('sleepQuality');
  lifetimeSleepHoursAvg.innerHTML += `
    <p class="widget-text">
      You've slept
      <span class="sl-user-stat">${userLifetimeSleepHoursAvg}</span>
      hours per day with an average quality of
      <span class="sl-user-stat">${userLifetimeSleepQualityAvg}</span>
      since starting FitLit!
    </p>
  `
}

const writeDailyActivity = () => {
  const activityToday = userActivity.getActivityForSpecificDate('2019/09/22');
  const milesWalked = userActivity.getMilesForSpecificDate('2019/09/22');
  document.querySelector('.js-ac-steps-p').innerHTML += `Steps: <span class="ac-user-stat">${activityToday.numSteps}</span>`
  document.querySelector('.js-ac-stairs-p').innerHTML += `Stairs: <span class="ac-user-stat">${activityToday.flightsOfStairs}</span>`
  document.querySelector('.js-ac-minutes-p').innerHTML += `Minutes: <span class="ac-user-stat">${activityToday.minutesActive}</span>`
}

const calculateUserDifferences = () => {
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

const writeWeeklyActivity = (startDate, endDate) => {
  const activityWeekly = userActivity.getActivityDataForRange(startDate, endDate);
  toggleActivityChart(activityWeekly);
}


const createChartWithSelectedDates = () => {
  let startDate = startCalendar.value.replace(/-/gi, '/');
  let endDate = endCalendar.value.replace(/-/gi, '/');
  writeWeeklyHydration(startDate, endDate);
  writeWeeklyActivity(startDate, endDate);
  writeWeeklySleep(startDate, endDate);
}

const toggleActivityChart = (data) => {
  if (activityRadios[0].checked) {
    activityChartLabel.innerText = 'Steps Per Day';
    barChart('.ac-bar-chart', data, 'numSteps', 'chocolate')
  } else if (activityRadios[1].checked) {
    barChart('.ac-bar-chart', data, 'flightsOfStairs', 'chocolate')
    activityChartLabel.innerText = 'Flights of Stairs Per Day';
  } else {
    barChart('.ac-bar-chart', data, 'minutesActive', 'chocolate')
    activityChartLabel.innerText = 'Minutes Active Per Day';
  }
}

const makeProfileWidgets = () => {
  createUserInfo();
  compareStepGoals();
}

const makeActivityWidgets = () => {
  writeDailyActivity();
  writeActivityComparison();
  writeWeeklyActivity('2019/09/16', '2019/09/22');
}

const makeHydrationWidgets = () => {
  writeDailyHydration();
  writeUserHydrationAvg();
  writeWeeklyHydration('2019/09/16', '2019/09/22');
}

const makeSleepWidgets = () => {
  writeWeeklySleep('2019/09/16', '2019/09/22');
  writeSleepAvg();
  writeDailySleep();
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

sleepCheckBox.addEventListener('change', () => {
  createChartWithSelectedDates();
})

activityRadios.forEach(radio => {
  radio.addEventListener('change', function() {
    createChartWithSelectedDates();
  })
})

changeDateButton.addEventListener('click', function() {
  createChartWithSelectedDates();
})
