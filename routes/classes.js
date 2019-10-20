var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Classes = require('../models/class');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Classes.find({})
    .then(result => {
      if (result.length) {
          res.status(200).json({
            class:result
          });
      }else {
          res.status(404).send('Aqui no hay clases');
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

      Classes.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Creacion de clase exitoso",
              class: result
            })
          }else {
            next({
              message: "Cant create class",
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
  Classes.findOne( { className: id } ).exec()
      .then(result => {
        if(result){
          res.status(200).json({
            class: result
          });
        }
        else{
          res.status(404).send('Class not found');
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

        Classes.findOneAndUpdate({ className: id }, body, {new: true})
          .then(result => {
            if(result){
              res.status(200).json({
                class: result
              });
            }
            else{
              res.status(404).send('Cant update, missing class');
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

        Classes.findOneAndRemove( { className: id } )
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
