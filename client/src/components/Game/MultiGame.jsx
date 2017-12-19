import StatsModal from './StatsModal';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';
import uniqBy from 'lodash/uniqBy';
import { ClipLoader } from 'react-spinners';


import socketIOClient from "socket.io-client";
const socket = socketIOClient("https://flexproject.herokuapp.com");
// http://127.0.0.1:5000");

let Highlight = require('react-syntax-highlight');

class MultiGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStats: false,
      pointer: 0,
      incorrect: false,
      wrongstreak: 0,
      key: undefined,
      mistakes: 0,
      timer: 10,
      gameStarted: false,
      gameEnded: false,
      users: [],
      opponentPointer: 0,
      keystrokes: 0,
      order: [],
      loading: true,
      roomFull: false
    };

    let language = this.props.languages[`${this.props.match.params.language}`];
    this.code = language[this.props.match.params.langnum];
    let spaces = 0;
    for(let i = 1; i < this.code.length; i++) {
      if (this.code[i] === " " && this.code[i-1] !== " " && this.code[i-1] !== '\n') {
        spaces += 1;
      }
    }
    this.codeLength = this.code.split('').filter(char => char !== " ").length + spaces;
    this.timer = undefined;
    this.startTime = undefined;
    this.endTime = undefined;
    this.timeElapsed = undefined;
    this.speed = undefined;
    this.accuracy = undefined;
    this.gameId = parseInt(this.props.match.params.gameId, 10);
    this.once = false;

    this.unmountModal = this.unmountModal.bind(this);
    this.registerKeyPress = this.registerKeyPress.bind(this);
    this.backspace = this.backspace.bind(this);

    socket.on('new user join', (user) => this.joinUser(user));
    socket.on('update opponent cursor', (pointer) => this.setState({opponentPointer: pointer}));
    socket.on('add user to finish list', (user) => {
      let order = this.state.order.concat(user);
      this.setState({order: order});
    });
    socket.on('user leave', (user) => {
      let u = this.state.users.slice(0);
      if(u.length > 0) {
        if (u[0].username === user.username) {
          u.shift();
        } else {
          u.pop();
        }
      }
      this.setState({users: u});
    });
  }

  joinUser(user) {
    const combinedUsers = [...this.state.users, user];
    const newUsers = uniqBy(combinedUsers, 'username');
    this.setState({users: newUsers}, () => {
      if(this.state.users.length > 1 && this.state.roomFull === false) {
        this.setState({roomFull: true});
      }
    });
  }

  componentDidMount() {
    window.onbeforeunload = (e) => {
      axios.put('/api/updateuser/', {
        id: this.props.auth._id,
        currentGame: null,
        currentGameType: null,
        currentGameLang: null,
        currentGameLangNum: null
      }).then(socket.emit('lobby'));
    };

    axios.put('/api/updateuser/', {
      id: this.props.auth._id,
      currentGame: this.gameId,
      currentGameType: 2,
      currentGameLang: this.props.match.params.language,
      currentGameLangNum: this.props.match.params.langnum
    }).then(() => this.props.fetchUser());

    setTimeout(() => {
      socket.emit('game', {game: this.gameId, user: this.props.auth});
      const users = [...this.state.users, this.props.auth];
      this.setState({users: users, loading: false});
      socket.emit('lobby');
    }, 1000);

    document.addEventListener('keypress', this.registerKeyPress);
    document.addEventListener('keydown', this.backspace);
  }

  componentWillUnmount() {
    if (this.state.gameEnded === false) {
      socket.emit('remove user', {game: this.gameId, user: this.props.auth});
    }
    axios.put('/api/updateuser/', {
      id: this.props.auth._id,
      currentGame: null,
      currentGameType: null,
      currentGameLang: null,
      currentGameLangNum: null
    }).then(() => this.props.fetchUser());
    socket.emit('lobby');
    clearInterval(this.timer);
    document.removeEventListener('keypress', this.registerKeyPress);
    document.removeEventListener('keydown', this.backspace);
  }

  registerKeyPress(e) {
    e.preventDefault();
    if (this.state.gameStarted) {
      if (this.state.wrongstreak <= 5) {
        if (this.code[this.state.pointer + 1] === undefined && e.keyCode === 13 && this.state.incorrect === false) {
          socket.emit('finish', { user: this.props.auth, game: this.gameId });
          this.endTime = new Date().getTime();
          this.timeElapsed = ((this.endTime - this.startTime)/1000).toPrecision(4);
          this.speed = ((this.codeLength / 5) / (this.timeElapsed / 60)).toPrecision(4);
          this.accuracy = ((this.codeLength - this.state.mistakes) * 100 / this.codeLength).toPrecision(4);
          setTimeout(() => {
            this.setState({ gameStarted: false, showStats: true, gameEnded: true });
          }, 200);
        }
        if (e.keyCode === (this.code[this.state.pointer].charCodeAt(0)) && this.state.incorrect === false) {
          this.setState({pointer: this.state.pointer + 1, incorrect: false, keystrokes: this.state.keystrokes + 1});
        } else if (this.code[this.state.pointer].charCodeAt(0) === 10 && e.keyCode === 13) {
          if (this.state.incorrect === true) {
          } else {
            this.setState({incorrect: false});
          }
          let num = this.state.pointer + 1;
          if (this.code[num]) {
            while(this.code[num].match(/\s/g)) {
              num += 1;
            }
            this.setState({pointer: num, keystrokes: this.state.keystrokes + 1});
          }
        } else if (this.code[this.state.pointer].charCodeAt(0) === 10 && e.keyCode !== 13) {
          if (this.state.incorrect === false) {
            this.setState({incorrect: true});
          } else {
            let num = this.state.pointer + 1;
            if (this.code[num]) {
              while(this.code[num].match(/\s/g)) {
                num += 1;
              }
              this.setState({pointer: num, wrongstreak: this.state.wrongstreak + 1, keystrokes: this.state.keystrokes + 1});
            }
          }

        } else {
          if (this.state.wrongstreak === 0) {
            this.setState({key: this.state.pointer}, this.setState({incorrect: true, pointer: this.state.pointer + 1, wrongstreak: this.state.wrongstreak + 1, mistakes: this.state.mistakes + 1, keystrokes: this.state.keystrokes + 1}));
          } else {
            this.setState({incorrect: true, pointer: this.state.pointer + 1, wrongstreak: this.state.wrongstreak + 1, keystrokes: this.state.keystrokes + 1});
          }
        }
      }
      socket.emit('cursor', { pointer: this.state.pointer, game: this.gameId });
    }
  }

  backspace(e) {
    if (this.state.gameStarted) {
      if (this.state.incorrect === true && e.keyCode === 8) {
        if (this.state.wrongstreak > 1) {
          let num = this.state.pointer - 1;
          let original = num;
          if (this.code[num]) {
            let string = '';
            while(this.code[num].match(/\s/g)) {
              string+=this.code[num];
              num -= 1;
            }
            if (string.includes('\n')) {
              this.setState({pointer: num+1, wrongstreak: this.state.wrongstreak - 1, keystrokes: this.state.keystrokes + 1 });
            } else {
              this.setState({pointer: original, wrongstreak: this.state.wrongstreak - 1, keystrokes: this.state.keystrokes + 1});
            }
          }
        } else {
          this.setState({pointer: this.state.pointer - 1, incorrect: false, key: undefined, wrongstreak: 0});
        }
      } else if (this.state.incorrect === false && e.keyCode === 8) {
        let num = this.state.pointer - 1;
        let original = num;
        if (this.code[num]) {
          let string = '';
          while(this.code[num].match(/\s/g)) {
            string+=this.code[num];
            num -= 1;
          }
          if (string.includes('\n')) {
            this.setState({pointer: num, keystrokes: this.state.keystrokes + 1});
          } else {
            this.setState({pointer: original, keystrokes: this.state.keystrokes + 1});
          }
        }
        // this.setState({pointer: this.state.pointer -= 1});
      }
      socket.emit('cursor', { pointer: this.state.pointer, game: this.gameId });
    }
  }

  unmountModal() {
    this.setState({ showStats: false });
  }

  render() {
    let playerLeft;
    let spinner;
    let codeArea;
    let header;
    let highlight;

    spinner = <div className="sweet-loading">
      <ClipLoader
        color={'#2d9ee0'}
        loading={this.state.loading}
        size={45}
      />
    </div>;

    if (this.state.gameEnded === false && this.state.users.length < 2 && this.state.roomFull) {
      playerLeft = <div className="player-left-modal">
        <span>Your opponent has disconnected from the game.</span>
        <span>Please return to the lobby.</span>
        <button onClick={() => this.props.history.push('/lobby')}>Lobby</button>
      </div>;
    }

    if (this.state.loading) {
      return(
        <div className="game">
          <div className="game-header">
            <div className="game-inner">
              <div className="game-title">
                <h1>Multiplayer Game</h1>
                {header}
                {playerLeft}
              </div>
              <div className="user-list">
                <div className="users-inner"></div>
              </div>
            </div>
          </div>
          {spinner}
        </div>
      );
    } else {
      if (this.state.users.length < 2 && this.state.gameEnded === false && this.state.gameStarted === false && this.state.timer === 10) {
        header = <div id="timer">Waiting for opponent...</div>;
      } else {
        if (!this.once) {
          socket.emit('game', {game: this.gameId, user: this.props.auth});
          this.once = true;
          this.timer = setInterval(() => {
            this.setState({timer: this.state.timer - 1});
            if (this.state.timer === 0) {
              this.startTime = new Date().getTime();
              clearInterval(this.timer);
              this.setState({ gameStarted: true });
              document.getElementById('timer').innerHTML = 'GO!';
              document.getElementById('timer').style.color = '#00b39f';
            }
          }, 1000);
        }
        header = <div id="timer">Timer: {this.state.timer}</div>;
      }

      let count = 1;
      for(let z = 0; z < this.code.length; z++) {
        if (this.code[z] === '\n') {
          count += 1;
        }
      }

      let lineNumbers = [];
      let codeStyle;
      if (this.props.match.params.language === 'non-code') {
        lineNumbers = null;
        codeStyle = { padding: '10px' };
        let pres = document.querySelectorAll('pre');
        for (let i = 0; i < pres.length; i++) {
          pres[i].classList.add('changeMinWidth');
        }
      } else {
        for(let i = 1; i < count; i++) {
          lineNumbers.push(i);
        }
        lineNumbers = <div className="linenumbers">
          {lineNumbers.map((num, index) => <span key={index}>{num}</span>)}
        </div>;
        codeStyle = {};
      }

      let codeOpacity;
      if (this.state.gameStarted || this.state.gameEnded) {
        codeOpacity = { opacity: '1' };
      } else {
        codeOpacity = { opacity: '0' };
      }

      Object.assign(codeStyle, codeOpacity);

      codeArea = <div className="code-area top">
        <pre id="pre">
          {lineNumbers}
          <code className="code" style={codeStyle}>
            {this.code.split('').map((char, index) => {
              let span;
              let opponent;
              if (index === this.state.opponentPointer) {
                opponent = ' opponentPointer';
              } else {
                opponent = '';
              }

              let bolded;
              if (this.state.wrongstreak > 0) {
                if (this.state.pointer - this.state.wrongstreak > index) {
                  bolded = this.props.match.params.language === 'non-code' ?
                    ' bolded noncode' : ' bolded';
                } else {
                  bolded = '';
                }
              } else {
                if (this.state.pointer > index) {
                  bolded = this.props.match.params.language === 'non-code' ?
                    ' bolded noncode' : ' bolded';
                } else {
                  bolded = '';
                }
              }

              if (index === this.state.pointer) {
                if (char === '\n') {
                  span = <span
                    className={
                      this.state.incorrect ?
                      `active enter-incorrect${opponent}` :
                      `active enter${opponent}`
                    }
                    key={index}>
                    {char}
                  </span>;
                } else {
                  if (this.state.incorrect) {
                    span = <span className={`wrong${opponent}`} key={index}>{char}</span>;
                    } else {
                      span = <span className={`active${opponent}`} key={index}>{char}</span>;
                      }
                    }
                  } else {
                    span = <span className={`regular${opponent}${bolded}`} key={index}>{char}</span>;
                  }

                  if (this.state.key === index) {
                    span = <span className={`incorrect${opponent}`} key={index}>{char}</span>;
                  }

                  return span;
                }
              )}
            </code>
          </pre>
        </div>;
      }

      let lang;
      if(this.props.match.params.language === 'non-code') {
        lang = 'Markdown';
      } else {
        lang = this.props.match.params.language;
      }

      highlight =
        <div className="code-area bottom">
          <Highlight
            lang={`${lang}`}
            value={`${this.code}`}
          />
          {codeArea}
        </div>;

      let warning;
      if (this.state.order.length > 0 && (this.state.order[0].username !== this.props.auth.username)) {
        warning = <div className="warning">You lost the game, but keep trying!</div>;
      }

      let lobbyButton = <button
        className="lobby-back"
        onClick={() => this.props.history.push('/lobby')}>
        Lobby
      </button>;

      return <div className="game">
        <div className="game-header">
          <div className="game-inner">
            <div className="game-title">
              <h1>Multiplayer Game</h1>
              {header}
              {playerLeft}
            </div>

            <div className="user-list">
              <div className="users-inner">
                <h3>Players</h3>
                {this.state.users.map((user, idx) => {
                  let progress = 0;
                  let percentage = 0;
                  if (idx === 0) {
                    progress = ((this.state.pointer + 1)/ this.code.length * 100).toString();
                    percentage = (this.state.pointer / (this.code.length - 1) * 100).toPrecision(3) + '%';
                  } else {
                    progress = ((this.state.opponentPointer + 1) / this.code.length * 100).toString();
                    percentage = (this.state.opponentPointer / (this.code.length - 1) * 100).toPrecision(3) + '%';
                  }

                  return(
                    <div key={idx} className="user-item">
                      <div className="progress-bar">
                        <span>{user.username}</span>
                        <span>{percentage}</span>
                        <div
                          className={`player${idx}`}
                          style={{ width: progress + '%' }}>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {highlight}
        {lobbyButton}
        {warning}
      <StatsModal
        mounted={this.state.showStats}
        onTransitionEnd={this.transitionEnd}
        speed={this.speed}
        time={this.timeElapsed}
        errors={this.state.mistakes}
        accuracy={this.accuracy}
        unmount={this.unmountModal}
        order={this.state.order}
        currentUser={this.props.auth}
        collateral={this.state.keystrokes - this.codeLength + 1}
      />
    </div>;
  }
}

export default connect(null, actions)(MultiGame);
