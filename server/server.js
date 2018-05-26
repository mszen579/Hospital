//packages
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
//modoles
var Student = require('./Models/Student');
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

// Searching for student in db

validateStudentId= [
  check('StudentID','Please enter a student ID ').not().isEmpty()

]

app.post('/student/search', validateStudentId, function (req, res) {
  //console.log(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log(errors);
    return res.status(422).json({ errors: errors.mapped() });
  }

  //console.log(req.body);
  Student.findOne(req.body)
    .then(function (user) {
      if (!user) {
        return res.send({ status: 'error', message: 'Student not found' });
      }
      //console.log(user);
      res.send(user);
    })
    .catch(function (error) {
      console.log(error);
      res.send({ error: 'error', message: 'Something went wrong' });
    })
})


// Getting the student profile using id


app.post('/student/profileinfo/:id', function (req, res) {
  console.log(req.params.id);
  console.log(req.body);

  Student.findOne({"StudentID" : req.params.id})
    .then(function (user) {
      if (!user) {
        return res.send({ status: 'error', message: 'Student not found' });
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
  Student.findOne({
    Email: req.body.email,
    Password: req.body.password
  })
    .then(function (student) {
      if (!student) {
        let errors_value = {
          login: { msg: 'Wrong email or password' }
        }
       
        return res.send({ errors: errors_value })
      } else {
        req.session.student = student;
        return res.send({ msg: 'You are signed in' });
      }

      res.send(student);
    })
    .catch(function (error) {
      console.log(error);

    })
})

app.get('/api/current_student', function (req, res) {
  console.log(req.session)
  if (req.session.student) {
    Student.findById(req.session.student._id)
      .then(function (student) {
        res.send({
          _id: student._id,
          email: student.email,
          firstName: student.firstName,
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
app.post('/api/student/register',
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
        return Student.findOne({ email: value })
          .then(function (student) {
            if (student) {
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
        return Student.findOne({ StudentID: value })
          .then(function (student) {
            if (student) {
              throw new Error('This student ID is already in use');
            }
            //return value;
          })
      }),
    check('status')
      .not().isEmpty().withMessage('Please include student Status'),

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

    Student.create({
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      StudentID: req.body.ID,
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
      .then(function (student) {
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
            to: student.Email,
            subject: 'New student account', // Subject line
            text: `
            Welcome to Restart, ${student.FirstName}

            Your account is created.
            You can login at:
            http://localhost:3000/student/login

            Your password is: ${student.Password}
            `, // plain text body
            html: `
            <p>Welcome to Restart, ${student.FirstName}</p>

            Your account is created.
            You can login at:
            <a href="http://localhost:3000/student/login">here</a>

            Your Log In Id is : ${student.StudentID}
            Your password is: ${student.Password}

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
        res.send(student);
      })
      .then(function() {
        Badge.create({
          StudentID: req.body.ID,
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

//Showing List of Students
app.get('/api/listofstudents', function (req, res) {
  Student.find({})
    .sort({
      StudentId: 'desc'
    })
     .then((students) => {
      res.send(students);
    }
    ).catch((error) => {
      res.send({ status: error, message: 'Cannot find students' });
    })
})




//Admin Student View Profile
app.get('/api/student/:StudentID/viewprofile', function (req, res) {
  console.log(req.params);
  Student.findOne({ StudentID: req.params.StudentID })

    .then(function (result) {
      res.send(result);
      console.log(result);
    })
    .catch(function (error) {
      console.log(error);
    })
})

app.post('/api/admin/:StudentID/enablebadges',function(req,res){
  console.log(req.body);
  console.log(req.params.StudentID);
  var badgeName=req.body.enablebadge;
  Badge.findOne({
        StudentID:req.params.StudentID
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



//Admin Getting Student to Edit

app.get('/api/:StudentID/getedititem', function (req, res) {

  console.log('request get', req.body);

  Student.findOne({ StudentID: req.params.StudentID })
    .then(function (student) {
   res.json(student)
    })
    .catch(function (error) {
      console.log(error);
    })
})



//Admin Editting the student
app.post('/api/:StudentID/update',
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
        return Student.findOne({ email: value })
          .then(function (student) {
            if (student) {
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
        return Student.findOne({ StudentID: value })
          .then(function (student) {
            if (student) {
              throw new Error('This student ID is already in use');
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
    Student.findOne({ StudentID: req.params.StudentID })
      .then(function (student) {
        student.FirstName = req.body.firstName
        student.LastName = req.body.lastName

        student.DateOfBirth = req.body.dateOfBirth
        student.Email = req.body.email
        student.Video = req.body.video
        if (req.files.photo) {
          student.profilePic = req.files.photo[0].filename
        }
        student.LinkedIn_link = req.body.linkedinLink
        student.hackerRank_link = req.body.hackerRankLink
        student.Github_link = req.body.githubLink
        student.CV_link = req.body.CVlink
        student.ShortDescription = req.body.shortDescription
        student.Status = req.body.status
        

        student.save()
          .then(function (student) {
            res.send(student);
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
