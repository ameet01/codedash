import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import classnames from 'classnames';
import axios from 'axios';

import './style.css';

class App extends Component {
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
    console.log(this.state);
    return (e) => this.setState({[property]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/login', {username: this.state.username, password: this.state.password})
    .then(() => this.props.fetchUser()).then(() => this.setState({error: ''}))
    .catch(error => { this.setState({error: 'Invalid Credentials'}); });
  }

  logout() {
    axios.get('./api/logout').then(() => this.props.fetchUser()).then(() => this.setState({username: "", password: "", error: ""}));
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (<form method='post' onSubmit={(e) => this.handleSubmit(e)}>
          <input type='text' onChange={this.update('username')} name='username' value={this.state.username} autoComplete="new-username" />
          <input type='password'  onChange={this.update('password')} name='password' value={this.state.password} autoComplete="new-password" />
          <button>Submit</button>
        </form>);
      default:
        return <button onClick={() => this.logout()}>Log Out</button>;
    }
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classnames('App', className)} props={this.props}>
        {this.renderContent()}
        {this.state.error}
      </div>
    );
  }
}

export default connect(null, actions)(App);
