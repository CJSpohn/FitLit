class Sleep {
  constructor(user) {
    this.userID = user.id,
    this.userSleepData = sleepData.filter(data => this.userID === data.userID);
  }

  getLifetimeSleepAvg() {
    let userSleepTotal = this.userSleepData.reduce((total, day) => {
      total += day.hoursSlept;
      return total;
    }, 0)

    let userSleepAvg = userSleepTotal / this.userSleepData.length;

    return userSleepAvg;
  }

  


}
