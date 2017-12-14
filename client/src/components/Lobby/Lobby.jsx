import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {NavLink, Link} from 'react-router-dom';
import axios from 'axios';

const languages = ['javascript', 'ruby', 'c++', 'java', 'python', 'html', 'css'];

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {gameType: 1, error: undefined};
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    axios.get('/api/indexusers')
      .then(users => this.props.receiveUsers(users.data));
  }

  createRoom() {
    if(this.props.match.params.language) {
      let random = Math.floor(Math.random() * 10) + 1;
      this.setState({error: undefined});
      this.props.history.push(`/game/${this.props.match.params.language}/${this.state.gameType}/${random}`);
    } else {
      this.setState({error: "Incomplete Inputs"})
    }
  }

  render() {
    let obj = {};

    this.props.users.forEach(user => {
      if(!obj[user.currentGame] && user.currentGameType === 2 && user.username !== this.props.auth.username) {
        obj[user.currentGame] = 1;
      } else {
        obj[user.currentGame] += 1;
      }
    });

    let users = this.props.users.filter(user => obj[user.currentGame] === 1);

    return <div className='lobby'>
      <div className='inner-lobby'>
        <h1>Lobby!</h1>
        <div className='rooms-and-language-select'>
          <div className='rooms-list'>
            <ul>
              <li className='room-item'>Test Room </li>
              <li className='room-item'>Test Room </li>
              {users.map(user => <li className='room-item'><Link to={`/game/${user.currentGameLang}/${user.currentGameType}/${user.currentGame}`}>Room #{user.currentGame}</Link></li>)}
            </ul>
          </div>
          <div className='game-select'>
            <ul>
              <li onClick={() => this.setState({gameType: 1})}>Singleplayer</li>
              <li onClick={() => this.setState({gameType: 2})}>Multiplayer</li>
            </ul>
          </div>
          <div className='language-select'>
            <ul>
              {languages.map((language, index) =>
                <NavLink to={`/lobby/${language}`}
                  activeClassName='activelanguage'
                  key={index}>
                  {language}
                </NavLink>)}
            </ul>
          </div>
        </div>

        <button onClick={() => this.createRoom()}>Submit</button>
        <p style={{color: 'red'}}>{this.state.error}</p>
      </div>
    </div>;
  }
}

export default connect(null, actions)(Lobby);
