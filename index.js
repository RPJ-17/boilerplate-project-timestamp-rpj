// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  const regex = /[-|\s\w]/gi;
  const strHasDash = regex.test(req.params.date);
  let dateToReturn;
  let unixDate;

  if (strHasDash) {
    dateToReturn = new Date(req.params.date);
    unixDate = Date.parse(req.params.date);
    if (isNaN(unixDate)) {
      res.json({error: "Invalid Date"})
    }
    res.json({unix: unixDate, utc: dateToReturn.toUTCString()});
  } else {
    dateToReturn = new Date(Number(req.params.date));
    unixDate = Number(req.params.date);
    if (isNaN(unixDate)) {
      res.json({error: "Invalid Date"})
    }
    res.json({unix: unixDate, utc: dateToReturn.toUTCString()});
  }
});

app.get('/api', (req, res) => {
  const today = new Date(Date.now());
  const unixToday = Date.now();
  res.json({unix: unixToday, utc: today.toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
