var ev = require('events').EventEmitter
  , ntwitter = require('ntwitter')
  , http = require('http')
  , twitter_config = require('../config/twitter')
  ;

  // このアクタは渡されたハッシュタグのツイートを取得する
  // 渡された関数の連想配列をcallbackする
  var _constructor = function(){
  	this.filters = [];
	this.stream_open_date ;
	this.stream_close_date;
	this.message_count = 0;
  }

  // このメソッドはTwitterのStreamAPIの取得を開始します。
  // 引数に取得したいハッシュタグ、callbackの関数リストを受け取ります
  // callbackはdata,end,destroyの名称のjson形式で渡せます。
  var start = function(hashtags,fncs){
	  console.log('----- event start -------');
	 var twitter = new ntwitter({
		 consumer_key : twitter_config.consumer_key
		 ,consumer_secret: twitter_config.consumer_secret
		 ,access_token_key: twitter_config.access_token_key
		 ,access_token_secret: twitter_config.access_token_secret
	 
	 });
	 var filter_keyword = (_parse_hash_tag(hashtags)).substr(1);
	 this._set_filters(hashtags);
	 var _f = function(data){fncs.data(data);};
	 twitter.stream('statuses/filter',{'track': filter_keyword},function(stream){
		console.log('----------------connection start ----------------------');
		console.log('----------------keys  =  ' + filter_keyword);
		if(typeof fncs.data === 'function') _added_to_data_event(stream,_f);
		if(typeof fncs.destroy === 'function') _added_to_destroy_event(stream,fncs.destroy);
		if(typeof fncs.end === 'function') _added_to_end_event(stream,fncs.end);

	 });
  }
  // このメソッドは渡されたハッシュタグのリストをカンマ区切りの文字列にして返す
  var _parse_hash_tag = function(hashtags){
  	if(!hashtags || (hashtags.length <= 0)) return '';
	var tags_string = '';
	for(var i = 0; i<hashtags.length;i++){
		tags_string += ',' + hashtags[i];
	}
	return tags_string;
  }
  // このメソッドはツイッターstreamAPIにdataイベントを追加します
  var _added_to_data_event = function(stream,func){
	  stream.on('data',func);
  }
  // このメソッドはツイッターstreamAPIにendイベントを追加します
  var _added_to_end_event = function(stream,func){
	  stream.on('end',func);
  
  }
  // このメソッドはツイッターstreamAPIにdestroyイベントを追加します
  var _added_to_destroy_event = function(stream,func){
	  stream.on('destroy',func);
  }
  // このメソッドは開始日に日付をセットします
  var _set_stream_open_date = function(){
  	this.stream_open_date = new Date();
  }
  // このメソッドは終了日に日付をセットします
  var _set_stream_close_date = function(){
  	this.stream_close_date = new Date();
  }
  // このメソッドはstreamをフィルタ中のkeyリストをセットします
  var _set_filters = function(filters){
  	this.filters = filters;
  }
  // このメソッドは取得したメッセージのcountを１増やします
  var _add_message_count = function(){
  	this.message_count++;
  }
  var get_stream_open_date = function(){return this.stream_open_date;}
  var get_stream_close_date = function(){return this.stream_close_date;}
  var get_message_count = function(){return this.message_count;}
  var get_filters = function(){return this.filters;}
  
  var twitter_data = module.exports = _constructor;
  twitter_data.prototype.start = start;
  twitter_data.prototype.get_stream_open_date = get_stream_open_date;
  twitter_data.prototype.get_stream_close_date = get_stream_close_date;
  twitter_data.prototype.get_message_count = get_message_count;
  twitter_data.prototype.get_filters = get_filters;
  twitter_data.prototype._set_stream_open_date = _set_stream_open_date;
  twitter_data.prototype._set_stream_close_date = _set_stream_close_date;
  twitter_data.prototype._add_message_count = _add_message_count;
  twitter_data.prototype._set_filters = _set_filters;
  
