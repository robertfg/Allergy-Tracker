/*  **********  REQUIREMENTS  **********  */
const router   = require('express').Router();
const mongoose = require('mongoose');

// Use the data model
const User = mongoose.model('User');


/*  **********  ROUTES  **********  */

// GET /login
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Log In' });
});

// POST /login
router.post('/', (req, res, next) => {
  // Validate data
  if ( req.body.username  &&  req.body.password ) {
    User.authenticate(req.body.username, req.body.password, (error, user) => {
      if ( error  ||  !user ) {
        const err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        // Create session and cookie
        req.session.userId = user._id;

        // Redirect to profile page
        return res.redirect('/');
      }
    });
  } else {
    const err = new Error('Username and password required.');
    err.status = 401;
    return next(err);
  }
});


/*  **********  EXPORTS **********  */
module.exports = router;
