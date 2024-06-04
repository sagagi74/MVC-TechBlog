const router = require('express').Router();
const userRoutes = require('./userRoutes');
const techpostRoutes = require('./techpostRoutes');

router.use('/users', userRoutes);
router.use('/techposts', techpostRoutes);

module.exports = router;
