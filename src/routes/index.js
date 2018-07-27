/*  **********  REQUIREMENTS  **********  */
const router   = require('express').Router();


/*  **********  CRUD OPERATIONS  **********  */

// ***** Create
router.post('/user', (req, res, next) => {
  // Use the data model
  const User = mongoose.model('User');

  // Set userData object
  // const {userData } = req.body; This doesn't work!
  const userData =	{
    firstName:  req.body.firstName,
    lastName:   req.body.lastName,
    email:      req.body.email
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

// ***** Read: /user/<id>
router.get('/user/:userId', (req, res, next) => {
  const { userId } = req.params;
  const user = myUsers.find(entry => entry.id === userId);
  if ( !user ) {
    return res.status(404).end(`Could not find user '${userId}'`);
  }
  res.json(user);
});

// ***** Update
router.put('/user/:userId', (req, res, next) => {
  // Use the data model
  const User = mongoose.model('User');

  // Deconstruct the userId from the parameters: /api/user/<user._id>
  const { userId } = req.params;
  
  // Get the user
  User.findById(userId, function(err, user) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
  
    // Set the other values
    user.firstName  = req.body.firstName;
    user.lastName   = req.body.lastName;
    user.email      = req.body.email;
 
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

router.put('/toggle/user/:userId', (req, res, next) => {
  // Use the data model
  const User = mongoose.model('User');

  // Deconstruct the userId from the parameters: /api/user/<user._id>
  const { userId } = req.params;
  
  // Get the user
  User.findById(userId, function(err, user) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
  
    // Set the other values
    user.deleted = user.deleted ? 0 : 1;
 
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


// Delete
router.delete('/user/:userId', (req, res, next) => {
  // Use the data model
  const User = mongoose.model('User');

  // Deconstruct the userId from the parameters: /api/user/<user._id>
  const { userId } = req.params;
  
  // Get the user
  User.findById(userId, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!user) {
      return res.status(404).json({message: "User not found."});
    }

    // Delete the user.
    User.deleteOne( { "_id": userId }, err => res.json(user) );
    // user.deleteOne( (err, doomedUser) => res.json(doomedUser) );
  })
});

// List
router.get('/user', (req, res, next) => {
  mongoose.model('User').find( { }, (err, users) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  
  res.json(users);
  });
});


/*  **********  EXPORTS **********  */
module.exports = router;
