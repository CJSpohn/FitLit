class Hydration {
  constructor(user, hydrationData, userData) {
    this.userID = user.id,
    this.hydrationData = hydrationData,
    this.userData = userData,
    this.userHydrationData = hydrationData.filter(data => this.userID === data.userID)
  }

  getLifetimeHydrationAvg() {
    let userHydrationTotal = this.userHydrationData.reduce((total, day) => {
      total += day.numOunces;
      return total;
    }, 0)

    let userHydrationAvg = userHydrationTotal / this.userHydrationData.length;

    return parseFloat(userHydrationAvg.toFixed(2));
  }

  getHydrationForSpecificDate(date) {
    return this.userHydrationData.find(data => date === data.date).numOunces;
  }

  getHydrationDataForRange(startDate, endDate) {
    let startIndex = this.userHydrationData.findIndex(data => startDate === data.date);
    let endIndex = this.userHydrationData.findIndex(data => endDate === data.date);

    let dataRange = this.userHydrationData.slice(startIndex, endIndex + 1);

    return dataRange;
  }

  getUserRank() {
    let allUsersRanking = [];

    this.userData.users.forEach(user => {
      let userHydration = new Hydration(user, this.hydrationData, this.userData)
      allUsersRanking.push({ userID: userHydration.userID, hydrationAvg: userHydration.getLifetimeHydrationAvg()})
    })

    allUsersRanking.sort((a,b) => b.hydrationAvg - a.hydrationAvg)

    let userRank = allUsersRanking.findIndex(user => user.userID === this.userID) + 1
    return userRank
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
