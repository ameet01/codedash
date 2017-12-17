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
// ");
//

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
      timer: 5,
      gameStarted: false,
      users: [],
      opponentPointer: 0,
      keystrokes: 0,
      order: [],
      loading: true
    };

    let language = this.props.languages[`${this.props.match.params.language}`];
    this.code = language[0];
    // this.props.match.params.langnum
    let spaces = 0;
    for(var i = 1; i < this.code.length; i++) {
      if(this.code[i] === " " && this.code[i-1] !== " " && this.code[i-1] !== "\n") {
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
      if(u[0].username === user.username) {
        u.shift();
      } else {
        u.pop();
      }
      this.setState({users: u});
    });
  }

  joinUser(user) {
    const combinedUsers = [...this.state.users, user];
    const newUsers = uniqBy(combinedUsers, 'username');
    this.setState({users: newUsers});
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




    // this.timer = setInterval(() => {
    //   this.setState({timer: this.state.timer -= 1});
    //   if(this.state.timer === 0) {
    //     this.startTime = new Date().getTime();
    //     clearInterval(this.timer);
    //     this.setState({gameStarted: true});
    //     document.getElementById('timer').innerHTML = 'GO!';
    //     document.getElementById('timer').style.color = 'green';
    //   }
    // }, 1000);

    document.addEventListener('keypress', this.registerKeyPress);
    document.addEventListener('keydown', this.backspace);
  }

  componentWillReceiveProps(nextProps) {
    // const user = nextProps.auth;
    // const users = [...this.state.users, user];
    // socket.emit('game', {game: nextProps.match.params.gameId, user: nextProps.auth});
    // this.setState({users: users});
  }

  componentWillUnmount() {
    socket.emit('remove user', {game: this.gameId, user: this.props.auth});
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
    if(this.state.gameStarted) {
      if(this.state.wrongstreak <= 5) {
        if(this.code[this.state.pointer + 1] === undefined && e.keyCode === 13 && this.state.incorrect === false) {
          socket.emit('finish', { user: this.props.auth, game: this.gameId });
          this.endTime = new Date().getTime();
          this.timeElapsed = ((this.endTime - this.startTime)/1000).toPrecision(4);
          this.speed = ((this.codeLength / 5) / (this.timeElapsed / 60)).toPrecision(4);
          this.accuracy = ((this.codeLength - this.state.mistakes) * 100 / this.codeLength).toPrecision(4);
          // alert(`You took ${this.timeElapsed} seconds. Your WPM was ${(WPM).toPrecision(4)}. You had ${this.state.mistakes} mistakes! Your accuracy was ${((this.codeLength - this.state.mistakes) * 100/this.codeLength).toPrecision(4)}`);
          setTimeout(() => {
            this.setState({ gameStarted: false, showStats: true });
          }, 200);
        }
        if(e.keyCode === (this.code[this.state.pointer].charCodeAt(0)) && this.state.incorrect === false) {
          this.setState({pointer: this.state.pointer + 1, incorrect: false, keystrokes: this.state.keystrokes + 1});
        } else if(this.code[this.state.pointer].charCodeAt(0) === 10 && e.keyCode === 13) {
          if(this.state.incorrect === true) {
          } else {
            this.setState({incorrect: false});
          }
          let num = this.state.pointer + 1;
          if(this.code[num]) {
            while(this.code[num].match(/\s/g)) {
              num += 1;
            }
            this.setState({pointer: num, keystrokes: this.state.keystrokes + 1});
          }
        } else if(this.code[this.state.pointer].charCodeAt(0) === 10 && e.keyCode !== 13) {
          if(this.state.incorrect === false) {
            this.setState({incorrect: true});
          } else {
            let num = this.state.pointer + 1;
            if(this.code[num]) {
              while(this.code[num].match(/\s/g)) {
                num += 1;
              }
              this.setState({pointer: num, wrongstreak: this.state.wrongstreak + 1, keystrokes: this.state.keystrokes + 1});
            }
          }

        } else {
          if(this.state.wrongstreak === 0) {
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
    if(this.state.gameStarted) {
      if(this.state.incorrect === true && e.keyCode === 8) {
        if(this.state.wrongstreak > 1) {
          let num = this.state.pointer - 1;
          let original = num;
          if(this.code[num]) {
            let string = "";
            while(this.code[num].match(/\s/g)) {
              string+=this.code[num];
              num -= 1;
            }
            if(string.includes("\n")) {
              this.setState({pointer: num+1, wrongstreak: this.state.wrongstreak - 1, keystrokes: this.state.keystrokes + 1 });
            } else {
              this.setState({pointer: original, wrongstreak: this.state.wrongstreak - 1, keystrokes: this.state.keystrokes + 1});
            }
          }
        } else {
          this.setState({pointer: this.state.pointer - 1, incorrect: false, key: undefined, wrongstreak: 0});
        }
      } else if(this.state.incorrect === false && e.keyCode === 8) {
        let num = this.state.pointer - 1;
        let original = num;
        if(this.code[num]) {
          let string = "";
          while(this.code[num].match(/\s/g)) {
            string+=this.code[num];
            num -= 1;
          }
          if(string.includes("\n")) {
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

    spinner = <div className='sweet-loading'>
      <ClipLoader
        color={'#2d9ee0'}
        loading={this.state.loading}
        size={45}
      />
    </div>;

    if(this.state.gameStarted === true && this.state.users.length < 2) {
      playerLeft = <div className='player-left-modal'>
        Other player left the game. Please go back to Lobby.
        <button onClick={() => this.props.history.push('/lobby')}>Lobby</button>
      </div>;
    }

    if(this.state.loading) {
      codeArea = spinner;
    } else {

        if(this.state.users.length < 2) {
          header = <div id='timer'>Awaiting players...</div>;
          } else {
            if(!this.once) {
              socket.emit('game', {game: this.gameId, user: this.props.auth});
              this.once = true;
              this.timer = setInterval(() => {
                this.setState({timer: this.state.timer - 1});
                if(this.state.timer === 0) {
                  this.startTime = new Date().getTime();
                  clearInterval(this.timer);
                  this.setState({gameStarted: true});
                  document.getElementById('timer').innerHTML = 'GO!';
                  document.getElementById('timer').style.color = 'green';
                }
              }, 1000);
            }
            header = <h1 id='timer'>Timer: {this.state.timer}</h1>;
            }

        let count = 1;
        for(var z = 0; z < this.code.length; z++) {
          if(this.code[z] === "\n") {
            count += 1;
          }
        }

        let lineNumbers = [];
        for(var i = 1; i < count; i++) {
          lineNumbers.push(i);
        }
        lineNumbers = <div className='linenumbers'>
          {lineNumbers.map(num => {
          return <span>{num}</span>;
        })}</div>;

        codeArea = <div className='code-area'>
          <div className='user-list'>{this.state.users.map(user => user.username)}</div>
          <pre>{lineNumbers}<code>{this.code.split('').map((char, index) => {
              let span;
              let opponent;
              if(index === this.state.opponentPointer) {
                opponent = "opponentPointer";
              } else {
                opponent = "";
              }

              let bolded;
              if(this.state.wrongstreak > 0) {
                if(this.state.pointer - this.state.wrongstreak > index) {
                  bolded = 'bolded';
                } else {
                  bolded = undefined;
                }
              } else {
                if(this.state.pointer > index) {
                   bolded = 'bolded';
                } else {
                  bolded = undefined;
                }
              }


              if(index === this.state.pointer) {
                if(char === "\n") {
                  span = <span
                    className={
                      this.state.incorrect ?
                      `active enter-incorrect ${opponent}` :
                      `active enter ${opponent}`
                    }
                    key={index}>
                    {char}
                  </span>;
                } else {
                  if(this.state.incorrect) {
                    span = <span className={`wrong ${opponent}`} key={index}>{char}</span>;
                    } else {
                      span = <span className={`active ${opponent}`} key={index}>{char}</span>;
                      }
                    }
                  } else {
                    span = <span className={`regular ${opponent} ${bolded}`} key={index}>{char}</span>;
                    }

                    if(this.state.key === index) {
                      span = <span className={`incorrect ${opponent}`} key={index}>{char}</span>;
                    }

                    return span;
                  })}
                </code>
              </pre>
            </div>;
          }

        let warning;
        console.log(this.state.order);
        console.log(this.props.auth);
        if(this.state.order.length > 0 && (this.state.order[0].username !== this.props.auth.username)) {
          warning = <div className='warning'>You lost the game, but keep trying!</div>;
        }

        return <div className='game'>
          <h1>Multiplayer Game</h1>
          {header}
          {playerLeft}
          {codeArea}
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
