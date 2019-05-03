import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import posed from 'react-pose';


export default class Playlist extends Component {

    state = {
      remove: false,
      hovering: false
    }

  removeKebab = () => {
    this.setState({
      remove: !this.state.remove
    })
  }

  Card = posed.div({
    hoverable: true,
    pressable: true,
    init: {
        scale: 1,
    },
    hover: {
        scale: 1.2,
    },
    press: {
        scale: 1.1,
    }
  });
  
  render() {
    const { removeItem, imageUrl, name, numberOfSongs, id } = this.props;

    return (
      <this.Card className="playlist" onClick={this.removePlaylist}>
        <Link to={"playlists/" + id + "/tracks"}> 
            <img className="playlist__image" src={imageUrl} alt="Playlist Cover Art" />
        </Link> 
        <Link className="playlistLink" to={"playlists/" + id + "/tracks"}> 
            <h3 className="playlist__name">{name}</h3>
            <h3 className="playlist__numOfSongs">{numberOfSongs} Songs</h3>
        </Link>
        <div onClick ={this.removeKebab} className='kebabItem'>
                {this.state.remove? <img src="/assets/Icon/Icon-kebab-click.svg" alt="kebab-icon"/>
                :<img src="/assets/Icon/Icon-kebab-default.svg" alt="kebab-icon"/>}
        </div>
          {
            this.state.remove ? 
            <button className="deleteButton" onClick={()=>{removeItem(this.props.id)}}>Delete</button> 
            : null}
      </this.Card>
    )
  }
}
