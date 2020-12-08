class Activity {
  constructor(user) {
    this.userID = user.id;
    this.strideLength = user.strideLength;
    this.userActivityData = activityData.filter(data => this.userID === data.userID);
  }

  getMilesForSpecificDate(date) {
    let numOfStepsOnDate = this.userActivityData.find(data => data.date === date).numSteps;

    const numOfMiles = (numOfStepsOnDate * this.strideLength) / 5280;

    return parseFloat(numOfMiles.toFixed(2));
  }

  getMinutesActiveForSpecificDate(date) {
    return this.userActivityData.find(data => data.date === date).minutesActive;
  }

  getMinutesActiveDataForRange(startDate, endDate) {
    let firstIndex = this.userActivityData.findIndex(data => startDate === data.date);
    let endIndex = this.userActivityData.findIndex(data => endDate === data.date);

    let dataRange = this.userActivityData.slice(firstIndex, endIndex + 1);

    let minutesActiverPerDay = dataRange.map(data => data.minutesActive);

    return minutesActiverPerDay;
  }



}
