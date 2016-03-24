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

}
	
module.exports = CRUD_ROUTER;