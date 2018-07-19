/*  **********  REQUIREMENTS  **********  */
const router   = require('express').Router();
const mongoose = require('mongoose');

// Use the data model
const User = mongoose.model('User');


/*  **********  ROUTES  **********  */

// GET /admin (list)
router.get('/', (req, res, next) => {
  User.find({deleted: {$ne: true}}, (err, users) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  res.json(users);
  // res.render('admin', { title: 'Admin' });
  });
});


//  DELETE /admin/id
router.delete('/:userId', (req, res, next) => {

  // Deconstruct the userId from the parameters: /api/user/<user._id>
  const { userId } = req.params;
  
  // Get the user
  User.findById(userId, function(err, user) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!user) {
      return res.status(404).json({message: "File not found."});
    }

    // Set the deleted field to true
    user.deleted = true;

    // Save the updates, i.e., mark as "deleted"
    user.save(function(err, doomedUser) {
      res.json(doomedUser);
    })
  })
});

/*  **********  EXPORTS **********  */
module.exports = router;
