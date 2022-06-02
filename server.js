var http = require('http');
var express = require('express');
var app = express();
var app = require('./config/express')();

const url = 'mongodb+srv://Carolina:coutinho@cluster0.msaww.mongodb.net/?retryWrites=true&w=majority';
const localUrl = 'mongodb://localhost/contatooh'
require('./config/database.js')(url);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express Server escutando na porta ' + app.get('port'));
});
