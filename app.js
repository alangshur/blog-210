// init app
const express = require('express');
const path = require('path');
const bodyParser= require('body-parser'); 
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/images', express.static(__dirname + '/images'));
app.set('view engine', 'ejs')

// connect mongo 
var db;

MongoClient.connect('mongodb://room210:BLOG210!@ds014658.mlab.com:14658/blog210_db', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);

  db = client.db('blog210_db');
  
  app.listen(3000, function() {
    console.log('Listening on 3000');
  });  
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');

  db.collection('posts').find().toArray(function(err, result) {
    if (err) return console.log(err);

    console.log(result);
  });
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');

  db.collection('posts').find().toArray(function(err, result) {
    if (err) return console.log(err);

    console.log(result);
  });
});

app.get('/about.html', (req, res) => {
  res.sendFile(__dirname + '/html/about.html');
});

app.post('/posts', (req, res) => {
  db.collection('posts').save(req.body, (err, result) => {
    if (err) return console.log(err);

    res.redirect('/');
  });
});