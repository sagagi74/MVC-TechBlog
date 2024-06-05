const sequelize = require('../config/connection');
const { User, TechPost } = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');

//user data and tech post data from JSON files
const userData = JSON.parse(fs.readFileSync('./seeds/userdata.json', 'utf8'));
const postData = JSON.parse(fs.readFileSync('./seeds/techpostdata.json', 'utf8'));

//hash passwords for users
const hashPasswords = async (users) => {
  return Promise.all(users.map(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
    return user;
  }));
};

// Seed user and tech post data
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Hash passwords 
  const hashedUsers = await hashPasswords(userData);


  await User.bulkCreate(hashedUsers, {
    returning: true,
  });

  // Create tech posts
  for (const post of postData) {
    await TechPost.create(post);
  }

  process.exit(0);
};


seedDatabase();
