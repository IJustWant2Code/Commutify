import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import PlaylistTracks from './components/PlaylistTracks';
import './styles/styles.scss';
import './styles/modal.scss';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component= {Login} />
            <Route path="/main" component= {Main} />
            <Route path="/playlists/:id" component={PlaylistTracks}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
