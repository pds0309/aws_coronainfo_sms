/* 등록된 전화번호 DB와 코로나 정보 DB를 연결한 Lambda함수를 호출하는 함수 */
/* 매일 일정한 시각에 해당 함수가 호출된다(등록된 전화번호로 코로나 정보 메시지를 전송한다) */

var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var lambda = new AWS.Lambda();

exports.handler = function(event, context, callback) {
  var paramsForDB = {
    FunctionName: 'lambdards',
    InvocationType: 'RequestResponse',
    LogType: 'Tail'
  };
  var paramsForUser = {
    FunctionName: 'lambdardsuser',
    InvocationType: 'RequestResponse',
    LogType: 'Tail'
  };
  
  lambda.invoke(paramsForDB, function(err, data) {
    lambda.invoke(paramsForUser, function(errr,data2){
    if (err) {
      context.fail(err);
      
    } else {
      var paramsForSMS = [];
      var x = "";
      for(var i = 1; i < data2.Payload.length-1; i ++){
        x = x + data2.Payload[i];
        if(i % 10 == 0){
            paramsForSMS.push({Message :data.Payload+"" , PhoneNumber:"+82" + x});
            callback(null,x);
            x = "";
        }
      }
      for(var j = 0 ; j < paramsForSMS.length ; j ++){
          var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31',region: 'ap-northeast-1'}).publish(paramsForSMS[j]).promise();
      }
  publishTextPromise.then(
        function(data) {
            callback(null,"MessageID is " + data.MessageId);
        }).catch(
        function(err) {
            callback(err);
    });
    } 
  });});
   
};