const express = require('express');
const carRouter = express.Router();
const cars = require('./data');

carRouter.get('/', (req, res) => {
  res.json(cars);
});

const validationMiddleware = (req, res, next) => {
  const validateParam = req.query.validate;

  if (validateParam === 'true') {
    next();
  } else {
    res.status(403).json({ error: 'Validation failed' });
  }
};

carRouter.get('/:id', validationMiddleware, (req, res) => {
  const carId = parseInt(req.params.id);

  const car = cars.find(car => car.id === carId);

  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ error: 'Car not found' });
  }
});


module.exports = carRouter;
