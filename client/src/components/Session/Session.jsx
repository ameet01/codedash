import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

class Session extends Component {
  constructor(props) {
    super(props);
    this.state={username: "", password: "", error: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/register', {username: this.state.username, password: this.state.password})
    .then(() => this.props.fetchUser()).then(() => this.setState({error: ''}))
    .then(() => this.props.history.push('/lobby'))
    .catch(error => { this.setState({error: 'Invalid Credentials'}); });
  }

  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  }

  render() {
    return (
      <div className='session'>
        <div className='inner-session'>
          <h1>Sign Up!</h1>
          <form method='post' onSubmit={(e) => this.handleSubmit(e)}>
            <input type='text' onChange={this.update('username')} name='username' value={this.state.username} autoComplete="new-username" />
            <input type='password'  onChange={this.update('password')} name='password' value={this.state.password} autoComplete="new-password" />
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Session);
