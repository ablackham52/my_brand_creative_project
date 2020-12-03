const express = require('express');
const bodyParser = require("body-parser");

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/mybrand', {
  useNewUrlParser: true
});

// Create a scheme for items in the museum: a title and a path to an image.
const userSchema = new mongoose.Schema({
  name: String,
  path: String,
  brands: [String],
});

const brandSchema = new mongoose.Schema({
  name: String,
  path: String,
  followers: Number,
});

// Create a model for items in the museum.
const User = mongoose.model('User', userSchema);
const Brand = mongoose.model('Brand', brandSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/user', async (req, res) => {
  const user = new User({
    name: req.body.name,
    path: req.body.path,
  });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/brand', async (req, res) => {
  const brand = new Brand({
    name: req.body.name,
    path: req.body.path,
    followers: 0,
  });
  try {
    await brand.save();
    res.send(brand);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



// Get a list of all of the items in the museum.
app.get('/api/user', async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/brand', async (req, res) => {
  try {
    let brands = await Brand.find();
    res.send(brands);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/brand/:id', async (req, res) => {
  try {
    await Brand.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/user/:id', async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/brand/:id', async (req, res) => {
  try {
    let brand = await Brand.findOne({
      _id: req.params.id
    });
    brand.followers = req.body.followers;
    await brand.save();
    res.send(brand);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/user/:id', async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.id
    });
    user.brands = req.body.brands;
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
