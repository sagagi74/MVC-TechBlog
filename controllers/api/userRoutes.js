const router = require('express').Router();
const { User } = require('../../models');

// Logging routes in a user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'username can not be found!' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);
    
    if (!validPassword) {
      res.status(400).json({ message: 'password is incorrect!' });
      return;
    }

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
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// Signing up a new user
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.json({ user: newUser, message: 'Sign-up successful and logged in!' });
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ message: 'Unable to sign up. Please try again later.', error: err.message });
  }
});

module.exports = router;
