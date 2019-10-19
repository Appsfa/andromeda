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
  // res.send(body);
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
              name: "Invalid",
              status: 403
            })
          }
        })
        .catch(next);
});

/* GET user:id */
router.get('/:id', (req, res, next) =>{
  let id = req.params.id;
  User.findOne({ username: id }).exec()
      .then(result => {
        if(result){
          res.status(200).json({
            user: result
          });
        }
        else{
          res.status(404).send('User not found');
        }
      })
      .catch(next);
});

/* PUT user:id */
router.put('/:id', (req, res, next) =>{
    let id = req.params.id;
    let body = req.body;

    User.findOneAndUpdate({ username: id }, body, {new: true})
          .then(result => {
            if(result){
              res.status(200).json({
                user: result
              });
            }
            else{
              res.status(404).send('Cant update, missing user');
            }
          })
          .catch(next)
});

/* DELETE user:id */
router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    User.findOneAndRemove({ username: id })
        .then(() => {
          res.status(204).json({});
        })
        .catch(next)
});

module.exports = router;
