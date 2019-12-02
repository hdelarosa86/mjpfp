const path = require('path');
const express = require('express');
const app = express();
const chalk = require('chalk');
const PORT = 3000;
const { Task, syncAndSeed } = require('../db/models/Tasks');

// app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/src', express.static(path.join(__dirname, '../src')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.use(express.json());
app.get('/api/tasks', async (req,res,next) => {
  await Task.findAll().then( task => res.send(task)).catch(e => console.log(e));
});

app.post('/api/tasks', async (req,res,next) => {
  
  // const { year, month, date } = req.params;
  // console.log('Create Task for %s-%s-%s', year, month, date);
  // console.log(chalk.red(req.params));
  // console.log(req.body);
  await Task.create(req.body).then( () => Task.findAll()).then(task => res.send(task)).catch(e => console.log(e))
  })


syncAndSeed().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.green(`Listening on ${chalk.yellow(`http://localhost:${PORT}`)}`));
  });
});
