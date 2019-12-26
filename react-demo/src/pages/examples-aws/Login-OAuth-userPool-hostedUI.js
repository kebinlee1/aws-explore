/**
 * 참조: 
 * https://aws-amplify.github.io/docs/js/authentication
 * OAuth and Federation Overview > React Component
 */

import React, { Component } from 'react';
import OAuthButton from './OAuthButton';
import Amplify, { Auth, Hub } from 'aws-amplify';
// import awsconfig from './aws-exports'; // your Amplify configuration
import conf from '../conf'
import { Button } from 'react-bootstrap'
import LogMessage from './LogMessage'

// your Cognito Hosted UI configuration
// const oauth = {
//   domain: conf.awsConfig.Coginoto.CognitoDomain,
//   clientId: conf.awsConfig.Coginoto.ClientId,

//   // scope: [ 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
//   scope: conf.awsConfig.Coginoto.scope, // email, openid only

//   redirectSignIn: 'http://localhost:3000', // 마지막 / 을 없애야 함.
//   redirectSignOut: 'http://localhost:3000', // 마지막 / 을 없애야 함.

//   // or 'token', note that REFRESH token will only be generated when the responseType is code
//   responseType: 'code'
// };

Amplify.configure(conf.amplifyConfig);
// Auth.configure({ oauth });

class LoginUserPoolHostedUIT extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    // let the Hub module listen on Auth events
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          this.setState({ authState: 'signedIn', authData: data.payload.data });
          break;
        case 'signIn_failure':
          this.setState({ authState: 'signIn', authData: null, authError: data.payload.data });
          break;
        default:
          break;
      }
    });
    this.state = {
      msg: '',
      authState: 'loading',
      authData: null,
      authError: null
    }
  }

  componentDidMount() {
    console.log('on component mount at Login-OAuth.js');
    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser().then(user => {
      console.log('Auth.currentAuthenticatedUser() result', user);
      this.setState({ authState: 'signedIn' });
      this.setState({ msg: `<h4>Alread Signed In...</h4>` });
    }).catch(e => {
      console.log(e);
      this.setState({ authState: 'signIn' });
    });
  }

  signOut() {
    Auth.signOut().then(() => {
      this.setState({ authState: 'signIn' });
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    const { authState } = this.state;
    return (
      <div className="container">
        <h1>Sign-In UserPool Hosted UI using Amplify</h1>
        <hr />
        <LogMessage title="Message" msg={this.state.msg} type="html" />
        <hr />

        <div className="Login">          
          {authState === 'loading' && (<div>loading...</div>)}
          {authState === 'signIn' && <OAuthButton />}
          {authState === 'signedIn' && <Button variant="warning" onClick={this.signOut}>Sign out</Button>}
        </div>
      </div>
    );
  }
}

export default LoginUserPoolHostedUIT;