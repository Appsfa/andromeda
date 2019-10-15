const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const planetsRouter = require('./routes/planets');

mongoose.connect('mongodb://127.0.0.1:27017/andromedaDB',
  { useNewUrlParser: true, useUnifiedTopology: true}
);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/planets', planetsRouter);
app.get('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
});

module.exports = app;
