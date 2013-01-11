var should = require('should')
  , target = require('../models/twitter_data')
  ;

  describe('ツイッターデータの取得',function(){
	  it("Twitterオブジェクトはnullじゃないよ",function(){
	  	var twitter = new target();
		should.exist(twitter);
	  });
	  // it("Twitterオブジェクトは設定情報情報を持ってる",function(){
		  // var twitter = new target();
		// twitter.should.have.property('consumer_key');
		// twitter.should.have.property('consumer_secret');
		// twitter.should.have.property('access_token_key');
		// twitter.should.have.property('access_token_secret');
	  // });
	  // it("Twitterオブジェクトの設定情報情報は空じゃない",function(){
		  // var twitter = new target();
		// should.notEqual(twitter.consumer_key,'');
		// should.notEqual(twitter.consumer_secret,'');
		// should.notEqual(twitter.access_token_key,'');
		// should.notEqual(twitter.access_token_secret,'');

	  // });
	  describe("Twitterオブジェクトのstreamからデータ取得を開始する",function(){
	  	var twitter = new target();
		var keys = ['kabu','toushi','nk255','kabushiki','kawase'];
		var cnt = 0;
		var funcs ={
			"data":function(data){
			}
			,"end" : function(){}
			,"destroy" : function(){}
		}
		twitter.start(keys,funcs);
		it("開始したkeyが取得できる",function(){
			var filter_cnt = twitter.get_filters();
			filter_cnt.should.have.length(keys.length);
		});
	  });
  });
