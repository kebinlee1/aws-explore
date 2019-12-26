## Exploring AWS

### 개요
* Scope
    - aws 기본 이해: Cognito | API Gateway | Lambda | dynamoDB | S3 | Amplify
    - demo app: Using aws/aws-explore/react-demo
* Demo Project: aws 기본 기능을 활용하여 blog app 개발
* advanced: kinesis stream | AI | ML | DL 활용법

### 표시
* done | doing | todo

## To-Do List
* **done** S3 | DynamoDB | Api Gateway | *to-do CloudFormation*
* **done** Amplify Console
* **done** Cognito Auth | SignIn: *todo Identity Federated*
* Cognito Auth | SignIn => API Gateway 권한 연결
* **doing** Serverless-stack.com tutorial

* Amplify Framework using ReactJS:
* AI | ML | Face Recognition
* Amplify Framework using React Native
* 기타
    - AWS Serverless Multi-Tier Architecture 검토: *aws/docs/AWS_Serverless_Multi-Tier_Architectures.pdf*
    - Serverless Web App Build Example: [참조 페이지](https://aws.amazon.com/ko/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/)
    - Regular Expression
    - Domain 설정



## Serverless-stack.com Tutorial
참조: https://serverless-stack.com/

### 준비
* dynamoDB table : *notes::userid, noteid*
* S3 bucket: *notes-app-upload-kebin*
* userPool: note-user-pool
    - id: *ap-northeast-2_iqcnRg2yM*
    - arn: *arn:aws:cognito-idp:ap-northeast-2:739751368964:userpool/ap-northeast-2_iqcnRg2yM*
    - app client id: *6t678ttncp0go7a77oj710khsl*
    - 인증흐름 구성
        - *ALLOW_ADMIN_USER_PASSWORD_AUTH* : 인증을 위해 관리 API용 사용자 이름암호 인증 활성화 <br>
          => 튜토리얼은 *ADMIN_NO_SRP_AUTH* 을 체크하였으나 존재하지 않음.
        - *ALLOW_REFRESH_TOKEN_AUTH* (default)
    - domain name: https://notes-app-kebin
* Cognito Test(Admin) User
```bash
## 사용자 등록
aws cognito-idp sign-up \
  --region ap-northeast-2 \
  --client-id 6t678ttncp0go7a77oj710khsl \
  --username my@email.com \
  --password pw

## 관리자 몇령을 사용 사용자 신속히 확인
aws cognito-idp admin-confirm-sign-up \
  --region YOUR_COGNITO_REGION \
  --user-pool-id YOUR_COGNITO_USER_POOL_ID \
  --username admin@example.com
```

## Cognito Auth | SignIn | SignUp

### To-Do list
* **done** Cognito 사용자풀 Basics
    - **done** Cognito aws Cognito HostedUI SignIn **OK**: ignin try using *userPool > demo-pool* + *react-demo > aws/hosted-login*
    - API Gateway와 연동: API Gateway 항목에서...
    - *todo* 타사를 통한 로그인 | 보안관리(MFC 등) | 람다 트리거사용    

* **doing** Cognito 자격증명풀 IdentityPool Basices
    - *todo* 자격증명풀사용: 데이터세트 | 대량으로 데이터 게시 | 푸시 동기화 활성화 | Cognito 스트림 | Cognito 이벤트 설정 | Cognito Sync
    - *todo* 역할 기반 액세스 제어를위한 모범사례
    - **FAILED- Amplify에 예제코드 없음** 사용자풀 token으로 accessKeyID | secretAccessKey 입수하기 react-demo/aws/hosted-login

* Cognito Sync
* Google | Facebook login 
* aws Cognito Custom UI Signin


### Cognito 사용자풀 UserPool Basics

#### UserPool 이란
* 참조: https://docs.aws.amazon.com/ko_kr/cognito/latest/developerguide/cognito-user-identity-pools.html
* 가입 및 로그인 서비스
* 내장 사용자 지정 웹 UI
* Facebook, Google, Login with Amazon을 통한 소셜 로그인 및 사용자 풀의 SAML 자격 증명 공급자를 통한 로그인.
* 사용자 디렉터리 관리 및 사용자 프로필.
* 멀티 팩터 인증(MFA), 이상 있는 자격 증명 확인, 계정 탈취 보호, 전화 및 이메일 확인과 같은 보안 기능.
* AWS Lambda 트리거를 통한 사용자 지정 워크플로우 및 사용자 마이그레이션.
* 인증 후 Amazon Cognito는 JSON 웹 토큰(JWT: idToken | accessToken | refreshToken)을 발행하며,     
    - 이를 사용하여 고유 API에 대한 액세스 보안 및 자격 증명을 수행하거나 
    - AWS 자격 증명으로 교환합니다.
* Tokens: JWT | OIDC 표준: Amazon Cognito > 사용자풀 > 인증 > 토큰 사용
    - idToken: name, email, phone_number 등의 클레임 포함, 한시간 지나면 만료
    - accessToken: API작업 승인 | 사용자속성 추가/변경/삭제 | access 제어결정, 사용자의 작업을 승인
    - refreshToken: 사용자풀에 로그인 후 30일후 만료
* 로그인 후 리소스 액세스:
    - AWS 밖의 자체 백엔드 리소스 액세스: UserPool > 앱통합 > 리소스 서버
    - API Gateway 연동: https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html
    - AWS 자격증명풀을 사용하여 AWS리소스 액세스

#### Cognito aws HostedUI UserPool Signin
* react-demo: /aws/hosted-login
* 참조: https://aws-amplify.github.io/docs/js/authentication OAuth and Federation Overview > React Component

* **OK** **접속 Error** demo-pool 의 redirecturl localhost:8000 => localhost:3000 으로 수정하여 해결
* **OK** **Client is not enabled for OAuth2.0 flows.** amplify OAuth 사용에 따른 Error? => redirectUri 에서 "/" 없애니 해결됨

* 사용자풀 > 앱통합 > 앱클라이언트 설정 > 호스팅UI시작 에서의 URI: <br/>
/login?client_id=4n7knuejdc6i70jfs6a9rs6jq8&response_type=code&scope=email+openid&redirect_uri=http://localhost:3000
* react-demo > aws/hosted-login 에서의 URI: <br>
/login?redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&client_id=4n7knuejdc6i70jfs6a9rs6jq8&identity_provider=COGNITO&scopes=email%2Copenid&state=ebwu5MgYAFSECEMJGcW2SssF1ZUr0dYg&code_challenge=XYFDBcxS8OCe7ahNkyLHGiCJcUKlERVRof6psOlb2l8&code_challenge_method=S256

#### Cognito 사용자풀 Custom UI Signin
* react-demo: /aws/login
* 참조: https://serverless-stack.com/chapters/ko/login-with-aws-cognito.html

### Cognito 자격증명풀 Basics
* 참조: https://docs.aws.amazon.com/ko_kr/cognito/latest/developerguide/cognito-identity.html
* 사용자의 고유한 자격증명을 만들고 자격증명 공급자(Cognito사용자풀 | Amazon | Facebook | Google) 와 연동
* 자격증명풀로 권한이 제한된 (임시) AWS 자격증명을 얻어 AWS 서비스에 액세스 가능
* 자격증명풀 생성: 풀이름 | 인증공급자 구성 | Auth, UnAuth 사용자의 역할 설정 ==> *demo identity pool* 사용


## ApiGateway

### To-Do List
* **done** 개발자 안내서: Lambda 통합으로 REST API 생성 => *react-demo/aws/api*
* **done** 개발자 안내서: Lambda 프록시 통합 사용 => *react-demo/aws/api*
* **done** 개발자 안내서: 모의 통합 => *react-demo/aws/api*
* API에 권한 부여: */api/v1/admin* cognito 와 연동하기

### my-api 구성
* /GET -> hello-lambda : 람다 프록시 통합
* /hello-lambda2 -> hello-lambda2 : 람다 프록시 비통합
* /helloworld -> GetStartedLambdaProxyIntegration : 람다 프록시 통합
* /moc-integration : Moc 통합


### API Gateway의 기능은?
* WebSocket | REST Api 지원
* 인증 메카니즘: IAM, Lambda Policy, Cognito
* 개발자 포털
* canary 릴리스 배포
* CloudTrail 로깅 및 모니터링
* CloudWatch 엑세스 로깅
* CloudFormation 템플릿 사용 API생성 활성화
* 사용자 지정 도메인 지원
* AWS WAF | AWS X-Ray 통합

### 개발자 안내서 - Lambda 통합으로 REST API 생성
참조: https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/apigateway-getting-started-with-rest-apis.html

#### API info
* name: my-api 
* url: https://dhnk799383.execute-api.ap-northeast-2.amazonaws.com/prod

#### 설명

1. Lambda 함수 생성(기본으로)

1. API Gateway 콘솔에서 REST API 생성하기
    - API Gateway 콘솔에서 API 생성 선택
    - 프로토콜 REST | 새 API 선택
    - API 이름 my-api | region
    - API생성 선택
    - 리소스 "/" > 작업 드롭다운 > **메서드 생성**
    - /드롭다운 > GET 선택 > 확인 Check box > 저장
    - /-GET- setup 창의 통합유형에서 
        - Lambda 함수 선택
        - **Lambda 프록시 통합사용** | Lambda region 선택
        - Lambda 함수 입력 (hello-lambda) 선택 | Use Default Timeout 선택 | 저장
        - *Lambda 함수에 대한 권한 추가* 팝업 확인 클릭
        - /-GET- Method Execution 창이 보임: *통합응답* 상자가 회색으로 표시

1. API Gateway 콘솔에서 REST Api 배포
    - 작업 메뉴에서 API배포 선택
    - 배포스테이지 메뉴에서 새단계 | prod 입력 | 배포 클릭
    - 스테이지 prod URL 호출: https://dhnk799383.execute-api.ap-northeast-2.amazonaws.com/prod

1. 두번째 Lambda 함수 생성
    - 람다함수 2 생성 - "hello-lambda2"

1. API gateway 에 REST API 리소스 메서드 파라미터 추가: 하위 리소드 만들어보기 - GET
    - my-api 선택 >  "/" 선택 > 작업드롭다운 > **리소스생성**
    - 리소스이름 "hello-lamda2" > 리소스생성
    - 작업드롭다운 > 메서드생성 > 리소스이름 아래 드롭다운메뉴 > GET 체크박스 확인하여 저장
    - /hello-lambda2 -GET- 창의 통합유형 
        - Lambda 함수 체크 > 리전 > 림다함수 hello-lambda2 선택 > 저장
        - **Lambda 프록시 통합사용 해제**
        - *Lambda 함수에 대한 권한 추가* 팝업 확인 클릭
        - */hello-lambda2 -GET- 메서드실랭* 창이 보임: *통합응답* 상자가 회색으로 표시되지 않음.
    - *통합요청* 클릭
        - 매핑템플릿 확장
        - 요청본문 패스스루 > 정의된 템플릿이 없는 경우(권장) 체크 > 매핑템플릿 추가
        - 작업유형 Content-Type > "application/json" 입력 및 확인 체크
        - 탬플릿생성 창에 입력: { "myParam": "$input.params('myParam')" } > 저장
    - 작업드롭다운 > API배포 > 배포스테이지 > prod 선택 > 배포

1. 테스트
    - 브라우저 url 입력시 **OK**
    - **Solved** react-demo ApiGateway.js 에서 axios 사용하여 axax call 시 **"/hello-lambda2?myParam=xxx" CORS ERROR**
    - 해결 참조
        - https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/how-to-cors.html
        - https://stackoverflow.com/questions/53182395/api-gateway-blocked-by-cors-policy-no-access-control-allow-origin-header

1. Lambda 프록시 통합 / 비통합의 차이
    - 람다함수에 넘어오는 event obj의 차이
    - 통합의 경우: event가 그대로 람다함수에 전달된다. Api는 패스스루
    - 비 통합의 경우(혹은 사용자 지정 통합): API Gateway 통합 요청 > 매핑 템플릿에서 event를 재 정의 한다.   
    - 결국 람다 프록시는 람다함수 앞에 존재하는 **실제 프록시 서버**를 의미하는 것으로 보인다. 즉 API의 세팅에 의거하여 람다함수의 event 객체를 재정의 하는 역할을 한다.

**CORS Solution**
```js
//
// CORS solution
//

// at react-demo/src/pages/examples-aws  axios function
    get(e.target.getAttribute("url-src"),
        {
          crossdomain: true
        })

//
// at api gateway /hello-lambda2
set CORS option

// at lambda function hello-lambda2
    const response = {
        statusCode: 200,
        headers: {
            // "Access-Control-Allow-Method": "OPTIONS, GET, POST",
            "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Headers": "Content-Type",
            // "Content-Type": "application/json, text/plain",
            
        },
        body: JSON.stringify(event),
        // body: "Is it working?",
    };

```
    

#### Lambda 함수
```js
//
// 등록된 Lambda 함수들
//

// hello-lambda
exports.handler = async (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: "hello Lammda and API Gate"
    };
    return response;
};

// my-function2
exports.handler = async (event) => {
    // TODO implement
    let myParam = event.myParam;
    const response = {
        statusCode: 200,
        body: JSON.stringify(myParam),
    };
    return response;
};

// hello-lambda2
exports.handler = async (event) => {
    let myParam = event.myParam;
    const response = {
        statusCode: 200,
        body: JSON.stringify(myParam),
    };
    return response;
};
```




### 개발자 안내서 - Lambda 프록시 통합 사용
* 참조: https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html
* url: https://dhnk799383.execute-api.ap-northeast-2.amazonaws.com/test
* respose에 lambda 함수의 event (*data.input*)가 포함되어 있어서 참조할 것 

```bash
## call api
curl -v -X POST \
  'https://dhnk799383.execute-api.ap-northeast-2.amazonaws.com/test/helloworld?name=John&city=Seattle' -H 'content-type: application/json' -H 'day: Thursday' -d '{ "time": "evening" }'
```

### 개발자 안내서: 모의 통합
* 참조: https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/apigateway-getting-started-mock.html
* api 생성 > 메서드 생성 > 통합유형 Mock 선택
* api name: *my-api/moc-integration*


### Cognito 사용자풀 인증 + API Gateway 연동

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




