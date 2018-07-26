/*  **********  REQUIREMENTS  **********  */
const router   = require('express').Router();
const mongoose = require('mongoose');

// Use the data model
const User = mongoose.model('User');


/*  **********  ROUTES  **********  */

//  GET /profile/<id>
// router.get('/:userId', (req, res, next) => {
router.get('/', (req, res, next) => {
    if ( !req.session.userId ) {
    const err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }

  // const { userId } = req.params;
  User.findById(req.session.userId)
  .exec( (error, user) => {
    if ( error ) {
      return next(error);
    } else {
      user.password2 = user.password;
      res.render('profile', { title: 'Profile', user: user });
    }
  });
});

//  PUT /profile/id (update)
router.put('/', (req, res, next) => {
  // const { userId } = req.params;
  // User.findById(userId, (err, user) => {
  User.findById(req.session.userId, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Set the other values
    user.userName  = req.body.userName;
    user.firstName = req.body.firstName;
    user.lastName  = req.body.lastName;
    user.email     = req.body.email;
    user.password  = req.body.password;
 
    // Save the updates
    user.save( (err, savedUser) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedUser);
    })
  })
});


/*  **********  EXPORTS **********  */
module.exports = router;
