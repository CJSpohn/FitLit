const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const User = require('../src/User');
const Hydration = require('../src/Hydration')
const sampleData = require('../data/test-data');
const sampleUserData = sampleData.sampleUserData;
const sampleHydrationData = sampleData.sampleHydrationData;

describe('Hydration', () => {
  let users, currentUser, userHydration;

  beforeEach(function() {
    users = new UserRepository(sampleUserData);
    currentUser = new User(users.users[0]);
    userHydration = new Hydration(currentUser, sampleHydrationData)
  });

  it('should be a function', () => {
    expect(Hydration).to.be.a('function')
  })

  it('should contain the userId and hydration Data', () => {
    let currentUserHydrationData = sampleHydrationData.filter(datum => datum.userID === currentUser.id)

    expect(userHydration.userID).to.equal(1)
    expect(userHydration.userHydrationData.length).to.equal(3)
    expect(userHydration.userHydrationData).to.eql(currentUserHydrationData)
  })

  it('should return the average daily ounce consupmtion for the user', () => {
    let userHydrationAvg = userHydration.getLifetimeHydrationAvg()

    expect(userHydrationAvg).to.equal(67.33)
  })

  it('should return the average daily ounce consumption for a different user', () => {
    let anotherUser = new User(users.users[1])
    let anotherUserHydration = new Hydration(anotherUser, sampleHydrationData)
    let anotherUserHydrationAvg = anotherUserHydration.getLifetimeHydrationAvg()

    expect(anotherUserHydrationAvg).to.equal(87.33)
  })

  it('should return the ounces consumed for a specific date', () => {
    let dailyHydrationDate1 = userHydration.getHydrationForSpecificDate('2019/06/15');
    expect(dailyHydrationDate1).to.equal(37)

    let dailyHydrationDate2 = userHydration.getHydrationForSpecificDate('2019/06/16')
    expect(dailyHydrationDate2).to.equal(69)
  })

  it('should return hydration data for a range of dates', () => {
    let rangeHydration = userHydration.getHydrationDataForRange('2019/06/15', '2019/06/17');


    expect(rangeHydration).to.eql([{
         "date": "2019/06/15",
         "numOunces": 37,
         "userID": 1
       },
       {
         "date": "2019/06/16",
         "numOunces": 69,
         "userID": 1
       },
       {
        "date": "2019/06/17",
        "numOunces": 96,
         "userID": 1
       }])
  })

});
