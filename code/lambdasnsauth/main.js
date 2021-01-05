/* 사용자가 웹페이지에서 전화번호를 등록할 때 3분간 유효한 4자리의 인증번호를 발송함 */
/* 임시로 DB로 인증을 구성함. */
const AWS = require('aws-sdk');
var mysql = require('mysql');
const randomstring = require('randomstring');
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
  conn.query('select * from pathu order by id desc', function(error,results,fields){
			conn.release();
			if(error) callback(error);
			else {
			    const confirmmsg = randomstring.generate({length:4 , charset: 'numeric'});
			    var params = 
			    {
			    	Message: "인증번호는[" + confirmmsg + "]입니다.",
        			PhoneNumber: "+82" + results[0].pnumber
			    };
			    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31',region: 'ap-northeast-1'}).publish(params).promise();
			    publishTextPromise.then(
        function(data) {
        	callback(null , confirmmsg);
        }).catch(
        function(err) {
            callback(err);
    });}});});};