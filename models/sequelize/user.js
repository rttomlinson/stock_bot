'use strict';
const bcrypt = require("bcrypt");



module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      validatePassword: function(password) {
        let hashedPassword = this.getDataValue("hashedPassword");
        return bcrypt.compareSync(password, hashedPassword);
      }
    }
  });
  User.beforeCreate(async function(user, options, done) {
    //hashedPassword will temporarily be the actual password
    let password = user.getDataValue("hashedPassword");
    let hashedPassword = await bcrypt.hash(password, 8);
    user.setDataValue("hashedPassword", hashedPassword);
    done(null, options);
  });


  return User;
};
