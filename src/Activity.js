class Activity {
  constructor(user) {
    this.userID = user.id;
    this.strideLength = user.strideLength;
    this.userStepGoal = user.dailyStepGoal;
    this.userActivityData = activityData.filter(data => this.userID === data.userID);
  }

  getMilesForSpecificDate(date) {
    let numOfStepsOnDate = this.userActivityData.find(data => data.date === date).numSteps;

    const numOfMiles = (numOfStepsOnDate * this.strideLength) / 5280;

    return parseFloat(numOfMiles.toFixed(2));
  }

  getActivityForSpecificDate(date) {
    return this.userActivityData.find(data => data.date === date);
  }

  getMinutesActiveDataForRange(startDate, endDate) {
    let firstIndex = this.userActivityData.findIndex(data => startDate === data.date);
    let endIndex = this.userActivityData.findIndex(data => endDate === data.date);

    let dataRange = this.userActivityData.slice(firstIndex, endIndex + 1);

    let minutesActiverPerDay = dataRange.map(data => data.minutesActive);

    return minutesActiverPerDay;
  }

  verifyStepGoalForSpecificDate(date) {
    let numOfStepsOnDate = this.userActivityData.find(data => data.date === date).numSteps;

    if (numOfStepsOnDate >= this.userStepGoal) {
      return "You have reached your goal!";
    } else {
      return "You're almost to your goal!";
    }
  }

  getAllDaysThatStepGoalReached() {
    const daysThatGoalReached =  this.userActivityData.filter(data => data.numSteps >= this.userStepGoal);

    return daysThatGoalReached.map(day => day.date);
  }

  getStairClimbRecord() {
    const highestStairDay = this.userActivityData.reduce((data1, data2) => data1.flightsOfStairs > data2.flightsOfStairs ? data1 : data2);
    return highestStairDay;
  }

  getActivityAvgsForAllUsers(date) {
    let todaysData = activityData.filter(day => day.date === date);

    let totalNumOfActivity = todaysData.reduce((total, data) => {
      total.numSteps += data.numSteps;
      total.minutesActive += data.minutesActive;
      total.flightsOfStairs += data.flightsOfStairs;
      return total;
    }, { "numSteps": 0, "minutesActive": 0, "flightsOfStairs": 0 });

    for (let key in totalNumOfActivity) {
      totalNumOfActivity[key] = parseFloat((totalNumOfActivity[key] / todaysData.length).toFixed(2));
    }

    return totalNumOfActivity;
  }

}
