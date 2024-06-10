//const User = require('./User');
//const TechPost = require('./TechPost');

//User.hasMany(TechPost, {
  //foreignKey: 'user_id'
//});

//TechPost.belongsTo(User, {
 // foreignKey: 'user_id'
//});

//module.exports = { User, TechPost };

const User = require('./User');
const TechPost = require('./TechPost');
const Comment = require('./Comment');

User.hasMany(TechPost, {
  foreignKey: 'user_id'
});

TechPost.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

TechPost.hasMany(Comment, {
  foreignKey: 'techpost_id'
});

Comment.belongsTo(TechPost, {
  foreignKey: 'techpost_id'
});

module.exports = { User, TechPost, Comment };

