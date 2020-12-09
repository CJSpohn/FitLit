//Global variables
let allUsers = new UserRepository(userData);

//query selectors
const dropDownForUsers = document.querySelector('.js-all-users');
const loginPage = document.querySelector('.js-login');
const goToDashboardButton = document.querySelector('.js-enter-dashboard');
const mainPage = document.querySelector('.js-main-page');

//Event listeners
window.onload = () => {
  allUsers.users.forEach(user => {
  dropDownForUsers.innerHTML += `
    <option value='${user.id}'>${user.name}</option>
    `;
})};

goToDashboardButton.addEventListener('click', goToDashboard);

//Functions
// const goToDashboard = () => {
//   loginPage.classList.add('hidden');
//   mainPage.classList.remove('hidden');
// }

function goToDashboard() {
  loginPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
}
