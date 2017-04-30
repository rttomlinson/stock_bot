'use strict';

const _ = require("underscore");
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/sequelize.js')[env];
var db = {};


module.exports = function(wagner) {

  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
  }
  else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
      var model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });



  Object.keys(db).forEach(function(modelName) {
    //call associate functions
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  //check value of wagner for seeding files
  if (wagner === 'seeds') {
    db.sequelize = sequelize;
    db.Sequelize = sequelize;
    return db;
  }

  //get keys of db models again
  //add model names to wagner
  let models = Object.keys(db);
  _.each(models, function(model) {
    wagner.factory(model, function() {
      return db[model];
    });
  });



  wagner.factory("db", function() {
    return db;
  });
  wagner.factory("sequelize", function() {
    return sequelize;
  });
  wagner.factory("Sequlize", function() {
    return Sequelize;
  });


};
