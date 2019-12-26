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

Amplify.configure(conf.amplifyConfig);

function parseUserTokensToHtml(user){
  console.log('idToken: ', user.signInUserSession.idToken.jwtToken)
  console.log('accessToken: ', user.signInUserSession.accessToken.jwtToken)
  console.log('refreshToken: ', user.signInUserSession.refreshToken.token)
}

class LoginOAuth extends Component {
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
      parseUserTokensToHtml(user)
      this.setState({ msg: 'You already signed-in' });
    }).catch(e => {
      console.log(e);
      this.setState({ authState: 'signIn' });
      let msg = `<h5>You need to signIn first</h5>`
      this.setState({ msg: msg });
    });
  }

  signOut() {
    Auth.signOut().then(() => {
      this.setState({ authState: 'signIn' });
      this.setState({ msg: 'You need to signIn first' });
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    const { authState } = this.state;
    return (
      <div className="container">
        <h1>Sign-In Identity Pool Federated using Amplify</h1>
        <hr />
        <LogMessage title="LogIn Message" msg={this.state.msg} type="html" />

        <div className="Login">
          <h2>SignIn IdentityPool AWS HostedUI</h2>
          {authState === 'loading' && (<div>loading...</div>)}
          {authState === 'signIn' && <OAuthButton />}
          {authState === 'signedIn' && <Button variant="warning" onClick={this.signOut}>Sign out</Button>}
        </div>

      </div>
    );
  }
}

export default LoginOAuth;