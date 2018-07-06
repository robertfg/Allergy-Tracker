/*  **********  REQUIREMENTS  **********  */
const router   = require('express').Router();
const mongoose = require('mongoose');

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

// ***** Create
router.post('/user', (req, res, next) => {
  // Use the data model
  const User = mongoose.model('User');

  // Set userData object
  // const {userData } = req.body; This doesn't work!
  const userData =	{
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
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
    user.firstName = req.body.firstName;
    user.lastName  = req.body.lastName;
    user.email     = req.body.email;
 
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
  User.findById(userId, function(err, user) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!user) {
      return res.status(404).json({message: "File not found"});
    }

    // Set the deleted field to true
    user.deleted = true;

    // Save the updates, i.e., mark as "deleted"
    user.save(function(err, doomedUser) {
      res.json(doomedUser);
    })
  })
});

// List
router.get('/user', (req, res, next) => {
  mongoose.model('User').find( { deleted: {$ne: true} }, (err, users) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  
  res.json(users);
  });
});

/*  **********  EXPORTS **********  */
module.exports = router;
