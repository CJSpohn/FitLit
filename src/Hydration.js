class Hydration {
  constructor(user, data) {
    this.userID = user.id;
    this.userHydrationData = data.filter(data => this.userID === data.userID);
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
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
