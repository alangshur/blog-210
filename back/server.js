// init project
const express = require('express');
const app = express();

app.use(require("cors")()); // allow Cross-domain requests 
app.use(require('body-parser').json()); // automatically parses request data to JSON

// base route
app.get("/", function (request, response) {
  response.send("TODO")
});

// base route
app.post("/", function (request, response) {
  response.send("TODO")
});

app.put("/", function (request, response) {
  response.send("TODO")
});

// listen for requests, the process.env.PORT is needed because
// we are using glitch, otherwise you could have written 80 or whatever
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});