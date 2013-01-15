var mysql_obj = require('../common_mysql');
var con;

var table_name = 'mst_term';

//sql
var get_by_term_sql = 'select * from ' + table_name + ' where term = ?';
var get_by_id_sql = 'select * from ' + table_name + ' where id = ?';

var create_new_term_sql = 'insert into ' + table_name + ' (term,create_datetime,update_timestamp) values(?,now(),now())';

var mst_term = module.exports = function(){
	con = new mysql_obj();
	
};

var get_by_term = function(term,func){
	con.exec(get_by_term_sql , [term], func);
}

var get_by_id = function(id,func){
	con.exec(get_by_id_sql , [id], func);
}

var create_new_term = function(term,func){
	con.exec(create_new_term_sql , [term],func);

}
mst_term.prototype.create_new_term = create_new_term;
mst_term.prototype.get_by_term = get_by_term;
