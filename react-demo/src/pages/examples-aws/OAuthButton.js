/**
 * 참조: 
 * https://aws-amplify.github.io/docs/js/authentication
 * OAuth and Federation Overview > React Component
 */
import {Button} from 'react-bootstrap'

import { withOAuth } from 'aws-amplify-react';
import React, { Component } from 'react';

class OAuthButton extends Component {
  render() {
    return (
      <Button variant="info" onClick={this.props.OAuthSignIn}>
        Sign in with AWS
      </Button>
    )
  }
}

export default withOAuth(OAuthButton);