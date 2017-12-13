import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: "", error: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/login', {username: this.state.username, password: this.state.password})
    .then(() => this.props.fetchUser()).then(() => this.setState({error: ''}))
    .catch(error => { this.setState({error: 'Invalid Credentials'}); });
  }

  logout() {
    axios.get('./api/logout').then(() => this.props.fetchUser()).then(() => this.setState({username: "", password: "", error: ""}))
    .then(() => this.props.history.push('/'));
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (<form method='post' onSubmit={(e) => this.handleSubmit(e)}>
          <input type='text' onChange={this.update('username')} name='username' value={this.state.username} autoComplete="new-username" />
          <input type='password'  onChange={this.update('password')} name='password' value={this.state.password} autoComplete="new-password" />
          <button>Log In</button>
        </form>);
      default:
        return <div className="user-info">
          <h4>Welcome, {this.props.auth.username}</h4>
          <button onClick={() => this.logout()}>Log Out</button>
        </div>;
    }
  }

  render() {
    return (
      <div className='navbar' props={this.props}>
        <div className='inside-navbar'>
          <h1 onClick={() => this.props.history.push('/')}>CodeTyper</h1>
          {this.renderContent()}
          <div className='navbar-error'>{this.state.error}</div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(NavBar);
