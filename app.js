const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear();
});
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  let log = `Method called is ${req.method} at ${new Date()} and URL is ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('cannot append log to the file');
  });
  next();
});

app.use('/maintenance', (req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Site is under construction !!!'
  });
});

app.get('/', function (req, res) {
  res.render('help.hbs', {
    pageTitle: 'Start page',
    welcomeMsg: "Hello There!!!"
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.listen(port);
