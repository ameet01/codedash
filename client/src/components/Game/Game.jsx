import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';


import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://127.0.0.1:5000");

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {pointer: 0, incorrect: false, wrongstreak: 0, key: undefined, mistakes: 0, timer: 1, gameStarted: false};
    this.registerKeyPress = this.registerKeyPress.bind(this);
    this.backspace = this.backspace.bind(this);

    let language = this.props.languages[`${this.props.match.params.language}`];
    this.code = language[Math.floor(Math.random()*1)];
    let spaces = 0;
    for(var i = 1; i < this.code.length; i++) {
      if(this.code[i] === " " && this.code[i-1] !== " " && this.code[i-1] !== "\n") {
        spaces += 1;
      }
    }
    this.codeLength = this.code.split('').filter(char => char !== " ").length + spaces;
    this.timer;
    this.startTime;
    this.endTime;
    this.timeElapsed;
  }

  componentDidMount() {
    socket.emit('game', {game: this.props.match.params.language});

    this.timer = setInterval(() => {
      this.setState({timer: this.state.timer -= 1});
      if(this.state.timer === 0) {
        this.startTime = new Date().getTime();
        clearInterval(this.timer);
        this.setState({gameStarted: true});
        document.getElementById('timer').innerHTML = 'GO!';
        document.getElementById('timer').style.color = 'green';
      }
    }, 1000);
    document.addEventListener('keypress', this.registerKeyPress);
    document.addEventListener('keydown', this.backspace);
  }

  componentWillReceiveProps(nextProps) {
    socket.emit('game', {game: this.props.match.params.language});
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    document.removeEventListener('keypress', this.registerKeyPress);
    document.removeEventListener('keydown', this.backspace);
  }

  registerKeyPress(e) {
    e.preventDefault();
    if(this.state.gameStarted) {
      if(this.state.wrongstreak <= 5) {
        if(this.code[this.state.pointer + 1] === undefined && e.keyCode === 13) {
          this.endTime = new Date().getTime();
          this.timeElapsed = (this.endTime - this.startTime)/1000;
          let WPM = (this.codeLength / 5) / (this.timeElapsed / 60);
          alert(`You took ${this.timeElapsed} seconds. Your WPM was ${(WPM).toPrecision(4)}. You had ${this.state.mistakes} mistakes! Your accuracy was ${((this.codeLength - this.state.mistakes) * 100/this.codeLength).toPrecision(4)}`)
          this.setState({gameStarted: false});
        }
        if(e.keyCode === (this.code[this.state.pointer].charCodeAt(0)) && this.state.incorrect === false) {
          this.setState({pointer: this.state.pointer += 1, incorrect: false});
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
            this.setState({pointer: num});
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
              this.setState({pointer: num, wrongstreak: this.state.wrongstreak += 1});
            }
          }

        }else {
          if(this.state.wrongstreak === 0) {
            this.setState({key: this.state.pointer}, this.setState({incorrect: true, pointer: this.state.pointer += 1, wrongstreak: this.state.wrongstreak += 1, mistakes: this.state.mistakes += 1}));
          } else {
            this.setState({incorrect: true, pointer: this.state.pointer += 1, wrongstreak: this.state.wrongstreak += 1});
          }
        }
      }
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
              this.setState({pointer: num+1, wrongstreak: this.state.wrongstreak -= 1 });
            } else {
              this.setState({pointer: original, wrongstreak: this.state.wrongstreak -= 1});
            }
          }
        } else {
          this.setState({pointer: this.state.pointer -= 1, incorrect: false, key: undefined, wrongstreak: 0});
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
            this.setState({pointer: num});
          } else {
            this.setState({pointer: original});
          }
        }
        // this.setState({pointer: this.state.pointer -= 1});
      }
    }
  }

  render() {
    return <div className='game'>
      <h1>Test Game</h1>
      <h1 id='timer'>Timer: {this.state.timer}</h1>
      <pre><code>{this.code.split('').map((char, index) => {
          let span;
          if(index === this.state.pointer) {
            if(char === "\n") {
              span = <span
                className={this.state.incorrect ? 'active enter-incorrect' : 'active enter'}
                key={index}>
                {char}
              </span>;
            } else {
              if(this.state.incorrect) {
                span = <span className='wrong' key={index}>{char}</span>;
              } else {
                span = <span className='active' key={index}>{char}</span>;
              }
            }
          } else {
            span = <span className='regular' key={index}>{char}</span>;
          }

          if(this.state.key === index) {
            span = <span className='incorrect' key={index}>{char}</span>;
          }
          return span;
        })}</code></pre>
    </div>;

  }
}

export default connect(null, actions)(Game);
