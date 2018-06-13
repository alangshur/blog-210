// init app
const express = require('express');
const path = require('path');
const bodyParser= require('body-parser'); 
const MongoClient = require('mongodb').MongoClient;
const compression = require('compression');
const helmet = require('helmet');

app = express();
app.set('view engine', 'ejs');

app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/scripts', express.static('scripts'));
app.use('/styles', express.static('styles'));
app.use('/images', express.static('images'));

// connect mongo 
var db;
const PORT = process.env.PORT || 3000;

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://room210:BLOG210!@ds016718.mlab.com:16718/blog210_db', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);

  db = process.env.MONGODB_URI ? client.db('blog210_db_prod') : client.db('blog210_db');

  app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
  });
});

app.get('/', (req, res) => {
  res.redirect("/home");
});

app.get('/home', (req, res) => {
  db.collection('posts').find().toArray(function(err, result) {
    if (err) return console.log(err);

    res.render('index.ejs', {posts: result})
  });
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/html/about.html');
});

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/html/write.html');
});

app.post('/posts', (req, res) => {
  db.collection('posts').save(req.body, (err, result) => {
    if (err) return console.log(err);

    res.redirect('/home'); 
  });
});

app.post('/delete', (req, res) => {
  db.collection('posts').deleteOne({
    formattedDate : req.body.delete
  });

  res.redirect('/home'); 
});