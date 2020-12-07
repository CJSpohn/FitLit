class Hydration {
  constructor(user) {
    this.userID = user.id;
    this.userHydrationData = hydrationData.filter(data => this.userID === data.userID);
  }

  getLifetimeHydrationAvg() {
    let userHydrationTotal = this.userHydrationData.reduce((total, day) => {
      total += day.numOunces;
      return total;
    }, 0)

    let userHydrationAvg = userHydrationTotal / this.userHydrationData.length;

    return userHydrationAvg;
  }

  getHydrationForSpecificDate(date) {
    return this.userHydrationData.find(data => date === data.date).numOunces;
  }
}
