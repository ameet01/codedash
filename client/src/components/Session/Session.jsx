import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import api from '../../api';

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", error: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({ error: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    api.post(
      '/api/register',
      { username: this.state.username, password: this.state.password }
    )
    .then(() => this.props.fetchUser()).then(() => this.setState({ error: '' }))
    .then(() => this.props.history.push('/lobby'))
    .catch(error => { this.setState({ error: 'Invalid Inputs' }); });
  }

  update(property) {
    return (e) => this.setState({ [property]: e.target.value });
  }

  render() {
    return (
      <div className="session">
        <div className="inner-session">
          <h1>Sign Up</h1>
          <div className="signup-errors">{this.state.error}</div>
          <form method="post" onSubmit={(e) => this.handleSubmit(e)}>
            <span>Username</span>
            <input type="text"
              onChange={this.update("username")}
              name="username" value={this.state.username}
              autoComplete="new-username" />
            <span>Password</span>
            <input type="password"
              onChange={this.update("password")}
              name="password" value={this.state.password}
              autoComplete="new-password" />
            <button>Create Account</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Session);
