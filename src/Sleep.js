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

  getSleepInfoForSpecificDate(date, attribute) {
    return this.userSleepData.find(data => data.date === date)[attribute];
  }

  getSleepInfoForRange(startDate, endDate, attribute) {
    let startIndex = this.userSleepData.findIndex(data => startDate === data.date);
    let endIndex = this.userSleepData.findIndex(data => endDate === data.date);

    let dataRange = this.userSleepData.slice(startIndex, endIndex + 1);

    let attributePerDay = dataRange.map(data => data[attribute]);

    return attributePerDay
  }

  getAllUsersAvgSleepQuality() {
    let allUserSleepQualityTotal = sleepData.reduce((total, data) => {
      total += day.sleepQuality;
      return total
    }, 0)

    let allUserSleepQualityAvg = allUserSleepQualityTotal / sleepData.length

    return allUserSleepQualityAvg
  }

  getAllUsersSleepQualityAvgOver3(startDate, endDate) {
    let usersWhoAvgOver3 = [];

    users.forEach(user => {
      let userSleepData = sleepData.filter(data => user.id === data.userID);

      let startIndex = userSleepData.findIndex(data => startDate === data.date);
      let endIndex = userSleepData.findIndex(data => endDate === data.date);

      let dataRange = userSleepData.slice(startIndex, endIndex + 1);

      let userSleepQualityTotal = dataRange.reduce((total, date) => {
        total += date.sleepQuality;
        return total;
      }, 0)

      let userSleepQualityAvg = userSleepQualityTotal / userSleepData.length;

      if (userSleepQualityAvg > 3) {
        usersWhoAvgOver3.push(userData.find(data => data.id === user.id))
      };
    })

    return usersWhoAvgOver3;
  }

}
