## Exploring AWS

Go Back again to site-building after exploring AWS

## ApiGateway
### To-Do List
* **working** 개발자 안내서
    - **done** api gateway & Lambda execution
    - **todo 4단계** https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/apigateway-getting-started-with-rest-apis.html
    

### API Gateway 기능
* WebSocket | REST Api 지원
* 인증 메카니즘: IAM, Lambda Policy, Cognito
* 개발자 포털
* canary 릴리스 배포
* CloudTrail 로깅 및 모니터링
* CloudWatch 엑세스 로깅
* CloudFormation 템플릿 사용 API생성 활성화
* 사용자 지정 도메인 지원
* AWS WAF | AWS X-Ray 통합

### API Gateway 시작하기 - my-api
* name: my-api 
* lambda: hello-lambda
* url: https://dhnk799383.execute-api.ap-northeast-2.amazonaws.com/prod



## AWS Cli
### To-Do List
* aws configure
* aws lambda
* aws s3
 
## DynamoDB

### To-Do List
* **ERROR in amazon-cognito-identity-js module** Cognito Code: **IAM user kebin-s3 사용**
* **done** [예제 따라하기](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/GettingStarted.JavaScript.html)
    - Create Table | Loading data | get Item | Query Data 

## S3 photo album
### To-Do list
* tutorial 따라하기 : 브라우저에서 Amazon S3 버킷의 사진 보기 [AWS tutorial](https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v2/developer-guide/s3-example-photos-view.html)    
* **done** bucket 생성 > cognito userPool > Policy creation > CORS > Album creation and photo upload
* **done** List album
* **done** view album: ==> photoList | photo view
* **image loading 403 error** IAM 수정하여 해볼것

### S3 Access deny error
* IAM에서 bucket name을 잘못 입력하여 발생함. Bucket name 수정후 OK
* **viewPhoto 에서 403 error** bucket을 public으로 변경하여 해결
* IAM 수정하여 다시 해볼것: 
* **IAM vs Bucket Policy vs ACL**: https://aws.amazon.com/ko/blogs/security/iam-policies-and-bucket-policies-and-acls-oh-my-controlling-access-to-s3-resources/

### S3 photo upload 환경셋업
* IAM Role Policy: React_Demo_S3_Policy_UnAuth
```js
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Action": [
            "s3:DeleteObject",
            "s3:GetObject",
            "s3:ListBucket",
            "s3:PutObject"
         ],
         "Resource": [
            "arn:aws:s3:::kebin-photo-album/*"
         ]
      }
   ]
}
```

* S3 bucket CORS 구성
```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>DELETE</AllowedMethod>
        <AllowedMethod>HEAD</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

### S3: cloud storage
* **done** bucket 생성
* **done** 매뉴얼 파일 업로드 | 다운로드 : templated 폴더 파일 사용: Unzip이 안됨
* **done** node.js handling upload | download : aws-explore/s3/s3.js


## Lambda
### To-Do List
* **done** simple function
* **dnoe** **Failed** [예제-S3와 사용 따라하기](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/with-s3-example.html)
    - ==> 함수에 정책이 없어서인 듯....
    - 이것도 아니네... 다른 튜토리알 볼 것
* **doing** https://gompro.postype.com/post/1603351
* https://velog.io/@leejh3224/%EC%9E%91%EC%84%B1-%EC%A4%91-AWS-Lambda-%EA%B3%A0%EC%98%A4%EA%B8%89-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-1
* https://velog.io/@leejh3224/AWS-Lambda-%EA%B3%A0%EC%98%A4%EA%B8%89-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-2-umjn6lomim

### Example
1. 실행 역할 만들기: IAM
1. bucket 생성 및 샘플 이미지 업로드
1. 함수 만들기: local에서 배포 패키지 만들고 zip
1. **FAILED** Cli를 사용하여 Lambda함수 생성 | 제한시간 늘리기 | 테스트 
```bash
## create function
$ aws lambda create-function --function-name CreateThumbnail \
--zip-file fileb://lambda-s3.zip --handler index.handler --runtime nodejs12.x \
--timeout 10 --memory-size 1024 \
--role arn:aws:iam::739751368964:role/lambda-s3-role

## 제한시간 늘리기
$ aws lambda update-function-configuration --function-name CreateThumbnail --timeout 30

## 함수 테스트
$ aws lambda invoke --function-name CreateThumbnail --invocation-type Event \
--payload file://imageResizedEvent.json outputfile.txt
```

## CloudFormation

## Face Recognition