//packages
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

//modoles db 
var Article = require('./Models/Article');
var Admin = require('./Models/Admin');
var Form = require('./Models/Form');

///Models
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


/////////////Admin login
const logValidation = [
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password is required")
];

var login = (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ err: errors.mapped() });
    }
    Admin.findOne({ 
        email: req.body.email
    }).then(function (admin) {
        // if user name or password is wrong
        if (!admin) {
            return res.json({ err: true, message: 'Wrong credential' })
        }
        if (!admin.comparePassword(req.body.password, admin.password)) {
            return res.send({ err: true, message: "Wrong password!" });
        }

        //user is found
        console.log('before cookie');
        req.session.admin = admin;
        console.log(req.session.admin);
        req.session.save();
        res.status(200).json(admin);
    }).catch(error => {
        console.log(error);
        return res.status(422).json({ status: 'error', message: error })
    })
}

app.post('/api/admin/login', logValidation, login);


////////////////////////////
app.get('/api/current_Admin', function (req, res) {
  console.log(req.session)
  if (req.session.admin) {
    Admin.findById(req.session.admin._id)
      .then(function (admin) {
        res.send({
          _id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
        }).populate(admin)
      })
  } else {
    res.send({ error: 'not logged in' })
  }
});


///Log Out
app.get('/api/admin/logout', function (req, res) {
  req.session.destroy();
  res.send({ message: 'session destroyed' })
});

//Adding article/ create User and Validation
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

////////////////////////////////////////////////////////////////////////////////////////////
//Uncomment the code below to add a super admin user
                    // Admin.create({
                    // name: 'Mohammad',
                    // email: 'mmm@gmail.com',
                    // password: '123123',
                    // jobTitle: "super"
                    // })
////////////////////////////////////////////////////////////////////////////////////////////

/////////////register Normal Admin with validations/////////////////////////////////////////////////////////
// Registeration
var register = (req, res) => {
  const admin = new Admin(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ status: "error", errors: errors.mapped() });
  }
  admin.password = admin.hashPassword(admin.password);
  admin
    .save()
    .then(admin => {
      return res.send({ status: "success", message: "registerd successfuly" });
    })
    .catch(error => {
      console.log(error);
      return res.send({ status: "error", message: error });
    });
};

app.post(
  "/api/admin/register",
  [
    check("name", "please enter your full name")
      .not()
      .isEmpty(),
    check("name", "your name must not contain any numbers").matches(
      /^[A-z''., ]+$/i
    ),
    check("name", "your name should be more than 4 charchters").isLength({
      min: 4
    }),

    check("email", "your email is not valid").isEmail(),
    check("email", "email already exist").custom(function(value) {
      return Admin.findOne({ email: value }).then(Admin => !Admin);
    }),
    // check("jobTitle", "please enter your full description")
    //   .not()
    //   .isEmpty(),
    // check("jobTitle", "your description must not contain any numbers").isAlpha(),
    check(
      "password",
      "your password should be 5 or more charchters"
    ).isLength({ min: 5 }),
    check("con_password", "your password confirmation dose not match").custom(
      (value, { req }) => value === req.body.password
    )
  ],
  register
);
///////////////////////////////////////////////////////////////////////////////////////////
///All Admins///////////////////////////////////////////////////////////////////////
//all users
app.get('/api/admin/alladmins', function (req, res, next) {
  Admin.find({}, ['name', 'email', 'jobTitle'], (err, admins) => {
      if (err) {
          console.log("Error getting users" + err);
          return next();
      }
      res.json(admins)
  })
})



/////////////////////////////////////////////////////////////////////////
///Delete admin/////////////////////////////////////////////////////////
app.delete('/api/admin/delete/:id', function (req, res) {
  Admin.findById(req.params.id)
    .then(function (admin) {
      admin.remove()
        .then(function () {
          res.send({ status: 'success', message: ' Admin removed ' })
        });
    });
});
////////////////////////////////////////////////////////////////////////


///Registering form/////////////////////////////////////////////////////////
var register = (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      return res.send({ status: 'error', errors: errors.mapped() })
  }
  Form.create(req.body)
      .then(form => { return res.send({ status: 'success', message: 'FORM registerd successfuly' }) })
      .catch(error => {
          console.log(error);
          return res.send({ status: 'error', message: error })
      })
}

app.post('/api/formRegister', [

  check('name', 'please enter your full name').not().isEmpty(),
  check('name', 'your name must not contain any numbers').matches(
    /^[A-z''., ]+$/i),
  check('name', 'your name should be more than 2 charchters').isLength({ min: 2 }),

  check('dateOfBirth', 'please enter your dateOfBirth').not().isEmpty(),

  check('address', 'please enter your Address').not().isEmpty(),

  check('postCode', 'please enter your Post Code').not().isEmpty(),

  check('city', 'please enter your Post City').not().isEmpty(),

  check('email', 'your email is not valid').isEmail(),
  check('email', 'email already exist').custom(
      function (value) {
          return Form.findOne({ email: value }).then(form => !form)
      }),
 
  check('mobile', 'please enter your Mobile number').not().isEmpty(),

  check('occupation', 'please enter your Occupation').not().isEmpty(),

  check('availability', 'please enter your Availability').not().isEmpty(),
  
  check('experience', 'please enter your Experience').not().isEmpty(),

  ], register);

////////////////////////////////////////////////////////////////////////
//show all volunteers
  app.get('/api/admin/listofVolunteers', function (req, res, next) {
    Form.find({},  (err, forms) => {
        if (err) {
            console.log("Error getting forms" + err);
            return next();
        }
        res.json(forms)
    })
  })
////////////////////////////////////////////////////////////////////////


///Delete volunteers/////////////////////////////////////////////////////
app.delete('/api/admin/vol/delete/:id', function (req, res) {
  Form.findById(req.params.id)
    .then(function (form) {
      form.remove()
        .then(function () {
          res.send({ status: 'success', message: ' Volunteer removed ' })
        });
    });
});

///Single volunteers/////////////////////////////////////////////////////
app.get('/api/admin/singleVolunteer/:_id', (req, res, next) => {
  Form.findOne({ _id: req.params._id }, (err, form) => {
      if (err) {
          console.log("Error getting the user", form);
          return next();
      }
      res.json(form);
  })
})
////////////////////////////////////////////////////////////////////////





app.listen(8000, function () {
  console.log('listening on port 8000');
})
