
var MeCab = new require('../node_modules/node-mecab-async/mecab')
  , mecab = new MeCab()
  ;

  // このアクタは渡されたテキストをmecabでパースして形態素解析の結果を返します
  var _constructor = function(){}
  var parse = function(text,func){
  	mecab.parse(text,func);
  }

  var parse_mecab = module.exports = _constructor;
  parse_mecab.prototype.parse = parse;
