var should = require('should')
  ;

  var test_string = 'hogehoge';


  describe('これはサンプルのテスト',function(){
  
	  it('ケース１',function(){
		  test_string.should.equal('hogehoge'); //これは成功
	  });
  
	  // it('失敗ケース',function(){
		  // test_string.should.equal('fuga');	//これは失敗
	  // });
	  it('後で実装');

  });
