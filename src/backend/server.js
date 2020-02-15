const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require("mongoose"),
  cors = require('cors'),

  cloudRoutes = express.Router(),
  userRoutes = express.Router();

let Cloud = require('./models/fileModel');
let Register = require('./models/User');

//var datab = require('./models/User');
var bcrypt = require('bcrypt');
var saltRounds = 10;


app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use('/cloud', cloudRoutes);
app.use('/user', userRoutes);
app.set("port", process.env.PORT || 5000);





mongoose.connect(
  "mongodb://localhost:27017/cloud",
  { useNewUrlParser: true }
);

mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.listen(app.get("port"), () => {
  console.log(`TMS Cloud Express Server running at http://localhost:${app.get("port")}`)
});


cloudRoutes.route('/').get((req, res) => {
  Cloud.find((err, cloud) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(cloud);
    }
  })
});


cloudRoutes.route('/:id').get((req, res) => {
  let id = req.params.id;
  Cloud.findById(id, (err, cloud) => {
    res.json(cloud);
  })
});



cloudRoutes.route('/add').post((req, res) => {
  let mycloud = new Cloud(req.body);
  mycloud.save().then(cloud => {
    res.status(200).json({ 'TMS Cloud': 'File added successfully' });
  })
    .catch(err => {
      res.status(400).send('File was unfortunately not added');
      console.log(err)
    });
});



cloudRoutes.route('/update/:id').post((req, res) => {
  Cloud.findById(req.params.id, (err, cloud) => {
    if (!cloud) {
      res.status(404).send('File not found or does not exist');
    } else {
      cloud.file_author = req.body.file_author;
      cloud.file_name = req.body.file_name;
      cloud.file_description = req.body.file_description;
      cloud.file_date = req.body.file_date;
      cloud.file_moderated = req.body.file_moderated;
    }
    cloud.save().then(cloud => {
      res.json('File successfully updated');
    })

      .catch(err => {
        res.status(400).send('File not updated');
        console.log(err)
      });
  })
});

cloudRoutes.route('/delete/:id').delete((req, res, next) => {
  Cloud.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
      return next(err)
    } else {
      res.status(200).json({msg: data});
      console.log("File Deleted")
 
    }

  });
})


userRoutes.route('/user/create').post((req, res) => {
 bcrypt.hash(req.body.password, saltRounds) 
 .then(function (hashpass){
let obj = {
   email: req.body.email,
   password: hashpass
   };

  let myuser = new Register(obj);
  myuser.save().then(register => {
    res.status(200).json({ 'TMS Cloud': 'User added successfully' });
    //res.redirect('/signin');
  })
    .catch(err => {
      res.status(400).send('User was unfortunately not added');
      console.log(err)
    });
});
});



// //login page: storing and comparing email and password,and redirecting to home page after login
userRoutes.route('/user').post((req, res, next) => { 
  console.log(req.body.email)
  console.log(req.body.password)
     Register.findOne({
          
              email: req.body.email
                 
     }).then(function (user) {
         if (!user) {
           console.log("no user")
         } else {
bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
            console.log("Login")
        } else {
         console.log("Incorrect password")       
        }
      });
     }
  });
    
});



// server = app.listen(4000)

// //chat
// app.set('view engine', 'ejs')
// app.get('/chat', (req, res) => {
// 	res.render('index')
// })

// const io = require("socket.io")(server)


// //listen on every connection
// io.on('connection', (socket) => {
// 	console.log('New user connected')

// 	//default username
// 	socket.username = "Anonymous"

//     //listen on change_username
//     socket.on('change_username', (data) => {
//         socket.username = data.username
//     })

//     //listen on new_message
//     socket.on('new_message', (data) => {
//         //broadcast the new message
//         io.sockets.emit('new_message', {message : data.message, username : socket.username});
//     })

//     //listen on typing
//     socket.on('typing', (data) => {
//     	socket.broadcast.emit('typing', {username : socket.username})
//     })
// })