
import React, { Component } from 'react'
import Router from 'next/router'
import GoogleLogin from 'react-google-login'
import { LoginContainer } from './styles';

const KEY = (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID).toString();

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
          clientId={KEY}
          buttonText="Login to Mohan's Editor"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          cookiePolicy={'single_host_origin'}
        />
      </LoginContainer>
    )
  }
}