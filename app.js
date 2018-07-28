// init app modules
const express = require('express');
const path = require('path');
const bodyParser= require('body-parser'); 
const MongoClient = require('mongodb').MongoClient;
const compression = require('compression');
const helmet = require('helmet');

// set app
app = express();
app.set('view engine', 'ejs');

// use app modules
app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/scripts', express.static('scripts'));
app.use('/styles', express.static('styles'));
app.use('/images', express.static('images'));

// connect db 
var db;

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://room210:BLOG210!@ds016718.mlab.com:16718/blog210_db', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);

  db = process.env.MONGODB_URI ? client.db('blog210_db_prod') : client.db('blog210_db');
});

// connect Heroku port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});

// Express GET
app.get('/', (req, res) => {
  res.redirect("/page/1");
});

// for mix-ups in previous routing builds
app.get('/home', (req, res) => {
  res.redirect("/page/1");
});


// paging
app.get('/page/:pageReq', (req, res) => {
  db.collection('posts').find().toArray(function(err, result) {
    if (err) return console.log(err);
    var totalEntries = db.collection('posts').count();
    var totalPages;
    totalEntries.then(function(entries) {
      totalPages = Math.ceil(entries / 10);
      res.render('index.ejs', {posts: result, totalPages: totalPages, currPage: req.params["pageReq"], currUser: null})
    });
  });
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/html/about.html');
});

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/html/write.html');
});

// Express POST
app.post('/posts', (req, res) => {
  db.collection('posts').save(req.body, (err, result) => {
    if (err) return console.log(err);

    res.redirect('/'); 
  });
});

app.post('/delete', (req, res) => {
  db.collection('posts').deleteOne({
    formattedDate : req.body.delete
  });

  res.redirect('/'); 
});