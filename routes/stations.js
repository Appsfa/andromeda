var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Station = require('../models/station');
const jwt = require('jsonwebtoken');

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

router.post('/', verifyToken, (req, res, next) => {
  //SIGN UP
  const body = req.body;
  // res.send(body);

  jwt.verify(
    req.token,
    'secretKey',
    (err, authData) => {
      console.log("Error de verify " + err);
      if (err) next(err);

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
      }
    )
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

/* GET user:id */
router.get('/state/:id', (req, res, next) =>{
  let id = req.params.id;
  Station.find({ state: id }).exec()
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
router.put('/:id', verifyToken, (req, res, next) =>{
    let id = req.params.id;
    let body = req.body;

    jwt.verify(
      req.token,
      'secretKey',
      (err, authData) => {
        console.log("Error de verify " + err);
        if (err) next(err);

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
        }
      )
});

/* DELETE user:id */
router.delete('/:id', verifyToken, (req, res, next) =>{
    let id = req.params.id;

    jwt.verify(
      req.token,
      'secretKey',
      (err, authData) => {
        console.log("Error de verify " + err);
        if (err) next(err);

        Station.findOneAndRemove({ station: id })
        .then(() => {
          res.status(204).json({});
        })
        .catch(next)
      }
    )
});

function verifyToken(req, res, next){
  console.log("Estoy en verifyToken");
  const bearerHeader = req.headers['authorization'];
  if(!bearerHeader){
    res.status(403).send('Sin acceso');
    return
  }

  else{
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
}

module.exports = router;
