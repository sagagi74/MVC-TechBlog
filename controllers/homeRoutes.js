const router = require('express').Router();
const { TechPost, User } = require('../models');
const withAuth = require('../utils/auth');

// Route the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Render the signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

// Route the homepage with all tech posts
router.get('/', async (req, res) => {
  try {
     // Find all tech posts
    const postData = await TechPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    // Serialize data 
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await TechPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route the new post page
router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post', {
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
