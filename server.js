'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    mysql = require('mysql');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to databases
mongoose.connect(config.mongo.uri, config.mongo.options);
var conn = mysql.createConnection(config.mysql);
conn.connect();

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(modelsPath + '/' + file);
    }
});

// Passport Configuration
var passport = require('./lib/config/passport');

var app = express();

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app, passport, conn);

// Start server
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;