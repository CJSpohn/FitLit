const dropDownForUsers = document.querySelector('.all-users-list');

let allUsers = new UserRepository(userData);

const populateSelectUsers = () => allUsers.users.forEach(user => {
  dropDownForUsers.innerHTML += `
    <option value='${user.id}'>${user.name}</option
    `;

})



populateSelectUsers();
