var express = require('express');
var routes = express.Router();
var Article = require('../Models/Article');
var Article = require('../Models/Admin');
var { check, validationResult } = require('express-validator/check');

// route: /api/admin/Article/class/list
routes.get('/list', function(req, res) {
  console.log(req.body)
 
  .sort({
    createdAt: 'desc',
  })
  .then(function(ArticleClass){
    res.send(ArticleClass)
  })
  .catch(function(error){
    res.send(error);
  })
});

routes.get('/:id', function(req, res) {
  ArticleClass.findById(req.params.id)
    .then(function (ArticleClass) {
      res.send(ArticleClass)
    })
    .catch(function (error) {
      res.send(error);
    })
})

// route: /api/admin/Article/class/add
routes.post('/add',[
  check('name')
    .not().isEmpty().withMessage('Name cannot be empty')
    .custom(value => {
      return ArticleClass.findOne({ name: value })
        .then(function (ArticleClass) {
          if (ArticleClass) {
            throw new Error('This Article class is already in use');
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

  ArticleClass.create({
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

// /api/admin/Article/class/:id/update
routes.post('/:id/update', function(req, res) {
  ArticleClass.findById(req.params.id)
    .then(function(ArticleClass) {
      ArticleClass.name = req.body.name
      ArticleClass.save();
      res.send('success');
    })
    .catch(function(error) {
      res.send(error);
    })
});

routes.get('/:ArticleClassId/Articles', function (req, res) {
  Article.find({ ArticleClass: req.params.ArticleClassId })
    .sort({
    _id: 'desc'
    })
    .populate('ArticleClass')
    .then((Articles) => {
      res.send(Articles);
    }
    ).catch((error) => {
      res.send({ status: error, message: 'Cannot find Articles' });
    })
})



module.exports = routes;
