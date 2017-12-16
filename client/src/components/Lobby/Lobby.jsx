import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {NavLink, Link} from 'react-router-dom';
import axios from 'axios';

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://127.0.0.1:5000");

const languages = ['javascript', 'ruby', 'c++', 'java', 'python', 'html', 'css'];

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {gameType: 1, error: undefined, langnum: undefined};
    this.createRoom = this.createRoom.bind(this);

    socket.on('update room list', () => {
      setTimeout(() => {
        axios.get('/api/indexusers').then(users => this.props.receiveUsers(users.data));
      }, 150);
    });
  }

  componentDidMount() {
    axios.get('/api/indexusers')
      .then(users => this.props.receiveUsers(users.data));
  }

  createRoom() {
    if(this.props.match.params.language) {
      let gameId = 1;

      let users = this.props.users;
      let games = [];
      for(var i = 0; i < users.length; i++) {
        games.push(users[i].currentGame);
      }
      while(games.includes(gameId)) {
        gameId = gameId + 1;
      }

      let langNum = Math.floor(Math.random() * 6);
      this.setState({error: undefined});
      socket.emit('lobby');
      this.props.history.push(`/game/${this.props.match.params.language}/${langNum}/${this.state.gameType}/${gameId}`);
    } else {
      this.setState({error: "Incomplete Inputs"});
    }
  }

  render() {
    let obj = {};

    this.props.users.forEach(user => {
      if(!obj[user.currentGame] && user.currentGameType === 2 && user.username !== this.props.auth.username) {
        obj[user.currentGame] = 1;
      } else {
        obj[user.currentGame] += 1;
      }
    });

    let users = this.props.users.filter(user => obj[user.currentGame] === 1);

    let colors = {
      'javascript': '#fed94e',
      'ruby': '#701516',
      'c++': '#6866fb',
      'java': '#e56f1f',
      'python': '#3572a5',
      'html': '#e44b23',
      'css': '#563d7c'
    };

    return <div className="lobby">
      <div className="inner-lobby">
        <h1>Lobby</h1>
        <div className="rooms-and-language-select">
          <div className="rooms-list">
            {users.map(
              user =>
              <div className="room-item"
                key={`${user.currentGameLang}-${user.currentGameLangNum}-${user.currentGameType}-${user.currentGame}`}>
                <Link to={`/game/${user.currentGameLang}/${user.currentGameLangNum}/${user.currentGameType}/${user.currentGame}`}>
                  <div className="room-title">{`${user.username}'`}s room</div>
                </Link>
                <div className="room-info">
                  <div
                    className="room-language"
                    style={{ background: colors[user.currentGameLang] }}
                  >
                    {user.currentGameLang}
                  </div>
                  <Link to={`/game/${user.currentGameLang}/${user.currentGameLangNum}/${user.currentGameType}/${user.currentGame}`}>
                    <button>Join</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="create-room">
            <div className="room-options">
              <div className="game-select">
                <button onClick={() => this.setState({gameType: 1})}>
                  Singleplayer
                </button>
                <button onClick={() => this.setState({gameType: 2})}>
                  Multiplayer
                </button>
              </div>
              <div className="language-select">
                {languages.map((language, index) =>
                  <NavLink to={`/lobby/${language}`}
                    activeClassName="activelanguage"
                    key={index}>
                    {language}
                  </NavLink>
                )}
              </div>
            </div>

            <button onClick={() => this.createRoom()}>Submit</button>
            <p style={{color: 'red'}}>{this.state.error}</p>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default connect(null, actions)(Lobby);
