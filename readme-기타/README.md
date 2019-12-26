# AWS-IOT Project

## Operation Scenario

1. Demo Device/thing: Light Bulb - Node.js app
    - LED on/off
    - RGB LED color 변경
2. Demo Client service App - React Navive app
    - 전등 On/Off 표시
    - On/Off control
    - LED Color control

***

## To-Do list
* **done** aws iot: thing, device, shadow, job, rule 이해    
* **done** example 확인: "node_modules/aws-iot-device-sdk/examples/thing-example.js"
* **done** aws cli install 
* **done** AWS Cognito 이해 및 React test web app 작성
    - **done** cognito user pool cognito identity pool: 
      - Unauthenticated
      - Authenticated
    - **done** attach a policy to a principal identity
    - **done** cognito userPool + identity pool 을 이용하여 web에서 aws-iot를 접근    
* **done** IAM: Identity and Access Management
* **done** Cognito Web app + node.js device simulator 테스트
* **done half** aws iot + react
* **done** Amplify + React : **나중에 다시 해볼것** "test/amplify/README.md"
* **done** Amplify deploy: test/client-reactnative/example-amplify-deploy

* **Failed** aws iot + react native: test/reactnative/HelloReact   

* **IOT 외의 AWS 서비스활용한 model 모색**
    - aws-iot가 활성화 되고 있지 않는듯 하며, 보다 근본적으로 iot solution에 대한 사업성이 불확실함.
    - **AWS Amplify 활용한 Web Blog site 개발, AI/ML 서비스 활용 방안을 모색하는 것으로 방향을 선회**
    - f:\aws 에서 aws amplify + react 로 여러 서비스 확인할 것
    - **혹은 WordPress+ReactJS 로 Website 정도만 하든가**

***

## Source folder 설명

### AWS Iot using Web App

* test/aws-blog-demo: aws 공식 blog, authenticated cognito connection, pure web app

### AWS Iot device using Node.js

* test/device-nodejs
    - demo-device-shadow.js: myLight-class.js 를 활용한 shadow simulator
    - myLight-class.js: nodejs aws-iot-device-sdk module을 활용한 aws iot device, shadow 테스트용 클래스    

### AWS Iot using React

* test/client-reactjs
    - mylightapp/src/aws-iot-cognito: 
        - cognito-shadow: 인증 Authenticated 혹은 비인증 Unauthenticated connection 테스트
        - 비인증은 shadow connection 성공
        - 인증 connection은 실패: **failed: error during websocket handshake: unexpected response code: 403**

### Amplify Deploy Only

* test/amplify
    - js-app: Amplify javascript tutorial
    - test/amplify/js-app: test/amplify/README.md 참조
    - **Amplify는 AWS의 모든 서비스를 이용할 수 있는 Framework 및 Tool이다.**
    - **PubSub는 일부 기능일 뿐이다.**

* test/client-reactnative/example-amplify-deploy
    - **Amplify deploy 기능만을 활용**하여 Client app을 hosting까지 할 수 있음.

### AWS Iot using React Native and Amplify

* test/reactnative/HelloReact
    - react native: **working OK**
    - importing aws-sdk module : **no probleme**
    - importing aws-iot-device-sdk module : **Failed** - deprecated        
    -**Amplify Pubsub으로 해결해야 할듯**

***

## MyLight-node.js device: Registered Demo IoT Thing 

### 내용 설명

* Thing ARN: arn:aws:iot:ap-northeast-2:739751368964:thing/myLight
* REST API Endpoint: a1wgwyscoopcct-ats.iot.ap-northeast-2.amazonaws.com
* 보안 
    - directory:        ../secret/myLight/
    - CA 인증서:        ca-rsa2048-certificate.pem.crt
    - device 인증서:    f2840a83be-certificate.pem.crt
    - device secret:    f2840a83be-private.pem.key
* Policy 
    - name: myPolicy
    - JSON 문서
