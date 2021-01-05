/* AWS Lambda에서 RDS mysql 인스턴스 연결하기  - 코로나 정보 */
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
  conn.query('select * from corona order by id desc', function(error,results,fields){
			conn.release();
			if(error) callback(error);
			else {//console.log('DB Conneceted:', JSON.stringify(event, null, 2));
					context.succeed("확진자:"+results[0].infesum+"▲"+results[0].infetoday+
					" 검사자:"+results[0].insfsum+"▲"+results[0].insftoday+
					" 격리해제:"+results[0].relsum+"▲"+results[0].reltoday+
					" 사망자:"+results[0].deadsum+"▲"+results[0].deadtoday
					);}
	});
});
};