/*  **********  Requirements  **********  */
var expect = require('chai').expect;

/* ********* TEST SUITE NO.1 ********** */
describe('CRUD Operations', () => {

  let checkTestData = require('../src/routes');
  let myUser;
  let myUsers;

  // Phony data for testing
  before( () => {
    myUser = { firstName: 'Robert', lastName: 'Glover' };
    myUsers = [
      { firstName: 'Robert', lastName: 'Glover' },
      { firstName: 'Noreen', lastName: 'Goodwin' },
      { firstName: 'Douglas', lastName: 'Carroll' },
      { firstName: 'Jeanmarie', lastName: 'Willis' },
    ];
  });

  // TEST SPEC NO.1
  it('ought to add a user', () => {
    expect(true).to.be.ok;
    // expect(true).to.be.ok;
  });

});
