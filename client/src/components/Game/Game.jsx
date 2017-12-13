import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

const code = `d3.interpolators = [
  function(a, b) {
    var t = typeof b;
    return (t === "string" ? (d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) ? d3_interpolateRgb : d3_interpolateString)
        : b instanceof d3_Color ? d3_interpolateRgb
        : t === "object" ? (Array.isArray(b) ? d3_interpolateArray : d3_interpolateObject)
        : d3_interpolateNumber)(a, b);
  }
];
`;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {pointer: 0, incorrect: false, wrongstreak: 0, key: undefined};
  }

  componentDidMount() {
    document.addEventListener('keypress', (e) => this.registerKeyPress(e));
    document.addEventListener('keydown', (e) => this.backspace(e));
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', (e) => this.registerKeyPress(e));
    document.removeEventListener('keydown', (e) => this.backspace(e));
  }

  registerKeyPress(e) {
    e.preventDefault();
    if(this.state.wrongstreak <= 5) {
      if(e.keyCode === (code[this.state.pointer].charCodeAt(0)) && this.state.incorrect === false) {
        this.setState({pointer: this.state.pointer += 1, incorrect: false});
      } else if(code[this.state.pointer].charCodeAt(0) === 10 && e.keyCode === 13) {
        let num = this.state.pointer + 1;
        if(code[num]) {
          while(code[num].match(/\s/g)) {
            num += 1;
          }
          this.setState({pointer: num});
        }
      } else {
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
        this.setState({pointer: this.state.pointer -= 1, wrongstreak: this.state.wrongstreak -= 1 }, console.log(this.state.pointer));
      } else {
        this.setState({pointer: this.state.pointer -= 1, incorrect: false, key: undefined, wrongstreak: 0}, console.log(this.state.pointer));
      }
    } else if(this.state.incorrect === false && e.keyCode === 8) {
      let num = this.state.pointer - 1;
      if(code[num]) {
        while(code[num].match(/\s/g)) {
          num -= 1;
        }
        this.setState({pointer: num});
      }
      // this.setState({pointer: this.state.pointer -= 1});
    }
  }

  render() {
    return <div>
      <h1>WHY GAME</h1>
      <pre><code>{code.split('').map((char, index) => {
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
