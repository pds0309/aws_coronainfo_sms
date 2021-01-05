/* AWS Lambda에서 RDS mysql 인스턴스 연결하기 - 등록된 전화번호*/
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'YOURDB.xxxxxxxx.ap-northeast-2.rds.amazonaws.com',
	user: 'YOURID',
	password: 'YOURPW',
	database: 'YOURDB',
	port: 1433
	/* your port */
});
exports.handler = function(event, context, callback) {
	context.callbackWaitsForEmptyEventLoop = false;
	pool.getConnection(function(err , conn) {
  conn.query('select * from phone', function(error,results,fields){
			conn.release();
			if(error) callback(error);
			else {//console.log('DB Conneceted:', JSON.stringify(event, null, 2));
			var x = "";
			for(var i = 0 ; i < results.length ; i ++){
				x = x + results[i].pnumber;
			}
					context.succeed(x);				
			}
	});
});
};