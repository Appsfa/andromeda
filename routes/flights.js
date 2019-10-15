// var express = require('express');
// var router = express.Router();
// const mongoose = require('mongoose');
// const Planet = require('../models/planet');
//
// /* GET users listing. */
// router.get('/', (req, res, next) => {
//   Planet.find({})
//     .then(result => {
//       if (result.length) {
//           res.status(200).json({
//             planet:result
//           });
//       }else {
//           res.status(404).send('Aqui no hay planetas');
//       }
//     })
//     .catch(next)
// });
//
// router.post('/', (req, res, next) => {
//   //SIGN UP
//   const body = req.body;
//   res.send(body);
//   Planet.create(body)
//         .then(result => {
//           if(result){
//             res.status(201).json({
//               message: "Creacion de planeta exitoso",
//               planet: result
//             })
//           }else {
//             next({
//               message: "Cant planet user",
//               name: "Invalid"
//             })
//           }
//         })
//         .catch(next);
// });
//
// /* GET user:id */
// router.get('/:id', (req, res, next) =>{
//   let id = req.params.id;
//   Planet.findOne({ name: id }).exec()
//       .then(result => {
//         if(result){
//           res.status(200).json({
//             planet: result
//           });
//         }
//         else{
//           res.status(404).send('Planet not found');
//         }
//       })
//       .catch(next);
// });
//
// /* PUT user:id */
// router.put('/:id', (req, res, next) =>{
//     let id = req.params.id;
//     let body = req.body;
//
//     Planet.findOneAndUpdate({ name: id }, body, {new: true})
//           .then(result => {
//             if(result){
//               res.status(200).json({
//                 planet: result
//               });
//             }
//             else{
//               res.status(404).send('Cant update, missing planet');
//             }
//           })
//           .catch(next)
// });
//
// /* DELETE user:id */
// router.delete('/:id', (req, res, next) =>{
//     let id = req.params.id;
//
//     Planet.findOneAndRemove({ name: id })
//         .then(() => {
//           res.status(204).json({});
//         })
//         .catch(next)
// });
//
// module.exports = router;
