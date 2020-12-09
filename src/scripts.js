//Global variables
let allUsers = new UserRepository(userData);
let currentUser;

//query selectors
const dropDownForUsers = document.querySelector('.js-all-users');
const loginPage = document.querySelector('.js-login');
const goToDashboardButton = document.querySelector('.js-enter-dashboard');
const mainPage = document.querySelector('.js-main-page');
const welcomeMessage = document.querySelector('.js-welcome');

//Functions
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

const goToDashboard = () => {
  switchPage();
  instantiateUser();
  welcomeUser();
}






//Event listeners
window.onload = () => {
  allUsers.users.forEach(user => {
  dropDownForUsers.innerHTML += `
    <option value='${user.id}'>${user.name}</option>
    `;
})};

goToDashboardButton.addEventListener('click', goToDashboard);
