/*  **********  REQUIREMENTS  **********  */
const router   = require('express').Router();
const mongoose = require('mongoose');


/*  **********  ROUTES  **********  */

// GET /signup
router.get('/', (req, res, next) => {
  res.render('signup', { title: 'Sign Up', user: {} });
});

// ***** Create
router.post('/user', (req, res, next) => {
  
  // Use the data model
  const User = mongoose.model('User');

  // Set userData object
  // const {userData } = req.body; This doesn't work!
  const userData =	{
    userName:   req.body.userName,
    firstName:  req.body.firstName,
    lastName:   req.body.lastName,
    email:      req.body.email,
    password:   req.body.password
  };
  
  // Add the new user to the database
  User.create(userData, function(err, newUser) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(newUser);
  });
});

/*  **********  EXPORTS **********  */
module.exports = router;
