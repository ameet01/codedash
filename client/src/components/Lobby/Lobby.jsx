import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const languages = ['javascript', 'ruby', 'c++', 'java', 'python', 'html', 'css'];

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {languageSelect: "", roomSelect: "", gameType: 1};
    this.createRoom = this.createRoom.bind(this);
    this.toggleGameType = this.toggleGameType.bind(this);
  }

  componentDidMount() {
    axios.get('/api/indexusers');
  }

  createRoom() {
    if(this.props.match.params.language) {
      let random = Math.floor(Math.random()*10);
      this.props.history.push(`/game/${this.props.match.params.language}/${this.state.gameType}/${random}`);
    }
  }

  toggleGameType() {
    if(this.state.gameType === 1) {
      this.setState({gameType: 2});
    } else {
      this.setState({gameType: 1});
    }
  }

  render() {
    return <div className='lobby'>
      <div className='inner-lobby'>
        <h1>Lobby!</h1>
        <div className='rooms-and-language-select'>
          <div className='rooms-list'>
            <ul>
              <li>Room 1</li>
              <li>Room 2</li>
              <li>Room 3</li>
            </ul>
          </div>
          <div className='game-select'>
            <ul>
              <li onClick={() => this.toggleGameType()}>Singleplayer</li>
              <li onClick={() => this.toggleGameType()}>Multiplayer</li>
            </ul>
          </div>
          <div className='language-select'>
            <ul>
              {languages.map((language, index) =>
                <NavLink to={`/lobby/${language}`}
                  activeClassName='activelanguage'
                  key={index}>
                  {language}
                </NavLink>)}
            </ul>
          </div>
        </div>

        <button onClick={() => this.createRoom()}>Submit</button>
      </div>
    </div>;
  }
}

export default connect(null, actions)(Lobby);
