// Import modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// database configuration and routes import
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Initialize the Express 
const app = express();
const PORT = process.env.PORT || 3001;

//  custom helpers for time
const hbs = exphbs.create({ helpers });

// Configure session middleware and Sequelize store
const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use session 
app.use(session(sess));

// Set Handlebars.js as the layout engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes defined 
app.use(routes);

// Sync the Sequelize models 
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
