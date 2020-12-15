const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const User = require('../src/User');
const sampleData = require('../data/test-data');
const sampleUserData = sampleData.sampleUserData;

describe('User', () => {
  let users, currentUser;

  beforeEach(function() {
    users = new UserRepository(sampleUserData);
  })

  it('should be a function', () => {
    expect(User).to.be.a('function');
  })

  it('should contain specific information for a user', () => {
    let currentUser = new User(users.users[0])
    expect(currentUser.id).to.equal(1)
    expect(currentUser.name).to.equal('Bob Ross')
    expect(currentUser.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697')
    expect(currentUser.email).to.equal('B.Ross.TheBoss1@hotmail.com')
    expect(currentUser.strideLength).to.equal(4.3)
    expect(currentUser.dailyStepGoal).to.equal(10000)
    expect(currentUser.friends).to.eql([16, 4, 8])
  })

  it('should be able to return the user\'s first name', () => {
    let currentUser = new User(users.users[0])
    let userFirstName = currentUser.getUserFirstName()
    expect(userFirstName).to.equal('Bob')
  })

  it('should be able to return a different user\'s first name', () => {
    let currentUser = new User(users.users[1])
    let userFirstName = currentUser.getUserFirstName()
    expect(userFirstName).to.equal('Billy')
  })

})
