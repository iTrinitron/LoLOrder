var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swig  = require('swig');
var React = require('react');
var Router = require('react-router');
var routes = require('./app/routes');

var app = express();

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : ip,
  user     : usr,
  password : pwd,
  database : database
});

connection.connect();

app.use('/api/items', function(req, res, next) {
  var sql = "SELECT * FROM items";
  connection.query(sql, function(err, rows, fields) {
    res.json(rows);
  });
});

app.use('/api/champs', function(req, res, next) {
  var sql = "SELECT * FROM champions";
  connection.query(sql, function(err, rows, fields) {
    res.json(rows);
  });
});


//champ + phash
app.use('/api/:gameV/:champId/:pHash', function(req, res, next) {
  var game_version = connection.escape(req.params.gameV.replace(/\-/g, "."));
  var champ_id = connection.escape(req.params.champId);
  var p_hash = connection.escape(req.params.pHash);
  var sql = "SELECT * FROM champ_item_build WHERE game_version= " + game_version + " AND champ_id= " + champ_id + " AND p_hash=" + p_hash + " ORDER BY count DESC";
  console.log("Selecting champ with p_hash");
  connection.query(sql, function(err, rows, fields) {

    res.json(rows);
  });
});

//champ + no phash
app.use('/api/:gameV/:champId', function(req, res, next) {
  var game_version = connection.escape(req.params.gameV.replace(/-/g, "."));
  var champ_id = connection.escape(req.params.champId);
  var p_hash = connection.escape(req.params.pHash);
  var sql = "SELECT * FROM champ_item_build WHERE game_version= " + game_version + " AND champ_id= " + connection.escape(req.params.champId) + " AND p_hash='' ORDER BY count DESC";
  console.log("Selecting champ with p_hash");
  connection.query(sql, function(err, rows, fields) {

    res.json(rows);
  });
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(function(req, res) {
  Router.run(routes, req.path, function(Handler) {
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile('views/index.html', { html: html });
    res.send(page);
  });
});