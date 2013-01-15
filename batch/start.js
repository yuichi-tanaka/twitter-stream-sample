var twitter = require('../models/twitter_data')
  , mecab_parser = require('../models/parse_mecab')
  , term = require('../models/term')
  ;

   var ins = new term();
  // ins.create_new_term('hoge',function(status,id){
	  // console.log('id = ' + id);
  
  // });

  console.log('------ stream api parse start --------');

  var keys = ['kabu','toushi','nk255','kabushiki','kawase'];

  // mecabを使用してTwitterから取得したつぶやきを形態素解析する
  var mecab_parse_object = new mecab_parser();
  var mecab_parse_function = function(err,res){
	  ins.create_new_terms(res,function(status,id){
		  if(status === 'ok'){
			  console.log('new term id = ' + id );
		  }
	  });
  
  }

  // TwitterAPIのからのデータを受け付ける
  // 日本語圏の情報のみを解析
  var stream_parse_functions = {
	  data : function(data){
		  console.log('----- stream data-------');
		  if(data.lang === 'ja'){
			  // 日本語のみ解析
			  mecab_parse_object.parse(data.text,mecab_parse_function);
		  }
	  }
	  ,end : function(){
		  console.log('----- stream end-------');
	  }
	  ,destroy : function(){
		  console.log('----- stream destroy-------');
	  }
  }

  var stream = new twitter();
  stream.start(keys,stream_parse_functions);


