import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import axios from 'axios';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: ""};
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
    axios.post('/login', {username: this.state.username, password: this.state.password}).then(() => this.props.fetchUser());
  }

  logout() {
    axios.get('./logout').then(() => this.props.fetchUser());
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (<form method='post' onSubmit={(e) => this.handleSubmit(e)}>
          <input type='text' onChange={this.update('username')} name='username' value={this.state.username} />
          <input type='password'  onChange={this.update('password')} name='password' value={this.state.password} />
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

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React - Fullstack!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to='about'><button>Test React Router</button></Link>
        <br />
        <br />
        <button onClick={this.props.actions.expressTest}>Test if Express is working</button>
        <br />
        <br />
        <button onClick={this.props.actions.dbTest}>Test if Express and Sequelize are working</button>
        <div style={{ padding: '30px' }}>{this.props.results}</div>
      </div>
    );
  }
}

export default connect(null, actions)(App);
