var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Country = require('../models/country');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Country.find({})
    .then(result => {
      if (result.length) {
          res.status(200).json({
            country:result
          });
      }else {
          res.status(404).send('Aqui no hay paises');
      }
    })
    .catch(next)
});

router.post('/', (req, res, next) => {
  //SIGN UP
  const body = req.body;
  res.send(body);
  Country.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Creacion de país exitoso",
              country: result
            })
          }else {
            next({
              message: "Cant country user",
              country: "Invalid"
            })
          }
        })
        .catch(next);
});

/* GET user:id */
router.get('/:id', (req, res, next) =>{
  let id = req.params.id;
  Country.findOne({ country: id }).exec()
      .then(result => {
        if(result){
          res.status(200).json({
            country: result
          });
        }
        else{
          res.status(404).send('Country not found');
        }
      })
      .catch(next);
});

/* PUT user:id */
router.put('/:id', (req, res, next) =>{
    let id = req.params.id;
    let body = req.body;

    Country.findOneAndUpdate({ country: id }, body, {new: true})
          .then(result => {
            if(result){
              res.status(200).json({
                country: result
              });
            }
            else{
              res.status(404).send('Cant update, missing country');
            }
          })
          .catch(next)
});

/* DELETE user:id */
router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    Country.findOneAndRemove({ country: id })
        .then(() => {
          res.status(204).json({});
        })
        .catch(next)
});

module.exports = router;
