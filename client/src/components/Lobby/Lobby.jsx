import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';
import axios from 'axios';

import socketIOClient from "socket.io-client";
const socket = socketIOClient("https://codedashback.onrender.com");
// http://127.0.0.1:5000");

const languages = ['javascript', 'ruby', 'c++', 'java', 'python', 'html', 'css', 'non-code'];

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {gameType: 1, error: undefined, langnum: undefined, index: 0};
    this.createRoom = this.createRoom.bind(this);
    this.setSolo = this.setSolo.bind(this);
    this.setMulti = this.setMulti.bind(this);
    this.selectLanguage = this.selectLanguage.bind(this);

    socket.on('update room list', () => {
      setTimeout(() => {
        axios.get('/api/indexusers').then(users => this.props.receiveUsers(users.data));
      }, 150);
    });
  }

  componentDidMount() {
    axios.get('/api/indexusers')
      .then(users => this.props.receiveUsers(users.data));

    document.querySelector('.solo').classList.add('active-game');
  }

  createRoom() {
    if (this.state.index >= 0 && this.state.index <= 7 && this.state.gameType) {
      let gameId = Math.floor(Math.random() * 1000);
      let langNum = Math.floor(Math.random() * 6);
      this.setState({error: undefined});
      socket.emit('lobby');
      this.props.history.push(`/game/${languages[this.state.index]}/${langNum}/${this.state.gameType}/${gameId}`);
    } else {
      this.setState({error: "Incomplete Inputs"});
    }
  }

  setSolo(e) {
    e.preventDefault();
    this.setState({ gameType: 1 });
    document.querySelector('.solo').classList.add('active-game');
    document.querySelector('.multi').classList.remove('active-game');
  }

  setMulti(e) {
    e.preventDefault();
    this.setState({ gameType: 2 });
    document.querySelector('.multi').classList.add('active-game');
    document.querySelector('.solo').classList.remove('active-game');
  }

  selectLanguage(e) {
    e.preventDefault();
    this.setState({ index: parseInt(e.currentTarget.value, 10) });
  }

  render() {
    let obj = {};

    this.props.users.forEach(user => {
      if (!obj[user.currentGame] && user.currentGameType === 2 && user.username !== this.props.auth.username) {
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
      'css': '#7c549a',
      'non-code': '#3d3d3f'
    };

    let rooms;
    if (users.length > 0) {
      rooms = users.map(
        (user, index) =>
        <Link to={`/game/${user.currentGameLang}/${user.currentGameLangNum}/${user.currentGameType}/${user.currentGame}`}
          key={`${user}-${index}`}
        >
          <div className="room-item">
              <div className="room-title">{`${user.username}'`}s room</div>
            <div className="room-info">
              <div
                className="room-language"
                style={{ background: colors[user.currentGameLang] }}
              >
                {user.currentGameLang}
              </div>
                <button>Join</button>
            </div>
          </div>
        </Link>
      );
    } else {
      rooms = <div className="empty-message">
        <div className="message">
          There are currently no open rooms.<br />Why don't you make a new game?
        </div>
        <div className="arrows"></div>
      </div>;
    }

    return <div className="lobby">
      <div className="lobby-inner">
        <h1>Lobby</h1>
        <div className="rooms-and-language-select">
          <div className="rooms-list">
            <h3>Open Rooms</h3>
            {rooms}
          </div>
          <div className="create-room">
            <h3>New Game</h3>
            <div className="room-options">
              <div className="game-select">
                <button className="solo" onClick={this.setSolo}>
                  Solo
                </button>
                <button className="multi" onClick={this.setMulti}>
                  Multiplayer
                </button>
              </div>
              <div className="language-select">
                {languages.map((language, index) => {
                  let active;
                  if(index === this.state.index) {
                    active = 'activeLanguage';
                  } else {
                    active = "";
                  }
                  return <button key={index} className={`${active}`} value={index} onClick={(e) => this.selectLanguage(e)} >{language}</button>
                })}
              </div>
            </div>

            <button className="create"
              onClick={() => this.createRoom()}>
              Create Room
            </button>
            <p style={{color: '#f01b32'}}>{this.state.error}</p>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default connect(null, actions)(Lobby);
