const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const planetsRouter = require('./routes/planets');
const countriesRouter = require('./routes/countries');
const statesRouter = require('./routes/states');
const stationsRouter = require('./routes/stations');
const flightsRouter = require('./routes/flights');
const additional_servicesRouter = require('./routes/additional_services');
const spaceshipsRouter = require('./routes/spaceships');
const servicesRouter = require('./routes/benefits');
const pricingsRouter = require('./routes/classes');
const statusRouter = require('./routes/status');
const seatsRouter = require('./routes/seats');
const spaceships_has_additional_servicesRouter = require('./routes/spaceships_has_additional_services');
const pricings_has_servicesRouter = require('./routes/benefits_has_classes');

mongoose.connect('mongodb://127.0.0.1:27017/andromedaDB',
  { useNewUrlParser: true, useUnifiedTopology: true}
);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/planets', planetsRouter);
app.use('/countries', countriesRouter);
app.use('/states', statesRouter);
app.use('/stations', stationsRouter);
app.use('/flights', flightsRouter);
app.use('/additional_services', additional_servicesRouter);
app.use('/spaceships', spaceshipsRouter);
app.use('/benefits', servicesRouter);
app.use('/classes', pricingsRouter);
app.use('/status', statusRouter);
app.use('/seats', seatsRouter);
app.use('/spaceships_has_additional_services', spaceships_has_additional_servicesRouter);
app.use('/benefits_has_classes', pricings_has_servicesRouter);

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  res.status(err.status || 500).json({ error: err })
}

app.get('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
});

module.exports = app;
