const Sequelize = require('sequelize');
const { conn } = require('../conn.js');
const chalk = require('chalk');

const { STRING, INTEGER, BOOLEAN } = Sequelize;

const Task = conn.define('task', {
  name: {
    type: STRING,
    allowNull: false,
  },
  year: {
    type: INTEGER,
    allowNull: false,
  },
  month: {
    type: INTEGER,
    allowNull: false,
  },
  day: {
    type: INTEGER,
    allowNull: false,
  },
  completed: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

const syncAndSeed = async () => {
  try {
    await conn.sync({
      force: true,
    });
    await Promise.all([
      Task.create({ name: 'Testtask1', year: 2019, month: 12, day: 28 }),
      Task.create({ name: 'Testtask2', year: 2019, month: 12, day: 29 }),
      Task.create({ name: 'Testtask3', year: 2019, month: 11, day: 28 }),
      Task.create({ name: 'Testtask4', year: 2019, month: 12, day: 28 }),
    ]);
  } catch (err) {
    console.log(chalk.red(err, err.message));
  }
};
module.exports = { syncAndSeed, Task };
