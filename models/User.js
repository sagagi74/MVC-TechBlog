const { Model, DataTypes } = require('sequelize');
//const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//class User extends Model {
  //checkPassword(loginPw) {
   // return bcrypt.compareSync(loginPw, this.password);
 // }
//}
//case sensitive issue


//user table details
class User extends Model {
  checkPassword(loginPw) {
    return loginPw === this.password;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7]
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
module.exports = User;
