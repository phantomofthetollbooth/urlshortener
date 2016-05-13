
var express = require('express');
var mongo = require('mongodb').MongoClient;
var routes = require('./app/index.js');
var shorts = require('./app/urlshortener.js');
var app=express();
require('dotenv').config();
app.set('port', process.env.PORT || 3000);




//var MongoClient = mongodb.MongoClient;
var url = process.env.MONGOLAB_URI||'mongodb://localhost:27017/urlshortener';      
   

  mongo.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connected to', url);

 app.use('/public', express.static(process.cwd() + '/public'));
 

 
 routes(app, db);
 shorts(app,db);
 app.listen(app.get('port'));
  }
});