import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

let code = `class Game extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div></div>;
  }
}

export default connect(null, actions)(Game);
`;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {pointer: 0};
  }

  componentDidMount() {
    document.addEventListener('keypress', (e) => this.registerKeyPress(e));
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', (e) => this.registerKeyPress(e));
  }

  registerKeyPress(e) {
    e.preventDefault();
    if(e.keyCode === (code[this.state.pointer].charCodeAt(0))) {
      this.setState({pointer: this.state.pointer += 1});
    } else if(code[this.state.pointer].charCodeAt(0) === 10 && e.keyCode === 13) {
      this.setState({pointer: this.state.pointer += 1});
    }
  }

  render() {
    return <div>
      <h1>WHY GAME</h1>
      <pre>{code.split('').map((char, index) => {
          let span;
          if(index === this.state.pointer) {
            span = <span className='active'>{char}</span>;
          } else {
            span = <span className='regular'>{char}</span>;
          }
          return span;
        })}</pre>
    </div>;

  }
}

export default connect(null, actions)(Game);
