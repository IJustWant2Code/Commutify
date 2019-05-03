import React, { Component } from 'react';
import TrackInfo from './TrackInfo';
import PlaylistInfo from './PlaylistInfo';
import AddNewTracks from './AddNewTracks';
import Axios from 'axios';
import NavBar from './NavBar';
const round = require('math-round');

export default class PlaylistTracks extends Component {

  state = {
    playlist: [],
    tracklist: [],
    display: false
  }

  addNewTracks = () => {
    const playlistId = this.props.match.params.id
    const token = localStorage.getItem('accessToken');
    
    if (!token)
      return;

      fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {'Authorization': 'Bearer ' + token}
        }).then(response => response.json())
        .then(data => this.setState({
        playlist: 
          {
              playlistName: data.name,
              description: data.description,
              imageUrl: data.images.length ? data.images[0].url : "/assets/Logo/CommutifyPlaylist.png",
              songNum: data.tracks.total,
              username: data.owner.display_name,
              id: data.id
          }
        }))


    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: { 'Authorization': 'Bearer ' + token }})
      .then(response => response.json())
      .then(data =>
        this.setState({
          tracklist: data.items.map(item => {
            return {
              song: item.track.name,
              // image: item.track.album.images[0].url,
              album: item.track.album.name,
              // artist: item.track.album.artists[0].name,
              duration: item.duration_ms,
              id: item.track.id
            }
          })
        }))
  }
  componentDidMount(){
    this.addNewTracks();
  }

  popUpHandler = () => {
    this.setState({
      display: true
    });
  }
  hidePopUpHandler = () => {
    this.setState({
      display: !this.state.display
    });
  }
  
  submitTracks = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    const commuteTime = e.target.timeInput.value
    const playlistTime = round(commuteTime/3)
  
    const artistName = e.target.artistInput.value
    const response = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=track&limit=${playlistTime}&access_token=${token}`)
    

    const data = await response.json()

    this.setState({
      tracklist: data.tracks.items.map(item => {
        return {
          song: item.name,
          image: item.album.images[0].url,
          album: item.album.name,
          artist: item.album.artists[0].name,
          duration: item.duration_ms,
          id: item.id
        }
      })
    })
    
    this.state.tracklist.forEach(track => {
      const playlistId = this.props.match.url
      const trackId = track.id
      const config = {
        method: 'Post',
        url: (`https://api.spotify.com/v1${playlistId}/tracks?uris=spotify:track:${trackId}&access_token=${token}`),
        data: track
      }

      Axios(config)
        .then(result => {
          this.addNewTracks();
        })
        .catch(err => {
          console.log(err);
        })
    }) 

    this.hidePopUpHandler();
  }

  render() {

    const { tracklist, playlist, display } = this.state;

    return (
      <div>
        <div>
          <PlaylistInfo playlistInfo={playlist}/>
        </div>
        <div className="tracks">
          {tracklist.map((info) => {
            return <TrackInfo {...info}
            /> 
          })}
        </div>
        <button className='createNewButton' onClick={this.popUpHandler}>Add New Tracks</button>
        {display ? 
                <AddNewTracks show={this.state.display}
                            hide={this.hidePopUpHandler} 
                            submitTracks={this.submitTracks}
                            /> : null
            }
        <NavBar />
      </div>
    )
  }
}
