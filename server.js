'use strict';

const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const auth = require('http-auth');

var basic = auth.basic({
    realm: 'SUPER SECRET STUFF'
}, function(username, password, callback) {
    callback(username == process.env.USER && password == process.env.SECRET);
});

var app = express();

var authMiddleware = auth.connect(basic);

const exphbs = require('express-handlebars');

app.use(bodyParser.urlencoded({ extended: false, }));

app.use(express.static('public'));
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}));

app.set('view engine', '.hbs');

const routes = require('./routes');

app.use('/', authMiddleware, routes);

const listener = app.listen(process.env.PORT || 4000, function () {
  logger.info(`gomix-template-1 started on port ${listener.address().port}`);
});
