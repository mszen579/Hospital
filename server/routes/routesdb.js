var express = require('express');
var routes = express.Router();
var Student = require('../Models/Student');
var { check, validationResult } = require('express-validator/check');

// route: /api/admin/student/class/list
routes.get('/list', function(req, res) {
  console.log(req.body)
 
  .sort({
    createdAt: 'desc',
  })
  .then(function(studentClass){
    res.send(studentClass)
  })
  .catch(function(error){
    res.send(error);
  })
});

routes.get('/:id', function(req, res) {
  StudentClass.findById(req.params.id)
    .then(function (studentClass) {
      res.send(studentClass)
    })
    .catch(function (error) {
      res.send(error);
    })
})

// route: /api/admin/student/class/add
routes.post('/add',[
  check('name')
    .not().isEmpty().withMessage('Name cannot be empty')
    .custom(value => {
      return StudentClass.findOne({ name: value })
        .then(function (studentClass) {
          if (studentClass) {
            throw new Error('This student class is already in use');
          }
          //return value;
        })
    })
]
, 
function (req, res){
  console.log(req.body);

  var errors = validationResult(req);
  console.log(errors.mapped());
  if (!errors.isEmpty()) {
    // console.log('errors')
    // console.log(errors.mapped());
    return res.send({ errors: errors.mapped() });
  }

  StudentClass.create({
    name: req.body.name
  })
  .then(function(result){
    console.log(result);
    res.send('success');
  })
  .catch(function(error) {
    res.send(error);
  })
})

// /api/admin/student/class/:id/update
routes.post('/:id/update', function(req, res) {
  StudentClass.findById(req.params.id)
    .then(function(studentClass) {
      studentClass.name = req.body.name
      studentClass.save();
      res.send('success');
    })
    .catch(function(error) {
      res.send(error);
    })
});

routes.get('/:StudentClassId/students', function (req, res) {
  Student.find({ StudentClass: req.params.StudentClassId })
    .sort({
    _id: 'desc'
    })
    .populate('StudentClass')
    .then((students) => {
      res.send(students);
    }
    ).catch((error) => {
      res.send({ status: error, message: 'Cannot find students' });
    })
})



module.exports = routes;
