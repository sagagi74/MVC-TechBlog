const router = require('express').Router();
const { techpost, user } = require('../models');

// Route to get all tech posts
router.get('/', async (req, res) => {
  try {
    // Fetch all tech posts with user data
    const postData = await techpost.findAll({
      include: [
        {
          model: user,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data 
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage with the posts data and logged_in status
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
   
    res.status(500).json(err);
  }
});

// render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the /
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // Render the login 
  res.render('login');
});

module.exports = router;

