const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const User = require('../src/User');
const Activity = require('../src/Activity');
const sampleData = require('../data/test-data');
const sampleUserData = sampleData.sampleUserData;
const sampleActivityData = sampleData.sampleActivityData;

describe('Activity', () => {
  let users, currentUser, userActivity;

  beforeEach(function() {
    users = new UserRepository(sampleUserData);
    currentUser = new User(users.users[0]);
    userActivity = new Activity(currentUser, sampleActivityData, sampleUserData)
  });

  it('should be a function', () => {
    expect(Activity).to.be.a('function')
  })

  it('should contain user id, stride length, daily step goal, user data, activity data, and user specific activity data', () => {
    expect(userActivity.userID).to.equal(1);
    expect(userActivity.strideLength).to.equal(4.3);
    expect(userActivity.userStepGoal).to.equal(10000);
    expect(userActivity.userData).to.eql(sampleUserData);
    expect(userActivity.activityData).to.eql(sampleActivityData);
    expect(userActivity.userActivityData).to.eql([
      {
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 6637,
        "minutesActive": 175,
        "flightsOfStairs": 36
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 14329,
        "minutesActive": 168,
        "flightsOfStairs": 18
      }
    ]);
  });

  it('should return the miles walked for a specific date', () => {
    let milesDate1 = userActivity.getMilesForSpecificDate('2019/06/15');
    let milesDate2 = userActivity.getMilesForSpecificDate('2019/06/16');
    expect(milesDate1).to.equal(2.91);
    expect(milesDate2).to.equal(5.41);
  })

  it('should return activity for a specific date', () => {
    let userActivityOnDate = userActivity.getActivityForSpecificDate('2019/06/15');

    expect(userActivityOnDate.numSteps).to.equal(3577);
    expect(userActivityOnDate.minutesActive).to.equal(140);
    expect(userActivityOnDate.flightsOfStairs).to.equal(16);
  });

  it('should return all activity for a range of dates', () => {
    let userActivityRange = userActivity.getActivityDataForRange('2019/06/15', '2019/06/17');

    expect(userActivityRange.length).to.equal(3);
    expect(userActivityRange).to.eql([
      {
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 6637,
        "minutesActive": 175,
        "flightsOfStairs": 36
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 14329,
        "minutesActive": 168,
        "flightsOfStairs": 18
      }
    ])
  })

  it('should verify if a step goal was met for a specific date', () => {
    let stepGoalNotMet = userActivity.verifyStepGoalForSpecificDate('2019/06/15');
    let stepGoalMet = userActivity.verifyStepGoalForSpecificDate('2019/06/17');

    expect(stepGoalNotMet).to.equal('You\'re almost to your goal!')
    expect(stepGoalMet).to.equal('You have reached your goal!')
  })

  it('should return all the dates that the step goal has been met', () => {
    let stepGoalMetDates = userActivity.getAllDaysThatStepGoalReached()

    expect(stepGoalMetDates).to.eql(["2019/06/17"])
  })

  it('should get the stair climbing record for a user', () => {
    let stairRecord = userActivity.getStairClimbRecord();

    expect(stairRecord).to.eql({
      "userID": 1,
      "date": "2019/06/16",
      "numSteps": 6637,
      "minutesActive": 175,
      "flightsOfStairs": 36
    });
  });

  it('should get the activity averages for all users on a specific date', () => {
    let allUserAverage = userActivity.getActivityAvgsForAllUsers('2019/06/15');

    expect(allUserAverage).to.eql({ "numSteps": 3935.5, "minutesActive": 139, "flightsOfStairs": 13 })
  });

  it('should get the activity averages for all users on a different specific date', () => {
    let allUserAverage = userActivity.getActivityAvgsForAllUsers('2019/06/16');

    expect(allUserAverage).to.eql({ "numSteps": 5374.5, "minutesActive": 197.5, "flightsOfStairs": 36.5 })
  })

  it('should calculuate the user differences for a user against all avgs', () => {
    let differences = userActivity.calculateUserDifferences('2019/06/17')

    expect(differences).to.eql({minutesActive: 51, flightsOfStairs: 7, numSteps: 289})
  })
});
