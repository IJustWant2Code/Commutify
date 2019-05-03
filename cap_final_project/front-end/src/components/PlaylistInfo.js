import React, { Component } from 'react'

export default class PlaylistInfo extends Component {

  render() {

    const {imageUrl, playlistName, description, songNum} = this.props.playlistInfo;
    
    const LengthNum = (songNum*3)

    return (
        <div className="playlistInfo">
          <img className="playlistInfo__coverArt" src={imageUrl}  />
          <div className="playlistDetails">
            <div>
              <h1 className="playlistDetails__title">{playlistName}</h1>
              <h3 className="playlistDetails__descript">{description}</h3>
            </div>
            <div>
              <p className="playlistDetails__length">Length: Approx. {LengthNum}mins</p>
              <p className="playlistDetails__username">{songNum} Songs</p>
            </div>
          </div>
        </div>
    )
  }
}
