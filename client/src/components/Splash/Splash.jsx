import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
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
    document.querySelector('.app-container').classList.add('height100');
  }

  componentWillUnmount() {
    document.querySelector('html').classList.remove('height100');
    document.querySelector('body').classList.remove('height100');
    document.querySelector('#root').classList.remove('height100');
    document.querySelector('.app-container').classList.remove('height100');
  }

  demoLogin() {
    let randomNumber = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    axios.post('/api/login', {
      username: `demo${randomNumber}`, password: "password"
    })
    .then(() => this.props.history.push('/lobby'))
    .then(() => this.props.fetchUser());
  }

  render() {
    return(
      <div className="splash-container">
        <div className="tagline">
          <h2>Dash to the finish</h2>
          <p>Hone your code typing skills and race head to head against your friends</p>
          <button onClick={() => this.demoLogin()}>Play Now</button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Splash);
