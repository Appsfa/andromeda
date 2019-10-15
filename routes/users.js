var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({})
    .then(result => {
      if (result.length) {
          res.status(200).json({
            user:result
          });
      }else {
          res.status(404).send('Aqui no hay usuarios');
      }
    })
    .catch(next)
});

router.post('/', (req, res, next) => {
  //SIGN UP
  const body = req.body;
  res.send(body);
  User.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Creacion de usuario exitosa",
              user: result
            })
          }else {
            next({
              message: "Cant create user",
              name: "Invalid"
            })
          }
        })
        .catch(next);
});

module.exports = router;
