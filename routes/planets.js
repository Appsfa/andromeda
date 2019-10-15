var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Planet = require('../models/planet');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Planet.find({})
    .then(result => {
      if (result.length) {
          res.status(200).json({
            user:result
          });
      }else {
          res.status(404).send('Aqui no hay planetas');
      }
    })
    .catch(next)
});

router.post('/', function (req, res, next) {
  //SIGN UP
  const body = req.body;
  console.log(body);

  Planet.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Creacion de planeta exitosa",
              planet: result
            })
          }
          else {
            next({
              message: "Cant create user",
              name: "Invalid"
            })
          }
        })
        .catch(next);
});

module.exports = router;
