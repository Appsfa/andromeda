var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Satate = require('../models/state');
const jwt = require('jsonwebtoken');

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

      }
    )
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

/* GET user:id */
router.get('/country/:id', (req, res, next) =>{
  let id = req.params.id;
  Satate.find({ country: id }).exec()
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
router.put('/:id', verifyToken, (req, res, next) =>{
    let id = req.params.id;
    let body = req.body;

    jwt.verify(
      req.token,
      'secretKey',
      (err, authData) => {
        console.log("Error de verify " + err);
        if (err) next(err);

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

        Satate.findOneAndRemove({ state: id })
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
