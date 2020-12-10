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
const lifetimeSleepHoursAvg = document.querySelector('.js-sh-lifetime-avg');
const lifetimeStairsRecord = document.querySelector('.js-stair-record');

//buttons
const hydrationButton = document.querySelector('.js-hydration');
const sleepButton = document.querySelector('.js-sleep');
const activityButton = document.querySelector('.js-activity');
const profileButton = document.querySelector('.js-profile');

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
      <p>Your step goal of ${currentUser.dailyStepGoal} steps is ${currentUser.dailyStepGoal - allUsersStepGoal} steps more than the average user step goal!</p>
    `
  } else {
    allUserStepGoalCard.innerHTML += `
    <p>Your step goal of ${currentUser.dailyStepGoal} steps is ${allUsersStepGoal - currentUser.dailyStepGoal} steps fewer than the average user step goal!<p>
    `
  }
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
  const userHydration = new Hydration(currentUser);
  const userLifetimeAvg = userHydration.getLifetimeHydrationAvg();
  lifetimeHydrationAvg.innerHTML += `
    <p>You've consumed ${userLifetimeAvg} ounces per day since starting FitLit!</p>
  `
}

const writeSleepHoursAvg = () => {
  const userSleep = new Sleep(currentUser);
  const userLifetimeSleepHoursAvg = userSleep.getLifetimeSleepAttAvg('hoursSlept');
  lifetimeSleepHoursAvg.innerHTML += `
    <p>You've slept ${userLifetimeSleepHoursAvg} hours per day since starting FitLit!</p>
  `
}

const writeUserStepsRecord = () => {
  const userActivity = new Activity(currentUser);
  const userLifetimeStairsRecord = userActivity.getStairClimbRecord();
  lifetimeStairsRecord.innerHTML += `
    <p>On ${userLifetimeStairsRecord.date} you climbed a record ${userLifetimeStairsRecord.flightsOfStairs} flights of stairs!</p>
  `
}

const populateWidgets = () => {
  createUserInfo();
  compareStepGoals();
  writeUserHydrationAvg();
  writeSleepHoursAvg();
  writeUserStepsRecord();
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
    `;
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
