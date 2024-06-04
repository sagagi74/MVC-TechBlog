const router = require('express').Router();
const { techpost } = require('../../models');
const withAuth = require('../../utils/auth');

// requires !req.session.logged_in WithAuth or it will go to /login
router.post('/', withAuth, async (req, res) => {
  try {
    // new tech post with the data from from the session user_id: req.session.user_id
    const newPost = await techpost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // success response 
    res.status(200).json(newPost);
  } catch (err) {
    // Send an error 
    res.status(400).json(err);
  }
});

// update a tech post by its ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update the tech post with the data
    const updatedPost = await techpost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

   
    if (!updatedPost[0]) {
      res.status(404).json({ message: 'Error finding post with this id!' });
      return;
    }

    // Send a success response 
    res.status(200).json(updatedPost);
  } catch (err) {
    // Send an error 
    res.status(500).json(err);
  }
});

// delete a tech post by its ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete the tech post where the ID matches
    const postData = await techpost.destroy({
      where: {
        id: req.params.id,
      },
    });

    
    if (!postData) {
      res.status(404).json({ message: 'Error finding post with this id!' });
      return;
    }

    // Send a success response 
    res.status(200).json(postData);
  } catch (err) {
    // Send an error response
    res.status(500).json(err);
  }
});

module.exports = router;
