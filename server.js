var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var dataAccessLayer=require("./DAL.js");
var app  = express();

function CRUD(){
    var self = this;
    self.connectMysql();
};

CRUD.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : 'saurav_91',
        database : 'myappdb',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

CRUD.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api', router);
      var crud_router = new dataAccessLayer(router,connection,md5);
      self.startServer();
}


CRUD.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("Server successfully started at Port 3000.");
      });
}

CRUD.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new CRUD();
