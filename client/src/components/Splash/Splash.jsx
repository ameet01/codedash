import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentDidMount() {
    document.querySelector('html').classList.add('height100');
    document.querySelector('body').classList.add('height100');
    document.querySelector('#root').classList.add('height100');
    document.querySelector('.app-container').classList.add('height100 minheight815');
  }

  componentWillUnmount() {
    document.querySelector('html').classList.remove('height100');
    document.querySelector('body').classList.remove('height100');
    document.querySelector('#root').classList.remove('height100');
    document.querySelector('.app-container').classList.remove('height100 minheight815');
  }

  demoLogin() {
    let randomNumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    axios.post('/api/login', {
      username: `player${randomNumber}`, password: "password"
    })
    .then(() => this.props.history.push('/lobby'))
    .then(() => this.props.fetchUser());
  }

  render() {
    return(
      <div className="splash-container">
        <div className="tagline">
          <h2>Dash to the finish</h2>
          <div className="splash-image">
            <img src="codedash-editor.svg" alt="JavaScript code snippet" />
          </div>
          <p>Hone your code typing skills and race head to head against your friends</p>
          <div className="splash-buttons">
            <button onClick={() => this.props.history.push('/signup')}>Sign Up</button>
            <button onClick={() => this.demoLogin()}>Play Now</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Splash);
