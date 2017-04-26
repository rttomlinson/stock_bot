'use strict';
module.exports = function(sequelize, DataTypes) {
  var Prediction = sequelize.define('Prediction', {
    prediction: DataTypes.BOOLEAN,
    company_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Prediction.belongsTo(models.Company, {
          foreignKey: "company_id"
        });
      }
    }
  });
  return Prediction;
};
