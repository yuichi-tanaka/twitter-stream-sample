var trn_twitter_db = require('./db/trn_twitter');
var trn_contained_term_ids_db = require('./db/trn_contained_term_ids');
var trn_twitter;
var trn_contained_term_ids;

var twitter = module.exports = function(){
	trn_twitter = new trn_twitter_db();
	trn_contained_term_ids = new trn_contained_term_ids_db();
};

var create_new_twitter_data = function(tweet_data,contained_term_ids,func){
	var twitter_obj = {
		tweet_id : tweet_data.id_str
		,twitter_user_id : tweet_data.user.id_str
		,twitter_create_at : tweet_data.created_at
		,text : tweet_data.text
	}
	var contained_term_obj = {}
}


