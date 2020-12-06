class UserRepository = {
  constructor(data) {
    this.users = data,
  }

  getUserData(userId) {
    return data.find(user => user.id === userId);
  }

  getAvgStepGoal() {
    //return step goal of all users
  }

}


if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
