const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const sampleData = require('../data/test-data');
const sampleUserData = sampleData.sampleUserData;

describe('UserRepository', () => {
  let users;

  beforeEach(function() {
    users = new UserRepository(sampleUserData);
  })

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  })

  it('should contain a list of users', () => {
    expect(users.users.length).to.equal(2);
    expect(users.users).to.eql(sampleUserData)
  })

  it('should be able to return a specific user', () => {
    let user1 = users.getUserData(1)
    let user2 = users.getUserData(2)

    expect(user1).to.eql(sampleUserData[0])
    expect(user2).to.eql(sampleUserData[1])
  })

  it('should be able to return an average step goal for all users', () => {
    let avgStepGoal = users.getAvgStepGoal()

    expect(avgStepGoal).to.equal(7500)
  })


})
