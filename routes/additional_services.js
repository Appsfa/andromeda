var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Additional_service = require('../models/additional_service');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Additional_service.find({})
    .then(result => {
      if (result.length) {
          res.status(200).json({
            additional_service:result
          });
      }else {
          res.status(404).send('Aqui no hay servicios adiciones');
      }
    })
    .catch(next)
});

router.post('/', (req, res, next) => {
  //SIGN UP
  const body = req.body;
  res.send(body);
  Additional_service.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Creacion de servicio adicional exitoso",
              additional_service: result
            })
          }else {
            next({
              message: "Cant create additional service",
              name: "Invalid"
            })
          }
        })
        .catch(next);
});

/* GET user:id */
router.get('/:id', (req, res, next) =>{
  let id = req.params.id;
  Additional_service.findOne({ nameService: id }).exec()
      .then(result => {
        if(result){
          res.status(200).json({
            additional_service: result
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

    Additional_service.findOneAndUpdate({ nameService: id }, body, {new: true})
          .then(result => {
            if(result){
              res.status(200).json({
                additional_service: result
              });
            }
            else{
              res.status(404).send('Cant update, missing additional service');
            }
          })
          .catch(next)
});

/* DELETE user:id */
router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    Additional_service.findOneAndRemove({ nameService: id })
        .then(() => {
          res.status(204).json({});
        })
        .catch(next)
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
