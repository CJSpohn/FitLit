class Hydration {
  constructor(user) {
    this.userID = user.id;
  }

  getLifetimeHydrationAvg() {
    let userHydrationDays = hydrationData.filter(data => this.userID === data.userID);

    let userHydrationTotal = userHydrationDays.reduce((total, day) => {
      total += day.numOunces;
      return total;
    }, 0)

    let userHydrationAvg = userHydrationTotal / userHydrationDays.length;
    
    return userHydrationAvg;
  }
}
