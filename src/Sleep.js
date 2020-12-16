class Sleep {
  constructor(user, sleepData, userData) {
    this.userData = userData,
    this.sleepData = sleepData,
    this.userID = user.id,
    this.userSleepData = sleepData.filter(data => this.userID === data.userID);
  }

  getLifetimeSleepAttAvg(attribute) {
    let userSleepAttTotal = this.userSleepData.reduce((total, day) => {
      total += day[attribute];
      return total;
    }, 0)

    let userSleepAvg = userSleepAttTotal / this.userSleepData.length;

    return parseFloat(userSleepAvg.toFixed(2));
  }

  getSleepInfoForSpecificDate(date) {
    return this.userSleepData.find(data => data.date === date);
  }

  getSleepInfoForRange(startDate, endDate) {
    let startIndex = this.userSleepData.findIndex(data => startDate === data.date);
    let endIndex = this.userSleepData.findIndex(data => endDate === data.date);

    let dataRange = this.userSleepData.slice(startIndex, endIndex + 1);
    return dataRange
  }

  getAllUsersAvgSleepQuality() {
    let allUserSleepQualityTotal = this.sleepData.reduce((total, day) => {
      total += day.sleepQuality;
      return total
    }, 0)

    let allUserSleepQualityAvg = allUserSleepQualityTotal / this.sleepData.length

    return parseFloat(allUserSleepQualityAvg.toFixed(2));
  }

  getAllUsersSleepQualityAvgOver3(startDate, endDate) {
    let usersWhoAvgOver3 = [];

    this.userData.forEach(user => {
      let curUser = new Sleep(user, this.sleepData, this.userData);
      let userSleepRange = curUser.getSleepInfoForRange(startDate, endDate, 'sleepQuality');
      let userSleepTotal = userSleepRange.reduce((a, c) => {
        let total = a + c.sleepQuality;
        return total
      }, 0);
      let userSleepAvg = userSleepTotal / userSleepRange.length
      if (userSleepAvg > 3) {
        usersWhoAvgOver3.push(user);
      }
    })

    return usersWhoAvgOver3;
  }


  getSleepRecordForDate(date) {
    let usersSleepData = this.sleepData.filter(data => data.date === date);

    let sortedSleepData = usersSleepData.sort((a, b) => b.hoursSlept - a.hoursSlept);
    let mostSleptHours = sortedSleepData[0];
    let sleepRecordWinners = sortedSleepData.filter(data => data.hoursSlept === mostSleptHours.hoursSlept);

    return sleepRecordWinners
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
