/*  **********  REQUIREMENTS  **********  */
const router   = require('express').Router();
const mongoose = require('mongoose');

// Use the data model
const User = mongoose.model('User');


/*  **********  ROUTES  **********  */

// GET /admin (list)
router.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  res.render('admin', { title: 'Administator', users: users });
  });
});

//  PUT /admin/id (toggle deleted field)
router.put('/:userId', (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    // *********  NEED TO CHECK DELETED FLAG
    if (!user) {
      return res.status(404).json({message: "User not found."});
    }

    // Set the deleted field to true
    if ( user.deleted === true ) {
      user.deleted = false;
    } else {
      user.deleted = true;
    }

    // Save the updates, i.e., mark as "deleted"
    user.save((err, doomedUser) => res.json(doomedUser));
  })
});

// DELETE /admin
router.delete('/:userId', (req, res, next) => {
  const { userId } = req.params;

  // Delete the user
  User.deleteOne({ "_id": userId }, err => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
});


/*  **********  EXPORTS **********  */
module.exports = router;
