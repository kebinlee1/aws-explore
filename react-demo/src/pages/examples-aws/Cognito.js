import React from 'react';
// import * as AWS from 'aws-sdk/global'
import AWS from 'aws-sdk'
// import AWSIoTData from 'aws-iot-device-sdk'
import {
    CognitoUserPool,
    // CognitoUserAttribute,
    AuthenticationDetails,
    CognitoUser,
} from 'amazon-cognito-identity-js';

import conf from '../conf'

//////////////////////////////////////////////////////////////////////////////////
// var Api = new IotApi()



class LoginExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            logMsg: '',
            idToken: '',
            accessToken: '',
            identityId: '',
            accessKeyId: '',
            secretKey: '',
            sessionToken: '',
        };
        
        this.loginIdentityPool = this.loginIdentityPool.bind(this)
        this.connectAuth = this.connectAuth.bind(this)
        this.writeLog = this.writeLog.bind(this)
    }

    componentDidMount() {
    }

    loginIdentityPool(result) {
        let that = this

        AWS.config.region = conf.awsConfig.region;

        //
        // idPool에 로그인할 data obj
        //
        let login = {}

        //
        // userPoolId required as login key to iDPool
        //
        let loginKey = 'cognito-idp.' + AWS.config.region + '.amazonaws.com/' + conf.awsConfig.Coginoto.UserPoolId;

        //
        // authUser에서 받은 IdToken
        //
        login[loginKey] = result.getIdToken().getJwtToken();

        //
        // Login to IdentityPool using IdToken
        //
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: conf.poolData.IdentityPoolId, // your identity pool id here
            Logins: login,
        });


        AWS.config.credentials.refresh(error => {
            if (error) {
                console.error(error);
            } else {

                alert('Successfully logged using AWS.CognitoIdentityCredentials()')

                that.setState({ identityId: AWS.config.credentials.identityId })
                that.setState({ accessKeyId: AWS.config.credentials.accessKeyId })
                that.setState({ secretKey: AWS.config.credentials.secretAccessKey })
                that.setState({ sessionToken: AWS.config.credentials.sessionToken })

                // that.setState({ identityId: Api.getShortToken(AWS.config.credentials.identityId) })
                // that.setState({ accessKeyId: Api.getShortToken(AWS.config.credentials.accessKeyId) })
                // that.setState({ secretKey: Api.getShortToken(AWS.config.credentials.secretAccessKey) })
                // that.setState({ sessionToken: Api.getShortToken(AWS.config.credentials.sessionToken) })

                that.setState({ isLoggedIn: true })

                that.creadentialsData = AWS.config.credentials
                // Api.attachPrincipalPolicy('demo-policy', AWS.config.credentials.identityId)
                // that.connectMqtt()
            }
        });

        // this.shadows = shadows
    }

    connectAuth() {

      let that = this

      let poolData = {
          UserPoolId: conf.awsConfig.Coginoto.UserPoolId,
          ClientId: conf.awsConfig.Coginoto.ClientId
      }
      let userPool = new CognitoUserPool(poolData)

      let userData = {
          Username: conf.awsConfig.tempUser.name, // sign-up한 name
          Pool: userPool
      }

      // temperary user for test
      let authenticationData = {
          Username: conf.awsConfig.tempUser.name, // your username here
          Password: conf.awsConfig.tempUser.pw, // your password here
      };

      var authenticationDetails = new AuthenticationDetails(authenticationData);

      var cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {

              alert('Successfully Login to UserPool')

              that.setState({ idToken: result.getIdToken().getJwtToken() })
              that.setState({ accessToken: result.getAccessToken().getJwtToken() })

              // that.loginIdentityPool(result)

          },

          onFailure: function (err) {
              // alert(err);
              console.log('Error:', err)
          },
          // mfaRequired: function (codeDeliveryDetails) {
          //   var verificationCode = prompt('Please input verification code', '');
          //   cogUser.sendMFACode(verificationCode, this);
          // }
      });
  }

    writeLog(msg) {
        this.setState({ logMsg: msg })
    }

    render() {

        let unConnectedStyle = { display: `${this.state.isConnected ? 'none' : 'block'}` }
        let connectedStyle = { display: `${this.state.isConnected ? 'block' : 'none'}` }

        return (
            <div>

                <h3>Log Message:</h3>
                <p>{this.state.logMsg}</p>
                <hr />

                <div style={unConnectedStyle}>
                    <h3>{this.state.isLoggedIn ? 'Logout from Cognito' : 'Login to Cognito'}</h3>

                    <button className="primary"
                        onClick={this.connectMqtt}
                    >
                        {this.state.isLoggedIn ? 'Login' : 'Logout'}
                    </button>
                </div>
               

                <hr />

                <h2>User Pool Login Info</h2>

                <h3>Id Token: to be used in IdentityPool Login</h3>
                <p>{this.state.idToken}</p>

                <h3>Access Token: When to use?</h3>
                <p>{this.state.accessToken}</p>

                <hr />

                <h2>Identity Pool Login Info</h2>

                <h3>Identity ID:</h3>
                <p>{this.state.identityId}</p>

                <h3>Access Key Id:</h3>
                <p>{this.state.accessKeyId}</p>

                <h3>Secret Access Key:</h3>
                <p>{this.state.secretKey}</p>

                <h3>Session Token:</h3>
                <p>{this.state.sessionToken}</p>

                <hr />

            </div>
        )
    }
}

export default LoginExample;