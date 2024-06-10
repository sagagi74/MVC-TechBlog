const router = require('express').Router();
const { TechPost } = require('../../models');
//if login in not true it sill direct to login page
const withAuth = require('../../utils/auth');

// delete a tech post by its ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await TechPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post associated with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//new tech post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await TechPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
//update an existing tech post by its ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await TechPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post associated with this id!' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Post a comment on a blog post
router.post('/:id/comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      techpost_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});







module.exports = router;
