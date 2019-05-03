import React, { Component } from 'react'
import queryString from 'query-string';
import Playlist from './Playlist';
import NavBar from './NavBar';
import axios from 'axios';

export default class Main extends Component {

    state = {
        playlists: [],
        user: [],
        display: false,
        search: ''
    }

    addNewPlaylist = () => {
        const parsed = queryString.parse(window.location.search);
        const accessToken = parsed.access_token;
        localStorage.setItem('accessToken', accessToken); 
        if (!accessToken)
            return;
   
        fetch('https://api.spotify.com/v1/me', {
        headers: {'Authorization': 'Bearer ' + accessToken}
        }).then(response => response.json())
        .then(data => this.setState({
        user: {
            name: data.display_name,
            profilePic: data.images.length ? data.images[0].url : "/assets/Logo/CommutifyPlaylist.png",
        }
        }))
    

        fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {'Authorization': 'Bearer ' + accessToken}
        }).then(response => response.json())
        .then(data => this.setState({
        playlists: data.items.map(item => { 
            return {
                name: item.name,
                imageUrl: item.images.length ? item.images[0].url : "/assets/Logo/CommutifyPlaylist.png",
                songNum: item.tracks.total,
                id: item.id
            }
        })
        }))
    }

    componentDidMount(){
        this.addNewPlaylist();
    }
    popUpHandler = () => {
        this.setState({
            display: true
        });
    }
    hidePopUpHandler = () => {
        this.setState({
            display: false
        });
    }

    updateSearch(event) {
        this.setState({search: event.target.value});
    }

    removeItem = (playlistId)=>{
        const token = localStorage.getItem('accessToken');
        axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers?access_token=${token}`)
            .then(res=>{
                this.setState({
                    playlists: res.data
                })
                
        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + token}
            }).then(response => response.json())
                .then(data => this.setState({
                    playlists: data.items.map(item => { 
                        return {
                            name: item.name,
                            imageUrl: item.images.length ? item.images[0].url : "/assets/Logo/CommutifyPlaylist.png",
                            songNum: item.tracks.total,
                            id: item.id
                        }
                    })
                }))
        })

    }

  render() {
     let filteredPlaylists = Object.values(this.state.playlists).filter(
         (playlist) => {
             return playlist.name.indexOf(this.state.search) !== -1;
         }
     );
    return (
        <div>
            <div className="logout">
                <img className="icon" src="/assets/Icon/log-out.svg" alt="Logout Icon" />
            </div>
            <div className="animated bounceInLeft userProfile">
                <img className="userProfile__pic" src={this.state.user.profilePic} alt="Profile Pic" />
                <h1 className="userProfile__name">{this.state.user.name}'s Playlists</h1>
                <h3 className="userProfile__playlistNum">Total {this.state.playlists.length}</h3>
            </div>
            <div className="searchDiv">
                <div className="searchDiv__bar">
                    <input className="searchInput" type="text" value={this.state.search}
                                        onChange={this.updateSearch.bind(this)} placeholder="Search" />
                    <img className="searchIcon" src="/assets/Icon/search.svg" alt="Search Icon"/>
                </div>
            </div>
            <div className="userPlaylists">
                {
                    filteredPlaylists.map(playlist => {
                        return <Playlist imageUrl={playlist.imageUrl}
                                            name={playlist.name}
                                            numberOfSongs={playlist.songNum}
                                            id={playlist.id}
                                            removeItem={this.removeItem}
                                            
                        />
                    })
                }
            </div>
            
            <NavBar modal={this.popUpHandler}
                    display={this.state.display}
                    user={this.state.user}
                    show={this.state.display}
                    hide={this.hidePopUpHandler}
                    fetchPlaylists={this.addNewPlaylist}
                    />
        </div>
    )
  }
}
