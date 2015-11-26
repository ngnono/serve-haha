'use strict';

var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();


let avatar = require('./controllers/avatar/index');


const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 9000;

// Logger
app.use(logger());

app.use(route.get('/avatar/:id', avatar.get));


// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());



let listen = exports.listen = function () {
  if (!module.parent) {
    app.listen(PORT);
    console.log('node env on %s', env);
    console.log('listening on port %s', PORT);
  }
};


process.on('unhandledRejection', function (err, p) {
  console.error(err);
  console.error(err.stack)
});

listen();
