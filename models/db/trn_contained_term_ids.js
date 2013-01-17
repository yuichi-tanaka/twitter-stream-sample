var mysql_obj = require('../common_mysql');
var con;

var table_name = 'trn_contained_term_ids';

var get_contained_tweet_by_id_sql = 'select * from ' + table_name + ' where trn_twitter_id = ? ';
var get_contained_term_by_id_sql = 'select * from ' + table_name + ' where mst_term_id = ? ';
var ins_contained_term_sql = 'insert into ' + table_name + ' set ';
var common_sql = ',create_datetime = now(),update_timestamp = now(), status_code=1';

var trn_contained_term_ids = module.exports = function(){
	con = new mysql_obj();
}

var get_contained_tweet_by_id = function(trn_twitter_id,func){
	con.exec(get_contained_tweet_by_id_sql, [trn_twitter_id], func);
}
var get_contained_term_by_id = function(mst_term_id,func){
	con.exec(get_contained_term_by_id_sql, [mst_twitter_id], func);
}

var ins_contained_term = function(values , func){
	if(!values) throw new Error('the values is undefined');
	var set_string = '';
	for(var key in values){
		set_string += ',' + key +' = ' + con.escape(values[key]);
	}
	ins_contained_term_sql += set_string + common_sql;
	con.exec(ins_contained_term_sql,[],func);
}

trn_contained_term_ids.prototype.get_contained_tweet_by_id = get_contained_tweet_by_id;
trn_contained_term_ids.prototype.get_contained_term_by_id = get_contained_term_by_id;
trn_contained_term_ids.prototype.ins_contained_term = ins_contained_term;
