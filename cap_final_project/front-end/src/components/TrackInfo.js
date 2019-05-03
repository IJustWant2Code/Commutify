import React, { Component } from 'react'

export default class TrackInfo extends Component {
  render() {

    const embedTrackId = `https://embed.spotify.com/?uri=spotify:track:${this.props.id}`

    return (
        <div className="trackOverview">
          <div class='embed-container'>
            <iframe src={embedTrackId} frameborder='0' allowtransparency='true'></iframe>
          </div>
        </div>
    )
  }
}
