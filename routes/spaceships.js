var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Spaceship = require('../models/spaceship');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Spaceship.find({})
    .then(result => {
      if (result.length) {
          res.status(200).json({
            Spaceship:result
          });
      }else {
          res.status(404).send('Aqui no hay naves espaciales');
      }
    })
    .catch(next)
});

router.post('/', (req, res, next) => {
  //SIGN UP
  const body = req.body;
  res.send(body);
  Spaceship.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Creacion de nave espacial exitoso",
              Spaceship: result
            })
          }else {
            next({
              message: "Cant create Spaceship",
              name: "Invalid"
            })
          }
        })
        .catch(next);
});

/* GET user:id */
router.get('/:id', (req, res, next) =>{
  let id = req.params.id;
  Spaceship.findById( id ).exec()
      .then(result => {
        if(result){
          res.status(200).json({
            Spaceship: result
          });
        }
        else{
          res.status(404).send('Planet not found');
        }
      })
      .catch(next);
});

/* PUT user:id */
router.put('/:id', (req, res, next) =>{
    let id = req.params.id;
    let body = req.body;

    Spaceship.findByIdAndUpdate(id, body, {new: true})
          .then(result => {
            if(result){
              res.status(200).json({
                Spaceship: result
              });
            }
            else{
              res.status(404).send('Cant update, missing Spaceship');
            }
          })
          .catch(next)
});

/* DELETE user:id */
router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    Spaceship.findByIdAndRemove( id )
        .then(() => {
          res.status(204).json({});
        })
        .catch(next)
});

function verifyToken(req, res, next){
  console.log("Estoy en verifyToken");
  const bearerHeader = req.headers['authorization'];
  let token = bearerHeader.split(' ');
  if(token && token[1]){
    req.token = token[1];
    next();
  } else {
    next({
      message: "Invalid token",
      name: "Forbidden"
    });
  }
}

module.exports = router;
