const Sequelize = require('sequelize');
const { conn } = require('../conn.js');
const chalk = require('chalk');

const { STRING } = Sequelize;

const Task = conn.define('task', {
  name: {
    type: STRING,
    allowNull: false,
  },
});

const syncAndSeed = async () => {
  try {
    await conn.sync({
      force: true,
    });
    await Promise.all([
      Task.create({ name: 'Testtask1' }),
      Task.create({ name: 'Testtask2' }),
    ]);
  } catch (err) {
    console.log(chalk.red(err, err.message));
  }
};
module.exports = { syncAndSeed, Task };
