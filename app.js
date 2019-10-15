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
// const stationsRouter = require('./routes/stations');
// const flightsRouter = require('./routes/flights');
// const additional_servicesRouter = require('./routes/additional_services');
// const spaceshipsRouter = require('./routes/spaceships');
// const servicesRouter = require('./routes/services');
// const pricingsRouter = require('./routes/pricings');
// const spaceships_has_additional_servicesRouter = require('./routes/spaceships_has_additional_services');
// const pricings_has_servicesRouter = require('./routes/pricings_has_services');

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
app.use('/countries', countriesRouter);
app.use('/states', statesRouter);
// app.use('/stations', stationsRouter);
// app.use('/flights', flightsRouter);
// app.use('/additional_services', additional_servicesRouter);
// app.use('/spaceships', spaceshipsRouter);
// app.use('/services', servicesRouter);
// app.use('/pricings', pricingsRouter);
// app.use('/spaceships_has_additional_services', spaceships_has_additional_servicesRouter);
// app.use('/pricings_has_services', pricings_has_servicesRouter);
app.get('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
});

module.exports = app;
