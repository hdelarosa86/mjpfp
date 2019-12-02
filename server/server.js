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
app.get('/api/tasks', async (req, res, next) => {
  await Task.findAll()
    .then(task => res.send(task))
    .catch(e => console.log(e));
});

app.post('/api/tasks', async (req, res, next) => {
  await Task.create(req.body)
    .then(() => Task.findAll())
    .then(task => {
      res.statusCode = 200;
      res.send(task);
    })
    .catch(e => console.log(e));
});

app.put('/api/tasks/:id', async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;
  await Task.findByPk(id)
    .then(task => {
      task.update({ name });
      res.statusCode = 200;
      res.send(task);
    })
    .catch(err => console.log(err));
});

app.delete('/api/tasks/:id', async (req, res, next) => {
  const id = req.params.id;
  await Task.destroy({
    where: {
      id,
    },
  })
    .then(task => {
      res.statusCode = 200;
      res.send(task);
    })
    .catch(err => console.log(err));
});

syncAndSeed().then(() => {
  app.listen(PORT, () => {
    console.log(
      chalk.green(`Listening on ${chalk.yellow(`http://localhost:${PORT}`)}`)
    );
  });
});
