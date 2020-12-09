const dropDownForUsers = document.querySelector('.js-all-users');

let allUsers = new UserRepository(userData);

const populateSelectUsers = () => allUsers.users.forEach(user => {
  dropDownForUsers.innerHTML += `
    <option value='${user.id}'>${user.name}</option
    `;
})



populateSelectUsers();
