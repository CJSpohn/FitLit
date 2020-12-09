class UserRepository {
  constructor(data) {
    this.users = data
  }

  getUserData(userId) {
    return this.users.find(user => user.id === userId);
  }

  getAvgStepGoal() {
    const totalStepsOfAllUsers = this.users.reduce((total, user) => {
      total += user.dailyStepGoal;
      return total;
    }, 0)

    return Math.floor(totalStepsOfAllUsers / this.users.length);
  }

}

// if (typeof module !== 'undefined') {
  module.exports = UserRepository;
// }
