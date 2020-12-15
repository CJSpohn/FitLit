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
    userHydration = new Activity(currentUser, sampleActivityData, sampleUserData)
  });

  it('should be a function', () => {
    expect(Activity).to.be.a('function')
  })

});
