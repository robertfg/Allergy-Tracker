/*  **********  REQUIREMENTS  **********  */
const router   = require('express').Router();
const mongoose = require('mongoose');

// Use the data model
const User = mongoose.model('User');


/*  **********  ROUTES  **********  */

// GET /signup
router.get('/', (req, res, next) => {
  res.render('signup', { title: 'Sign Up', user: {} });
});

// POST /signup  ***** Create
router.post('/', (req, res, next) => {

  // Set user data
  const userData =	{
    userName:   req.body.userName,
    firstName:  req.body.firstName,
    lastName:   req.body.lastName,
    email:      req.body.email,
    password:   req.body.password
  };

  // // Add the new user to the database
  User.create(userData, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    // Create session and cookie
    req.session.userId = user._id;

    // Redirect to profile page -> automatically logged in
    return res.redirect('/');
  });
});


/*  **********  EXPORTS **********  */
module.exports = router;
