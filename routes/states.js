var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Satate = require('../models/state');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Satate.find({})
    .then(result => {
      if (result.length) {
          res.status(200).json({
            state:result
          });
      }else {
          res.status(404).send('Aqui no hay estados');
      }
    })
    .catch(next)
});

router.post('/', (req, res, next) => {
  //SIGN UP
  const body = req.body;
  res.send(body);
  Satate.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Creacion de estado exitoso",
              state: result
            })
          }else {
            next({
              message: "Cant create state",
              name: "Invalid"
            })
          }
        })
        .catch(next);
});

/* GET user:id */
router.get('/:id', (req, res, next) =>{
  let id = req.params.id;
  Satate.findOne({ state: id }).exec()
      .then(result => {
        if(result){
          res.status(200).json({
            state: result
          });
        }
        else{
          res.status(404).send('Satate not found');
        }
      })
      .catch(next);
});

/* PUT user:id */
router.put('/:id', (req, res, next) =>{
    let id = req.params.id;
    let body = req.body;

    Satate.findOneAndUpdate({ state: id }, body, {new: true})
          .then(result => {
            if(result){
              res.status(200).json({
                state: result
              });
            }
            else{
              res.status(404).send('Cant update, missing state');
            }
          })
          .catch(next)
});

/* DELETE user:id */
router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    Satate.findOneAndRemove({ state: id })
        .then(() => {
          res.status(204).json({});
        })
        .catch(next)
});

module.exports = router;
