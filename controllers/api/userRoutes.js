const router = require('express').Router();
const { user } = require('../../models');

// logging in a user
router.post('/login', async (req, res) => {
  try {
    // Find the user by username
    const userData = await user.findOne({ where: { username: req.body.username } });

    // If the user is not found
    if (!userData) {
      res.status(400).json({ message: 'username can not be found!' });
      return;
    }

    // Check password is correct
    const validPassword = await userData.checkPassword(req.body.password);

    // send an error response if password is incorrect
    if (!validPassword) {
      res.status(400).json({ message: 'password is incorrect!' });
      return;
    }

    // the user session logged_in = true if everhing is passed.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'logged in successfully!' });
    });
  } catch (err) {
  
    res.status(400).json(err);
  }
});

// Route for logging out a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy  user session 
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {

    res.status(404).end();
  }
});

module.exports = router;
