var mysql   = require("mysql");
function CRUD_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

CRUD_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });
	
	router.get("/users",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["userdata"];
        query = mysql.format(query,table);
        connection.query(query,function(err,results){
            if(err) {
		res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
		res.setHeader("Access-Control-Allow-Origin","*")
       		res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
                //res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                res.json({"Error" : false, "Message" : "Success", "Users" : results});
            }
        });
    });

	router.get("/users/:id",function(req,res){
        var query = "SELECT * FROM ?? WHERE UserID=?";
        var table = ["userdata",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,results){
            if(err) {
		res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
		res.setHeader("Access-Control-Allow-Origin","*")
       		res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
                //res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                res.json({"Error" : false, "Message" : "Success", "Users" : results});
            }
        });
    });

	router.delete("/users/:id",function(req,res){
        var query = "DELETE FROM ?? WHERE UserID=?";
        var table = ["userdata",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,results){
            if(err) {
		res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
		res.setHeader("Access-Control-Allow-Origin","*")
       		res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
                //res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                res.json({"Error" : false, "Message" : "Successfully deleted the User with ID "+req.params.id});
            }
        });
    });

	router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
        var table = ["userdata","UserID","UserName","Password","Name","City",req.body.UserID,req.body.UserName,md5(req.body.Password),req.body.Name,req.body.City];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });	

	router.put("/users",function(req,res){
        var query = "UPDATE ?? SET Password=?,City=? WHERE UserID = ?";
        var table = ["userdata",md5(req.body.Password),req.body.City,req.body.UserID];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for UserID "+req.body.UserID});
            }
        });
    });

}
	
module.exports = CRUD_ROUTER;
