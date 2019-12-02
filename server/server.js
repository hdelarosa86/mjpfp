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

app.get('/api/:year/:month/:date', (req,res,next) => {
  res.send('Hello');
});

app.post('/', async(req,res,next) => {
   await Task.create(req.body).send();
})


syncAndSeed().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.green(`Listening on ${chalk.yellow(`http://localhost:${PORT}`)}`));
  });
});
