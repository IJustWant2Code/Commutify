import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CreateNewPlaylist from './CreateNewPlaylist';

export default class NavBar extends Component {
  render() {
    
    const token = localStorage.getItem('accessToken');
    const homePage = `/main?access_token=${token}`

    return (
      <nav className="navBar">
        <div className="navBar__icon" onClick={()=>{this.props.modal()}}>
            <img className="icon" src="/assets/Icon/music.svg" alt="Create Playlist Icon"/>
            <p className="iconText">Create Playlist</p>

        </div>
        <div className="navBar__icon">
          <Link className="iconLink" to={homePage}>
            <img className="icon" src="/assets/Icon/home.svg" alt="Home Icon"/> 
            <p className="iconText">Home</p>
          </Link>
        </div>
        <div className="navBar__icon">
          <Link className="iconLink" to="/favouritePlaylists">
            <img className="icon" src="/assets/Icon/star.svg" alt="Favourites Icon"/>
            <p className="iconText">Favourites</p>
          </Link>
        </div>
        {   this.props.display ? 
                <CreateNewPlaylist show={this.props.show}
                            fetchPlaylist={this.props.fetchPlaylists}
                            hide={this.props.hide} 
                            user={this.props.user.name}
                            /> : null
            }
      </nav>
    )
  }
}
