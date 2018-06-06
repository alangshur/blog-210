// init app
const express = require('express');
const path = require('path');
const bodyParser= require('body-parser'); 
const MongoClient = require('mongodb').MongoClient;

app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/scripts', express.static('scripts'));
app.use('/styles', express.static('styles'));
app.use('/images', express.static('images'));

// connect mongo 
var db;

MongoClient.connect('mongodb://room210:BLOG210!@ds016718.mlab.com:16718/blog210_db', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);

  db = client.db('blog210_db');
  
  app.listen(3000, function() {
    console.log('Listening on 3000');
  });  
});

app.get('/', (req, res) => {
  res.redirect("/index.html");
});

app.get('/index.html', (req, res) => {
  db.collection('posts').find().toArray(function(err, result) {
    if (err) return console.log(err);

    res.render('index.ejs', {posts: result})
  });
});

app.get('/about.html', (req, res) => {
  res.sendFile(__dirname + '/html/about.html');
});

app.get('/write.html', (req, res) => {
  res.sendFile(__dirname + '/html/write.html');
});

app.post('/posts', (req, res) => {
  db.collection('posts').save(req.body, (err, result) => {
    if (err) return console.log(err);

    res.redirect('/index.html'); 
  });
});

app.post('/delete', (req, res) => {
  db.collection('posts').deleteOne({
    formattedDate : req.body.delete
  });

  res.redirect('/index.html'); 
});