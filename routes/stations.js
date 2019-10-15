var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Station = require('../models/station');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Station.find({})
    .then(result => {
      if (result.length) {
          res.status(200).json({
            station:result
          });
      }else {
          res.status(404).send('Aqui no hay estaciones');
      }
    })
    .catch(next)
});

router.post('/', (req, res, next) => {
  //SIGN UP
  const body = req.body;
  res.send(body);
  Station.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Creacion de estación exitoso",
              station: result
            })
          }else {
            next({
              message: "Cant create station",
              name: "Invalid"
            })
          }
        })
        .catch(next);
});

/* GET user:id */
router.get('/:id', (req, res, next) =>{
  let id = req.params.id;
  Station.findOne({ station: id }).exec()
      .then(result => {
        if(result){
          res.status(200).json({
            station: result
          });
        }
        else{
          res.status(404).send('Station not found');
        }
      })
      .catch(next);
});

/* PUT user:id */
router.put('/:id', (req, res, next) =>{
    let id = req.params.id;
    let body = req.body;

    Station.findOneAndUpdate({ station: id }, body, {new: true})
          .then(result => {
            if(result){
              res.status(200).json({
                station: result
              });
            }
            else{
              res.status(404).send('Cant update, missing station');
            }
          })
          .catch(next)
});

/* DELETE user:id */
router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    Station.findOneAndRemove({ station: id })
        .then(() => {
          res.status(204).json({});
        })
        .catch(next)
});

module.exports = router;
