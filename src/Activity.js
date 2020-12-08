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


}
