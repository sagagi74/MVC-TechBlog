const sequelize = require('../config/connection');
const { User, TechPost } = require('../models');
const fs = require('fs');

const userData = JSON.parse(fs.readFileSync('./seeds/userdata.json', 'utf8'));
const postData = JSON.parse(fs.readFileSync('./seeds/techpostdata.json', 'utf8'));

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await TechPost.create(post);
  }

  process.exit(0);
};

seedDatabase();
