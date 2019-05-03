import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <div className="loginPage">
        <img className="animated pulse CommutifyLogo" src="assets/Logo/logo_transparent.png" alt="Commutify Icon"/>
        <button className="loginButton" onClick={()=>window.location='http://localhost:8888/login'}>
          Login With 
          <img className="loginButton__spotify" src="assets/Logo/Spotify_logo.png" alt="Spotify Icon"/>
        </button>
      </div>
    )
  }
}
