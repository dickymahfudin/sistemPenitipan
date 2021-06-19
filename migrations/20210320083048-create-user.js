"use strict";
const faker = require("faker");
const moment = require("moment");
faker.locale = "id_ID";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      uid: {
        type: Sequelize.STRING,
      },
      expired: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      member: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // let dataFaker = [];
    // for (let i = 0; i < 10; i++) {
    //   const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    //   const address = `${faker.address.stateAbbr()}, ${faker.address.city()}, ${faker.address.zipCode()}`;
    //   const phone = faker.phone.phoneNumber();
    //   const expired = faker.date.between("2021-06-01", "2021-07-20");
    //   const uid = faker.random.alpha({ count: 10, upcase: true });
    //   const member = true;
    //   const createdAt = new Date();
    //   const updatedAt = new Date();
    //   dataFaker.push({
    //     name,
    //     address,
    //     phone,
    //     uid,
    //     member,
    //     expired,
    //     createdAt,
    //     updatedAt,
    //   });
    // }
    // await queryInterface.bulkInsert("users", dataFaker);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
