const sequelize = require('../config/connection');
const { User, TechPost } = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Read user data and tech post data from JSON files
const userData = JSON.parse(fs.readFileSync('./seeds/userdata.json', 'utf8'));
const postData = JSON.parse(fs.readFileSync('./seeds/techpostdata.json', 'utf8'));

// Function to hash passwords
const hashPasswords = async (users) => {
  return Promise.all(users.map(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
    return user;
  }));
};

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Hash passwords before bulk create
  const hashedUsers = await hashPasswords(userData);

  const users = await User.bulkCreate(hashedUsers, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await TechPost.create(post);
  }

  process.exit(0);
};

seedDatabase();
