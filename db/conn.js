const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost:5432/calendar'); //leave logging true for now
//change it later it false

module.exports = { conn };
