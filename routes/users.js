var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', verifyToken, (req, res, next) => {
  jwt.verify(
    req.token,
    'secretKey',
    (err, authData) => {
      console.log("Error de verify " + err);
      if (err) next(err);
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
    }
  )
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

/*Login. */
router.post('/login', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  const body = req.body;

  if(!body.username || !body.password) return next({
    message: "Username or password are missing",
    name: "Invalid"
  });

  User.findOne({ username: body.username })
        .then(result => {
          if(result){
            result.comparePass(body.password, function(err, isMatch){
              console.log(err);
              if(err) throw (err);

              if(isMatch){
                jwt.sign(
                  { result },
                  'secretKey',
                  { expiresIn: '60000s' },
                  (err, accessToken) => {
                    if(err) next({
                      message: "Invalid operation",
                      name: "Forbidden"
                    });
                    res.status(200).json({"accessToken": accessToken, "key": result.password});
                  }
                );
              }
              else {
                res.status(401).json({
                  message: "Username or password are incorrect",
                  name: "Forbidden"
                })
              }
            })
          } else {
            next({
              message: "Username or password are incorrect",
              name: "Forbidden"
            })
          }
        })
        .catch(next);
});

/* PUT user:id */
router.put('/:id', verifyToken, (req, res, next) =>{
  // console.log('updsate');
    let id = req.params.id;
    let body = req.body;
    // body.password = bcrypt.hashSync(body.password, SALT_ROUNDS);
    jwt.verify(
      req.token,
      'secretKey',
      (err, authData) => {
        console.log("Error de verify " + err);
        if (err) next(err);

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
    User.findOneAndRemove({ username: id })
        .then(() => {
          res.status(204).json({});
        })
        .catch(next)
      }
    )
});

//JIJI
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
