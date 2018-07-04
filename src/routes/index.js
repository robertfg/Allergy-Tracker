/*  **********  REQUIREMENTS  **********  */
const router = require('express').Router();

// Phony data for testing
myUsers = [
  { id: 'a', firstName: 'Robert',    lastName: 'Glover',  email: 'robert_f_g@hotmail.com' },
  { id: 'b', firstName: 'Noreen',    lastName: 'Goodwin', email: 'noreen.goodwin@somewhere.com' },
  { id: 'c', firstName: 'Douglas',   lastName: 'Carroll', email: 'doug.carroll@nowhere.com' },
  { id: 'd', firstName: 'Jeanmarie', lastName: 'Willis',  email: 'jwillis@anywhere.com' }
];

// Simple router
router.get('/', (req, res, next) => {
  console.log('main page');
  res.end("This is the main page.");
});

router.get('/about', (req, res, next) => {
  console.log('about');
  res.end("This is the about page.");
});

router.get('/blog', (req, res, next) => {
  console.log('blog');
  res.end("This is my first blog post.");
}); 

router.get('/faqs', (req, res, next) => {
  console.log('faqs   ');
  res.end("This is the FAQs page.");
});

/*  **********  CRUD OPERATIONS  **********  */

// Create
router.post('/user', (req, res, next) => {
  const data = req.body;
  console.log("POST DATA", data);
  res.end('Create a new user');
});

// Read
router.get('/user/:userId', (req, res, next) => {
  const { userId } = req.params;
  const user = myUsers.find(entry => entry.id === userId);
  if ( !user ) {
    return res.status(404).end(`Could not find user '${userId}'`);
  }

  res.json(user);
});

// Update
router.put('/user/:userId', (req, res, next) => {
  const data = req.body;
  console.log("PUT DATA", data);
  res.end(`Updating user '${req.params.userId}'`);
});

// Delete
router.delete('/user/:userId', (req, res, next) => {
  res.end(`Deleting user '${req.params.userId}'`);
});

// List
router.get('/user', (req, res, next) => {
  res.json(myUsers);
  // res.end('List all users');
});

/*  **********  EXPORTS **********  */
module.exports = router;
