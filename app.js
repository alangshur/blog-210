// init app
const express = require('express');
const path = require('path');
const bodyParser= require('body-parser'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/front'));
app.use(express.static(__dirname + '/back'));
app.use('/images', express.static(__dirname + '/images'));

app.listen(3000, function() {
  console.log('Listening on 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/front/index.html');
});

app.post('/', (req, res) => {
  console.log('Hellooooooooooooooooo!');
})