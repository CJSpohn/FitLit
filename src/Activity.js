class Activity {
  constructor(user) {
    this.userID = user.id;
    this.strideLength = user.strideLength;
    this.userActivityData = activityData.filter(data => this.userID === data.userID);
  }

  getMilesForSpecificDate(date) {
    let numOfStepsOnDate
  }
}
