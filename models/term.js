var db = require('./db/mst_term');
var mst_term;


var term = module.exports = function(){
	mst_term = new db();

};

var create_new_term = function(term,func){
	mst_term.get_by_term(term,function(err,rows,fields){
		if(rows.length > 0){
			console.log('select length > 0');
		       	console.log('row id = ' + rows[0].id);
			if(func) func('ok',rows[0].id);
			return;
		}
		_create_new_term(term,func);
	});
}

var create_new_terms = function(terms,func){
	if(!terms instanceof Array) throw new Error('parameter error ; terms is no Array');
	console.dir(terms instanceof Array);
	if(terms.length <= 0) return;
						    
	var term = terms.pop();
	create_new_term(term,function(){
		func('ok',rows[0].id);
		create_new_terms(terms,func);
	});
}

var _create_new_term = function(term,func){
	mst_term.create_new_term(term,function(err,result){
		if(err) throw err;
		func('ok',result.insertId);
	});
};

term.prototype.create_new_term = create_new_term;
term.prototype.create_new_terms = create_new_terms;
