var db = require('./db/mst_term');
var ev = require('events').EventEmitter;
var mst_term;


var term = module.exports = function(){
	mst_term = new db();
};
term.prototype = new ev();

//渡されたワードをmst_termテーブルから参照し、テーブルにワードが無ければ追加
term.prototype.create_new_term = function(word,func){
	console.log('ins term = ' + word);
	mst_term.get_by_term(word,function(err,rows,fields){
		if(err) throw new Error('get terms error');
		if(rows && rows.length > 0){
			this.emit('created_term','ok',rows[0].id);
			if(typeof func === 'function') func('ok',rows[0].id);
			return;
		}
		_create_new_term(this,word,func);
	});
}

//ワードリストを受け取り、其々のワードに付いて再帰的に処理するためのcreate_new_termの再帰ラッパ
term.prototype.create_new_terms = function(terms){
	var self = this;
	if(!terms instanceof Array) throw new Error('parameter error ; terms is no Array');
	if(terms.length <= 0) {
		console.log('event fire?');
		this.emit('create_finish','ok');
		return;
	}
	var term = terms.pop();
	if(term[1] !== '名詞'){
		//名詞以外はスキップ
		self.create_new_terms(terms);
		return;
	}
	this.create_new_term(term[0],function(res,term_id){
		//再帰
		self.create_new_terms(terms);
	});

}

//新規のワードをmst_termテーブルに追加
var _create_new_term = function(self,term,func){
	mst_term.create_new_term(term,function(err,result){
		if(err) throw err;
		console.log('[!!new] row id = ' + result.insertId);
		if(typeof func === 'function') func('ok',result.insertId);
		self.emit('created_term','ok',result.insertId);
	});
};

//term.prototype.create_new_term = create_new_term;
//term.prototype.create_new_terms = create_new_terms;
