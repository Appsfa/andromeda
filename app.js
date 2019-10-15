const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const planetsRouter = require('./routes/planets');
const countriesRouter = require('./routes/countries');
const stationsRouter = require('./routes/stations');
const flightsRouter = require('./routes/flights');
const additional_servicesRouter = require('./routes/additional_services');
const spaceshipsRouter = require('./routes/spaceships');
const servicesRouter = require('./routes/services');
const pricingsRouter = require('./routes/pricings');
const spaceships_has_additional_servicesRouter = require('./routes/spaceships_has_additional_services');
const pricings_has_servicesRouter = require('./routes/pricings_has_services');

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
app.use('/countries', planetsRouter);
app.use('/stations', planetsRouter);
app.use('/flights', planetsRouter);
app.use('/additional_services', planetsRouter);
app.use('/spaceships', planetsRouter);
app.use('/services', planetsRouter);
app.use('/pricings', planetsRouter);
app.use('/spaceships_has_additional_services', planetsRouter);
app.use('/pricings_has_services', planetsRouter);
app.get('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
});

module.exports = app;
