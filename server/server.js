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
mongoose.connect('mongodb://localhost/mirror');

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
    check('firstName').not().isEmpty().withMessage('First name is required')
      .isLength({ min: 2 }).withMessage('Firstname should be at least 2 letters')
      .matches(/^([A-z]|\s)+$/).withMessage('Firstname cannot have numbers'),
    check('lastName')
      .not().isEmpty().withMessage('Last name is required')
      .isLength({ min: 2 }).withMessage('Lastname should be at least 2 letters')
      .matches(/^([A-z]|\s)+$/).withMessage('Lastname cannot have numbers'),
    check('password')
      .not().isEmpty().withMessage('Password is required')
      .isLength({ min: 5 }).withMessage('Password should be at least 6 characters'),
    check('dateOfBirth')
      .not().isEmpty().withMessage('Date of birth required'),

    check('email')
      //.isEmail().withMessage('Invalid Email')
      .custom(value => {
        return Article.findOne({ email: value })
          .then(function (Article) {
            if (Article) {
              throw new Error('This email is already in use');
            }
            //return value;
          })
      }),
    check('shortDescription')
      .not().isEmpty().withMessage('Minimum 10 characters are required').isLength({ min: 10}),

    check('ID')
      .not().isEmpty()
      .custom(value => {
        return Article.findOne({ ArticleID: value })
          .then(function (Article) {
            if (Article) {
              throw new Error('This Article ID is already in use');
            }
            //return value;
          })
      }),
    check('status')
      .not().isEmpty().withMessage('Please include Article Status'),

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
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      ArticleID: req.body.ID,
      DateOfBirth: req.body.dateOfBirth,
      Email: req.body.email,
      Video: req.body.video,
      profilePic: filename,
      ShortDescription: req.body.shortDescription,
      Password: req.body.password,
      Status: req.body.status,
      LinkedIn_link: req.body.linkedinLink,
      Github_link: req.body.githubLink,
      hackerRank_link: req.body.hackerRankLink,
      CV_link: req.body.CVlink,
      

    })
      .then(function (Article) {
        // Generate test SMTP service account from mailcatcher
        // Only needed if you don't have a real mail account for testing
        nodemailer.createTestAccount((err, account) => {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: '127.0.0.1',// mailcatcher view mail at  http://localhost:1080
            port: 1025,
            secure: false, // true for 465, false for other ports

          });

          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Ted" <theodor@restart.network>', // sender address
            to: Article.Email,
            subject: 'New Article account', // Subject line
            text: `
            Welcome to Restart, ${Article.FirstName}

            Your account is created.
            You can login at:
            http://localhost:3000/Article/login

            Your password is: ${Article.Password}
            `, // plain text body
            html: `
            <p>Welcome to Restart, ${Article.FirstName}</p>

            Your account is created.
            You can login at:
            <a href="http://localhost:3000/Article/login">here</a>

            Your Log In Id is : ${Article.ArticleID}
            Your password is: ${Article.Password}

            ` // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          });
        })
        res.send(Article);
      })
      .then(function() {
        Badge.create({
          ArticleID: req.body.ID,
          Badge1: false,
          Badge2: false,
          Badge3: false,
          Badge4: false,
          Badge5: false,
          Badge6: false,
        })
      })
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
  Article.findOne({ ArticleID: req.params.ArticleID })

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

  Article.findOne({ ArticleID: req.params.ArticleID })
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
    check('firstName').not().isEmpty().withMessage('First name is required')
      .isLength({ min: 2 }).withMessage('Firstname should be at least 2 letters')
      .matches(/^([A-z]|\s)+$/).withMessage('Firstname cannot have numbers'),
    check('lastName')
      .not().isEmpty().withMessage('Last name is required')
      .isLength({ min: 2 }).withMessage('Lastname should be at least 2 letters')
      .matches(/^([A-z]|\s)+$/).withMessage('Lastname cannot have numbers'),
    check('email')
      .isEmail()
      .custom(value => {
        return Article.findOne({ email: value })
          .then(function (Article) {
            if (Article) {
              throw new Error('this email is already in use');
            }
          })
        //return value;
      }),
    check('shortDescription')
      .not().isEmpty().withMessage('Please enter minimum of 100 words').isLength({ min: 100 }),
    // ??check('photo')
    // .not().isEmpty()
    //??check('video')
    check('ID')
      .custom(value => {
        return Article.findOne({ ArticleID: value })
          .then(function (Article) {
            if (Article) {
              throw new Error('This Article ID is already in use');
            }
          })
        //return value;
      }),


  ],

  function (req, res) {
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
console.log(req.body)
    Article.findOne({ ArticleID: req.params.ArticleID })
      .then(function (Article) {
        Article.FirstName = req.body.firstName
        Article.LastName = req.body.lastName

        Article.DateOfBirth = req.body.dateOfBirth
        Article.Email = req.body.email
        Article.Video = req.body.video
        if (req.files.photo) {
          Article.profilePic = req.files.photo[0].filename
        }
        Article.LinkedIn_link = req.body.linkedinLink
        Article.hackerRank_link = req.body.hackerRankLink
        Article.Github_link = req.body.githubLink
        Article.CV_link = req.body.CVlink
        Article.ShortDescription = req.body.shortDescription
        Article.Status = req.body.status
        

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
