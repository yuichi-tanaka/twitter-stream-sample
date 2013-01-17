var mysql_obj = require('../common_mysql');
var con;

var table_name = 'trn_twitter';

var get_twitter_data_by_id_sql = 'select * from ' + table_name + ' where id = ? ';
var ins_twitter_data_sql = 'insert into ' + table_name + ' set ';
var common_sql = ',create_datetime = now(),update_timestamp = now(), status_code=1';

var trn_twitter = module.exports = function(){
	con = new mysql_obj();
	
}

var get_twitter_data_by_id = function(id,func){
	con.exec(get_twitter_data_by_id_sql, [id], func);
}

var ins_twitter_data = function(values , func){
	if(!values) throw new Error('the values is undefined');
	var set_string = '';
	for(var key in values){
		set_string += ','+con.escape(key) +' = ' + con.escape(values[key]);
	}
	ins_twitter_data_sql += set_string + common_sql;
	con.exec(ins_twitter_data_sql,[],func);
}

trn_twitter.prototype.get_twitter_data_by_id = get_twitter_data_by_id;
trn_twitter.prototype.ins_twitter_data = ins_twitter_data;
