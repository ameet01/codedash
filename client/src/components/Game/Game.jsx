import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

const code = `render() {
  return <div>
    <h1>WHY GAME</h1>
    <pre><code>{code.split('').map((char, index) => {
        let span;
        if(index === this.state.pointer) {
          if(char === "/n") {
            span = <span className='active enter' key={index}>{char}</span>;
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
`;

const codeLength = code.split(/\s+/g).length - 1;



class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {pointer: 0, incorrect: false, wrongstreak: 0, key: undefined, mistakes: 0};
    this.registerKeyPress = this.registerKeyPress.bind(this);
    this.backspace = this.backspace.bind(this);
    let language = this.props.languages[`${this.props.match.params.language}`];
    this.code = language[Math.floor(Math.random()*language.length)];
  }

  componentDidMount() {
    document.addEventListener('keypress', this.registerKeyPress);
    document.addEventListener('keydown', this.backspace);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.registerKeyPress);
    document.removeEventListener('keydown', this.backspace);
  }

  registerKeyPress(e) {
    e.preventDefault();
    if(this.state.wrongstreak <= 5) {
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
          this.setState({key: this.state.pointer}, this.setState({incorrect: true, pointer: this.state.pointer += 1, wrongstreak: this.state.wrongstreak += 1}));
        } else {
          this.setState({incorrect: true, pointer: this.state.pointer += 1, wrongstreak: this.state.wrongstreak += 1});
        }
      }
    }
  }

  backspace(e) {
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
            console.log('hi');
            this.setState({pointer: num+1, wrongstreak: this.state.wrongstreak -= 1 }, console.log(this.state.pointer));
          } else {
            this.setState({pointer: original, wrongstreak: this.state.wrongstreak -= 1});
          }
        }
      } else {
        this.setState({pointer: this.state.pointer -= 1, incorrect: false, key: undefined, wrongstreak: 0}, console.log(this.state.pointer));
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

  render() {
    return <div>
      <h1>Test Game</h1>
      <pre><code>{this.code.split('').map((char, index) => {
          let span;
          if(index === this.state.pointer) {
            if(char === "\n") {
              span = <span style={ this.state.incorrect ? { background:'red'} : {background : 'lightgreen'} }  className='active enter' key={index}>{char}</span>;
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
