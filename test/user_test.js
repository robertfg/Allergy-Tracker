/*  **********  Requirements  **********  */
const expect = require('chai').expect;

/* ********* TEST SUITE NO.1 ********** */
describe('CRUD Operations', () => {

  const checkTestData = require('../src/routes');

  // Phony data for testing
  before( () => {
    const myUser = {
      id:         'a',
      firstName:  'Robert',
      lastName:   'Glover',
      email:      'robert_f_g@hotmail.com'
    };
    const myUsers = [
      { id: 'a', firstName: 'Robert',    lastName: 'Glover',  email: 'robert_f_g@hotmail.com' },
      { id: 'b', firstName: 'Noreen',    lastName: 'Goodwin', email: 'noreen.goodwin@somewhere.com' },
      { id: 'c', firstName: 'Douglas',   lastName: 'Carroll', email: 'doug.carroll@nowhere.com' },
      { id: 'd', firstName: 'Jeanmarie', lastName: 'Willis',  email: 'jwillis@anywhere.com' }
    ];
  });

  // TEST SPEC NO.1
  it('ought to list a user', () => {
    expect( fetch('/myUser') ).to.be.ok;
    // expect(true).to.be.ok;
  });

});
