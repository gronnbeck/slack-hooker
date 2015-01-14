var app = require('express')();
var auth = require('basic-auth');
var _ = require('lodash');

module.exports = function(ignorePaths) {
  // var username = "lol";
  // var password = "lol";
  var username = process.env.USER;
  var password = process.env.PASS;
  ignorePaths = ignorePaths || [];

  app.use(function(req, res, next) {
    if (req.method === 'post' && _.contains(ignorePaths, req.path)) {
      return next();
    }
    var user = auth(req);
    if (user === undefined || user['name'] !== username || user['pass'] !== password) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="nplol"');
      res.end('Unauthorized');
    } else {
      next();
    }
  });

  return app;
}
