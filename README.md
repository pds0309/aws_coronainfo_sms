# AWS_CoronaInfo_SMS
----------------
Daily South Korea Corona Information Text Notification Service Using AWS for learning aws computing instance.

AWS 를 활용한 일일 코로나 정보 문자메시지 알림 서비스

### 일시
--------------
2020.12.01~2020.12.03

### 소개
--------------
<img src="/img/img1.png" width="300" height="300">
<img src="/img/result.jpg" width="300" height="300">

사용자가 웹 페이지를 통해 휴대폰번호를 인증하고 등록하면 매일 오전 10시 30분마다
해당날짜의 코로나 정보를 메시지로 수신

### 활용
----------
* AWS Lambda
* AWS EC2 - ubuntu linux 16.04 instance
* AWS Elastic Beanstalk
* AWS RDS
* Amazon Simple Notification Service
* Node.js
* ASP.NET

### 후기
-----------

* SMS 인증을 Amazon Cognito 로 대체하면 간편할 것 같다.
* 애플리케이션으로 배포하여 푸쉬 알림서비스로 만들면 더 효율적일 것이다.
* 마이크로서비스라는 것과 클라우드 서비스 아키텍쳐에 대한 이해도가 부족한 것 같다. 서비스 아키텍쳐를 보다 효율적으로 설계할 수 있어야한다.

  
<img src="/img/img2.png" width="300" height="300">


### 개선할 사항
------------
* 주말에 해당 웹 사이트의 코로나 정보 갱신이 예정시간보다 늦을 때가 있어 알림 시간을 유동적으로 바꿔야 할 필요가 있다.
* EC2 학습을 위해 R 서버를 만들고 웹 스크래핑 스크립트를 구성했었는데 코로나 정보 오픈 API로 대체해서 간소화할 예정
* aws 프리티어 사용기간이 곧 종료됨 (2021.02.17 기준)
	* 복습 차원에서 처음부터 다시 새롭게 구성

