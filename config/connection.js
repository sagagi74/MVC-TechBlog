const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
// Check if the JAWSDB_URL
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is exist, create a new Sequelize instance
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    //or use.env configuration
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: console.log, // Optional: for debugging connection issues, using this I found case sensitive name issues
    }
  );
}

module.exports = sequelize;