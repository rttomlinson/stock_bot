'use strict';


module.exports = function(sequelize, DataTypes) {
  var Purse = sequelize.define('Purse', {
    user_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Purse.belongsTo(models.User, {
          foreignKey: "user_id"
        });
      }
    }
  });
  return Purse;
};
