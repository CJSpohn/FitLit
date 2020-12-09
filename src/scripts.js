//Global variables
let allUsers = new UserRepository(userData);

//query selectors
const dropDownForUsers = document.querySelector('.js-all-users');
const loginPage = document.querySelector('.js-login');
const goToDashboardButton = document.querySelector('.js-enter-dashboard');
const mainPage = document.querySelector('.js-main-page');

//Functions
const goToDashboard = () => {
  loginPage.classList.add('hidden');
  mainPage.classList.remove('hidden');

  const selectedUser = allUsers.getUserData(parseInt(dropDownForUsers.value));
  const currentUser = new User(selectedUser);
  console.log(currentUser);


}




//Event listeners
window.onload = () => {
  allUsers.users.forEach(user => {
  dropDownForUsers.innerHTML += `
    <option value='${user.id}'>${user.name}</option>
    `;
})};

goToDashboardButton.addEventListener('click', goToDashboard);
