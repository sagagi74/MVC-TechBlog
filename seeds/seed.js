const sequelize = require('../config/connection');
const { User, TechPost, Comment } = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');

const userData = JSON.parse(fs.readFileSync('./seeds/userdata.json', 'utf8'));
const postData = JSON.parse(fs.readFileSync('./seeds/techpostdata.json', 'utf8'));
const commentData = JSON.parse(fs.readFileSync('./seeds/commentData.json', 'utf8'));

const hashPasswords = async (users) => {
  return Promise.all(users.map(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
    return user;
  }));
};

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const hashedUsers = await hashPasswords(userData);

  await User.bulkCreate(hashedUsers, {
    returning: true,
  });

  await TechPost.bulkCreate(postData, {
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