```js
/** 
 * ARM: arn:aws:iot:ap-northeast-2:739751368964:policy/myPolicy 
 * 버전 3 2019. 3. 12. 오전 11:14:24 업데이트됨
 */
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "iot:*",
      "Resource": "*"
    }
  ]
}
```

### Test code

* device-test-example-in-github.js : aws iot github 기본 예제

* shadow-test-device-app.js: shadow 기본 예제 테스트
  - JSON file에 상태 정보를 update 하여 aws iot의 shadow와 sync 하는 예제

* myLight-class.js myLight-app myLight-device.js : ThingsShadow test
  - aws-iot-device-sdk/examples/thing-example.js 을 수정함.

### demo-device.js

* Simple publish test
  - myLight thing으로 F:\aws-iot\test\client-reactjs\mylightapp\src\aws-iot-cognito-auth 과 대응하는 device app
  - publish demoTopic @ interval 2 seconds: **OK**

### demo-device-shadow.js
* myLight-class 를 수정: publish | subscribe 기능이 가능하도록
* shadow 객체가 device와 동일하게 동작하는지 확인 **OK**
* Reactjs에서 shadow 객체를 생성하여 device로 사용해야함. **PubSub를 react Component가 아닌 순순 class로 작성할 것**

***

## AWS-IOT Demo - Cognito Auth | UnAuth Connection

참조:
* browser: https://github.com/aws/aws-iot-device-sdk-js/blob/master/examples/browser/temperature-monitor/index.js
* nodejs: https://github.com/aws/aws-iot-device-sdk-js/blob/master/examples/thing-example.js


### UnAuthenticated Connection: *aws-iot-cognito/cognito-shadow.js*

* 참조: aws-iot-device-sdk\examples\browser\temperature-monitor\index.js

* cognito-unauth-device.js: **working OK**
* cognito-unauth-shadow.js: **working OK**


* Cognito Unauth procedure
    - userPool에 login 하지 않는다. 
    - AWS.config.credentials.get() 을 이용하여 quest id를 얻는다. AWS.config.credenditials.identidyId    
    - new AWS.CognitoIdentity().getCredendtialsForIdentity() => credentials를 얻는다.
```js
    var cognitoIdentity = new AWS.CognitoIdentity()
    AWS.config.credentials.get((error, data) => {
        if (error) {
            alert('ERROR in retrieving Identity' + error)
        } else {
            let params = {
                IdentityId: AWS.config.credentials.identityId
            }
            cognitoIdentity.getCredentialsForIdentity(params, (err, data) => {
                if (err) {
                    this.writeLog(err)
                    alert('ERROR in retrieving Credentials' + error)
                } else {
                    that.setState({ accessKeyId: getShortToken(data.Credentials.AccessKeyId) })
                    that.setState({ secretKey: getShortToken(data.Credentials.SecretKey) })
                    that.setState({ sessionToken: getShortToken(data.Credentials.SessionToken) })
                }
            })

        }
    });
```

* shadow.regiter **working OK**
    - **IAM Role-policy에 GetThingShadow 와 UpdateShadow 모두 allow 해야 함.**

### Authenticated Connection: *aws-iot-cognito/cognito-shadow.js*
* Cognito UserPool Login 시 필요한 정보
    - UserPoolId
    - ClientApp ClientId
    - username & password
* Cognito UserPool Login 성공 얻는 정보
    - IdToken
    - AccessToken
* Cognito IdentityPool Login 시 필요한 정보: IdToken
    - UserPoolId
    - IdentityPoolId
    - idToken received after UserPool Login

* **나머지는 Unauth와 동일**

* cognito-auth-shadow.js: **working OK**

* shadow 테스트
    - Connection: **working OK**
    - register thingName: **FAILED: Error during WebSocket handshake: Unexpected response code: 403**
    - **Unauth는 OK인데 왜 Auth는 문제인가?**

    
