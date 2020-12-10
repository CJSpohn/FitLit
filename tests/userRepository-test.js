const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const sampleData = require('../data/test-data');
const sampleUserData = sampleData.sampleUserData;

describe('UserRepository', function() {

  beforeEach(function() {
    const users = new UserRepository(sampleUserData);
  })

  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  })

})
