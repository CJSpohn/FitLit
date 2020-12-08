class Sleep {
  constructor(user) {
    this.userID = user.id,
    this.userSleepData = sleepData.filter(data => this.userID === data.userID);
  }

  getLifetimeSleepHoursAvg() {
    let userSleepHoursTotal = this.userSleepData.reduce((total, day) => {
      total += day.hoursSlept;
      return total;
    }, 0)

    let userSleepAvg = userSleepHoursTotal / this.userSleepData.length;

    return userSleepAvg;
  }

  getLifetimeSleepQualityAvg() {
    let userSleepQualityTotal = this.userSleepData.reduce((total, day) => {
      total += day.sleepQuality;
      return total;
    }, 0)

    let userSleepAvg = userSleepQualityTotal / this.userSleepData.length;

    return userSleepAvg;
  }

  getInformationForSpecificDate(date, attribute) {
    return this.userSleepData.find(data => data.date === date)[attribute];
  }



}
