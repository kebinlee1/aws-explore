/**
 * 참조: 
 * https://aws-amplify.github.io/docs/js/authentication
 * Identity Pool Federation > Google Sample 
 */

// import React, { Component } from 'react';
// import OAuthButton from './OAuthButton';
// import Amplify, { Auth, Hub } from 'aws-amplify';
// import awsconfig from './aws-exports'; // your Amplify configuration
import conf from '../conf'
import { Button } from 'react-bootstrap'
import LogMessage from './LogMessage'
import './Login.css'

import React, { Component } from 'react';
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure(conf.amplifyConfig);
// To federated sign in from Google
class SignInWithGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg:`<h2 style="color: red">This is not WORKING. Need to get Google dev account</h2>`
    }
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    const ga = window.gapi && window.gapi.auth2 ?
      window.gapi.auth2.getAuthInstance() :
      null;
    if (!ga) this.createScript();
  }

  signIn() {
    const ga = window.gapi.auth2.getAuthInstance();
    ga.signIn().then(
      googleUser => {
        this.getAWSCredentials(googleUser);
      },
      error => {
        console.log(error);
      }
    );
  }

  async getAWSCredentials(googleUser) {
    const { id_token, expires_at } = googleUser.getAuthResponse();
    const profile = googleUser.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName()
    };

    const credentials = await Auth.federatedSignIn(
      'google',
      { token: id_token, expires_at },
      user
    );
    console.log('credentials', credentials);
  }

  createScript() {
    // load the Google SDK
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.onload = this.initGapi;
    document.body.appendChild(script);
  }

  initGapi() {
    // init the Google SDK client
    const g = window.gapi;
    g.load('auth2', function () {
      g.auth2.init({
        client_id: 'your_google_client_id',
        // authorized scopes
        scope: 'profile email openid'
      });
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Sign-In Identity Pool Federated using Amplify</h1>
        <hr />
        <LogMessage title="Message" msg={this.state.msg} type="html" />
        <hr />

        <div className="Login">
          <Button variant="info" onClick={this.signIn}>Sign in with Google</Button>

        </div>

      </div>
    );
  }
}

export default SignInWithGoogle;