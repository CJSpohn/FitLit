const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const User = require('../src/User');
const Sleep = require('../src/Sleep');
const sampleData = require('../data/test-data');
const sampleUserData = sampleData.sampleUserData;
const sampleSleepData = sampleData.sampleSleepData;

describe('Sleep', () => {
  let users, currentUser, userSleep;

  beforeEach(function() {
    users = new UserRepository(sampleUserData);
    currentUser = new User(users.users[0]);
    userSleep = new Sleep(currentUser, sampleSleepData, sampleUserData)
  });

  it('should be a function', () => {
    expect(Sleep).to.be.a('function')
  })

  it('should contain the userId and sleep data', () => {
    let currentUserSleepData = sampleSleepData.filter(datum => datum.userID === currentUser.id)

    expect(userSleep.userID).to.equal(1)
    expect(userSleep.userSleepData.length).to.equal(3)
    expect(userSleep.userSleepData).to.eql(currentUserSleepData)
  })

  it('should return a user\'s avg for hoursSlept', () => {
    let userLifetimeHoursSlept = userSleep.getLifetimeSleepAttAvg('hoursSlept');

    expect(userLifetimeHoursSlept).to.equal(6.07)
  })

  it('should return a user\'s avg for sleepQuality', () => {
    let userLifetimeHoursSlept = userSleep.getLifetimeSleepAttAvg('sleepQuality');

    expect(userLifetimeHoursSlept).to.equal(2.87)
  })

  it('should return a user\'s hoursSlept for a specific date', () => {
    let userDailySleepHours = userSleep.getSleepInfoForSpecificDate('2019/06/15')

    expect(userDailySleepHours).to.eql({
        "userID": 1,
        "date": "2019/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      })
  })

  it('should return a user\'s sleep info for a specific date', () => {
    let userSleepDay = userSleep.getSleepInfoForSpecificDate('2019/06/15')

    expect(userSleepDay).to.eql({
        "userID": 1,
        "date": "2019/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      })
  })

  it('should return a user\'s sleep info for a different date', () => {
    let userSleepDay = userSleep.getSleepInfoForSpecificDate('2019/06/16')

    expect(userSleepDay).to.eql({
      "userID": 1,
      "date": "2019/06/16",
      "hoursSlept": 4.1,
      "sleepQuality": 3.8
    })
  })

  it('should return a user\'s sleep info for a range of dates', () => {
    let userSleepRange = userSleep.getSleepInfoForRange('2019/06/15', '2019/06/17')

    expect(userSleepRange).to.eql([{
        "userID": 1,
        "date": "2019/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "hoursSlept": 4.1,
        "sleepQuality": 3.8
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "hoursSlept": 8,
        "sleepQuality": 2.6
      }])
  })

  it('should get the average sleep quality for all users', () => {
    let allUsersSleepQualityAvg = userSleep.getAllUsersAvgSleepQuality();

    expect(allUsersSleepQualityAvg).to.equal(3.35)
  })

  it('should get all users who average sleep quality of 3 for a range', () => {
    let usersWhoAvgOver3 = userSleep.getAllUsersSleepQualityAvgOver3('2019/06/15', '2019/06/17')

    expect(usersWhoAvgOver3).to.eql([{
      "id": 2,
      "name": "Billy Joel",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "PianoMaaan11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [
        9,
        18,
        24,
        19
      ]
    }])
  })

  it('should get the person who slept the most on a date', () => {
    let sleepWinner = userSleep.getSleepRecordForDate('2019/06/15');

    expect(sleepWinner).to.eql([{
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    }])
  })
});
