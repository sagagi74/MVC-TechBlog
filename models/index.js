const User = require('./User');
const TechPost = require('./TechPost');

User.hasMany(TechPost, {
  foreignKey: 'user_id'
});

TechPost.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, TechPost };
