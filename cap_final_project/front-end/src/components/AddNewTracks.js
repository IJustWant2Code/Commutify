import React, { Component } from 'react';

export default class AddNewTracks extends Component {
    constructor(){
        super();
        this.addTracksForm = React.createRef();
    }

  render() {
    return (
        <div>
            <div className="modalBackground">
                <div className="animated fadeInRight popUp">
                    <div className="popUp__content">
                    <h1 className="popUp__content--title">Add New Tracks To Playlist</h1>
                    <form className="popUp__content--form" ref={this.addTracksForm} onSubmit={this.props.submitTracks}>
                        <div className="formInput">
                        <label className="titleLabel">ARTIST
                            <textarea className="formField" type="text" name="artistInput" placeholder="Search an Artist" required/>
                        </label>
                            <label className="titleLabel">COMMUTE TIME 
                                <textarea className="formField" type="text" name="timeInput" placeholder="Time in Minutes" required/>
                            </label>
                        </div>
                        <div className="formButtons">
                            <button className="cancelText" onClick={(e)=>{this.props.hide(e)}}>CANCEL</button>
                            <button className="saveButton" type="submit">ADD</button>
                            <button className="cancelTextMobile" onClick={(e)=>{this.props.hide(e)}}>CANCEL</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
