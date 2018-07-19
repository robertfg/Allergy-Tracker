/*  **********  REQUIREMENTS  **********  */
const router   = require('express').Router();
const mongoose = require('mongoose');

// Use the data model
const User = mongoose.model('User');


/*  **********  ROUTES  **********  */

//  GET /profile/<id>
router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  // const user = myUsers.find(entry => entry.id === userId);
  // if ( !user ) {
  //   return res.status(404).end(`Could not find user '${userId}'`);
  // }
  // res.json(user);
  // res.render('profile', { title: 'Profile' });

  // if ( !req.session.userId ) {
  if ( !userId ) {
    const err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }

  // Find the user in Mongo
  // User.findById(req.session.userId)
  User.find({ "userName": userId })
  .exec( function(error, user) {
    if ( error ) {
      return next(error);
    } else {
      // res.json(user);
      res.render('profile', { title: 'Profile' });
    }
  });
});

//  PUT /profile/id (update)
router.put('/:userId', (req, res, next) => {
  const { userId } = req.params;
  
  // Get the user
  User.findById(userId, function(err, user) {
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
    user.save(function(err, savedUser) {
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
