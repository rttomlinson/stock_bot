'use strict';
const models = require('../../models/sequelize');
const User = models.User;
module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return User.create({
      email: "admin@admin.com",
      hashedPassword: "admin",
      token: ""
    });
    // return queryInterface.bulkInsert("Users", [{
    //   email: "admin@admin.com",
    //   hashedPassword: "admin",
    //   token: ""
    // }], {});

  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    return queryInterface.bulkDelete('Users', null, {}, models.User);

  }
};
