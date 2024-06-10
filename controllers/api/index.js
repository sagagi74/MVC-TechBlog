const router = require('express').Router();
const userRoutes = require('./userRoutes');
const techpostRoutes = require('./techpostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/techposts', techpostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
