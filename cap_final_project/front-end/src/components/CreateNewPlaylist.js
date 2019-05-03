import React, { Component } from 'react'
import axios from 'axios';

export default class CreateNewPlaylist extends Component {
     constructor(){
        super();
        this.playlistForm = React.createRef();
    }
    
    submitPlaylist = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');
        
        const config = {
            method: "post",
            url:`https://api.spotify.com/v1/users/${this.props.user}/playlists?access_token=${token}`,
            data: {
                name: this.playlistForm.current.nameInput.value,
                description: this.playlistForm.current.descriptInput.value,
                public: true
            },
            headers: {
                "Content-Type": "application/json"
            }
        };
        axios(config)
            .then(result => {
                // console.log(result.data);
                this.props.fetchPlaylist();
                
            })
            .catch(err => {
                console.log(err);
            })
        
        this.props.hide();
    }
  render() {
    return (
        <div className="modalBackground">
            <div className="animated fadeInUp popUp">
                <div className="popUp__content">
                    <h1 className="popUp__content--title">Create New Playlist</h1>
                    <form className="popUp__content--form" ref={this.playlistForm} onSubmit={this.submitPlaylist}>
                        <div className="formInput">
                            <label className="titleLabel">PLAYLIST NAME
                                <textarea className="formField" type="text" name="nameInput" placeholder="Enter a Playlist Name" required/>
                            </label>
                        </div>
                        <div className="formDescript">
                            <label className="titleLabel">PLAYLIST DESCRIPTION</label>
                            <textarea className="descriptField" type="text" name="descriptInput" placeholder="(Optional)" />
                        </div>
                        <div className="formButtons">
                            <button className="cancelText" typ="button" onClick={(e)=>{this.props.hide(e)}}>CANCEL</button>
                            <button className="saveButton" type="submit">CREATE</button>
                            <button className="cancelTextMobile" type="button" onClick={(e)=>{this.props.hide(e)}}>CANCEL</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}
