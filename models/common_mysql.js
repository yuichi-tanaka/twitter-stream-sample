var mysql = require('mysql');
var con; 


var common_mysql = module.exports = function(confs){
	_create_new_connection();
}

var exec = function(sql,params,func){
	if(!con){
		console.log('create new connection before execute');
	       	_create_new_connection()
	}
	if( !params instanceof Array) throw new Error('sql parameter is not Array');
	con.query(sql,params,func);
}

var close = function(){
	if(!con) return;
	con.end();
}

var _create_new_connection = function(){
	if(con) return;
	con = mysql.createConnection({host:"192.168.56.101",user:"root",password:"nbu_dev",database:"twitter_db"});
}

// exec("select 1",[],function(err,rows,fields){
	// console.dir(rows);
	// console.log('call select!');
	// close();
// });
//

common_mysql.prototype.exec = exec;
common_mysql.prototype.close = close;
