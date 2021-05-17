
import React, { Component } from 'react'
import Router from 'next/router'
import GoogleLogin from 'react-google-login'
import { LoginContainer } from './styles';

/**
 * TODO: move clientId to .env
 */
export default class App extends Component {
  onSuccess = (response) => {
    const { accessToken, profileObj } = response;
    console.log(profileObj);
    localStorage.setItem('accessToken', accessToken);
    Router.push('/editor');
  }

  onFailure = (response) => {
    console.log(response);
  }

  render() {
    return (
      <LoginContainer>
        <GoogleLogin
          clientId="773557108202-vfrt5mkokdv04u4nos0gst1cdsi0gp11.apps.googleusercontent.com"
          buttonText="Login to Mohan's Editor"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          cookiePolicy={'single_host_origin'}
        />
      </LoginContainer>
    )
  }
}