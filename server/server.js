//packages
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
//modoles
var Article = require('./Models/Article');
var { check, validationResult } = require('express-validator/check');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var multer = require('multer');
var mime = require('mime-types');
var randomstring = require('randomstring');
var path = require('path');
var nodemailer = require('nodemailer');



//mongoose.connect('mongodb://localhost:27017/one_mirror');
mongoose.connect('mongodb://localhost/hospital');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    const extension = mime.extension(file.mimetype);
    const filename = randomstring.generate();
    cb(null, filename + '.' + extension)
  }
})

//this is for uploading photo
var upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'))

//app.use(cors());
app.use(bodyParser.json());


// Cross-origin resource sharing - Middelware
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'HEAD', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
  credentials: true // enable set cookie
}));

app.use(session({
  proxy: true,
  secure: false,
  resave: true,
  secret: 'qwertyuiop1234567890',
  saveUninitialized: true,
  cookie: {
    maxAge: (60000 * 60),
    secure: false, // this should be false for localhost
    httpOnly: false,
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


app.get('/test', function (req, res) {
  res.send('Hello Server');
})

// Searching for Article in db

validateArticleId= [
  check('ArticleID','Please enter a Article ID ').not().isEmpty()

]

app.post('/Article/search', validateArticleId, function (req, res) {
  //console.log(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log(errors);
    return res.status(422).json({ errors: errors.mapped() });
  }

  //console.log(req.body);
  Article.findOne(req.body)
    .then(function (user) {
      if (!user) {
        return res.send({ status: 'error', message: 'Article not found' });
      }
      //console.log(user);
      res.send(user);
    })
    .catch(function (error) {
      console.log(error);
      res.send({ error: 'error', message: 'Something went wrong' });
    })
})


// Getting the Article profile using id


app.post('/Article/profileinfo/:id', function (req, res) {
  console.log(req.params.id);
  console.log(req.body);

  Article.findOne({"ArticleID" : req.params.id})
    .then(function (user) {
      if (!user) {
        return res.send({ status: 'error', message: 'Article not found' });
      }
      console.log(user);
      res.send(user);
    })
    .catch(function (error) {
      console.log(error);
      res.send({ error: 'error', message: 'Something went wrong' });
    })
})


////////////////login user////////////////////
app.post('/api/login', function (req, res) {
  console.log(req.body);
  Article.findOne({
    Email: req.body.email,
    Password: req.body.password
  })
    .then(function (Article) {
      if (!Article) {
        let errors_value = {
          login: { msg: 'Wrong email or password' }
        }
       
        return res.send({ errors: errors_value })
      } else {
        req.session.Article = Article;
        return res.send({ msg: 'You are signed in' });
      }

      res.send(Article);
    })
    .catch(function (error) {
      console.log(error);

    })
})

app.get('/api/current_Article', function (req, res) {
  console.log(req.session)
  if (req.session.Article) {
    Article.findById(req.session.Article._id)
      .then(function (Article) {
        res.send({
          _id: Article._id,
          email: Article.email,
          firstName: Article.firstName,
        })
      })
  } else {
    res.send({ error: 'not logged in' })
  }
});

//Admin registration / create User and Validation

///Log Out
app.get('/api/logout', function (req, res) {
  req.session.destroy();
  res.send({ message: 'session destroyed' })
});

//Admin registration / create User and Validation
app.post('/api/Article/register',
  upload.fields([{ name: 'photo', maxCount: 1 }]), //multer files upload
  [
    check('title').not().isEmpty().withMessage('Title is required')
      .isLength({ min: 2 }).withMessage('Title should be at least 2 letters'),
    check('location')
      .not().isEmpty().withMessage('Location is required')
      .isLength({ min: 2 }).withMessage('Location should be at least 2 letters'),
     check('shortDescription')
      .not().isEmpty().withMessage('Description is required').isLength({ min: 10}).withMessage('Minimum 10 characters are required'),
  ],
  function (req, res) {
    var errors = validationResult(req);
    console.log(errors.mapped());
    if (!errors.isEmpty()) {
      // console.log('errors')
      // console.log(errors.mapped());
      return res.send({ errors: errors.mapped() });
    }

    filename = null
    if (req.files && req.files.photo && req.files.photo[0]) {
      filename = req.files.photo[0].filename
    }

    Article.create({
      title: req.body.title,
      location: req.body.location,
      Video: req.body.video,
      profilePic: filename,
      ShortDescription: req.body.shortDescription,  

    }).then(res.send(article))
      .catch(function (error) {
        console.log(error);
        res.send(error);
      })
  })

//Showing List of Articles
app.get('/api/listofArticles', function (req, res) {
  Article.find({})
    .sort({
      ArticleId: 'desc'
    })
     .then((Articles) => {
      res.send(Articles);
    }
    ).catch((error) => {
      res.send({ status: error, message: 'Cannot find Articles' });
    })
})




//Admin Article View Profile
app.get('/api/Article/:ArticleID/viewprofile', function (req, res) {
  console.log(req.params);
  Article.findOne({ _id: req.params.id })

    .then(function (result) {
      res.send(result);
      console.log(result);
    })
    .catch(function (error) {
      console.log(error);
    })
})

app.post('/api/admin/:ArticleID/enablebadges',function(req,res){
  console.log(req.body);
  console.log(req.params.ArticleID);
  var badgeName=req.body.enablebadge;
  Badge.findOne({
        ArticleID:req.params.ArticleID
      }).update({badgeName:1})
  .then(function (badges) {
    // console.log(badges)
    res.send(badges);

  })
  .catch(function (error) {
    // console.log(error);
    res.send(error);
  })

})



//Admin Getting Article to Edit

app.get('/api/:ArticleID/getedititem', function (req, res) {

  console.log('request get', req.body);

  Article.findOne({ _id: req.params.id })
    .then(function (Article) {
   res.json(Article)
    })
    .catch(function (error) {
      console.log(error);
    })
})



//Admin Editting the Article
app.post('/api/:ArticleID/update',
  upload.fields([{ name: 'photo', maxCount: 1 }]), //multer files upload
  [
    check('title').not().isEmpty().withMessage('Title is required')
      .isLength({ min: 2 }).withMessage('Title should be at least 2 letters')
      ,
    check('location')
      .not().isEmpty().withMessage('Location is required')
      .isLength({ min: 2 }).withMessage('Lastname should be at least 2 letters')
      ,
       check('shortDescription')
      .not().isEmpty().withMessage('Please enter minimum of 10 words').isLength({ min: 10 }),
  ],

  function (req, res) {
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
console.log(req.body)
    Article.findOne({ _id: req.params.id })
      .then(function (Article) {
        Article.title = req.body.title
        Article.location = req.body.location
        Article.Video = req.body.video
        if (req.files.photo) {
          Article.profilePic = req.files.photo[0].filename
        }
        Article.ShortDescription = req.body.shortDescription
      

        Article.save()
          .then(function (Article) {
            res.send(Article);
          })
          .catch(function (error) {
            console.log(error);
            res.send(error);
          })
      })
      .catch(function (error) {
        console.log(error);
        res.send(error);
      })
  });



app.listen(8000, function () {
  console.log('listening on port 8000');
})
