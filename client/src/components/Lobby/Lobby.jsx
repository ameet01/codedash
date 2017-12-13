import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const languages = ['javascript', 'ruby', 'c++', 'java'];

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {languageSelect: "", roomSelect: ""};
    this.createRoom = this.createRoom.bind(this);
    this.selectLanguage = this.selectLanguage.bind(this);
  }

  createRoom() {
    this.props.history.push('/game');
  }

  selectLanguage(e) {
    this.setState({languageSelect: languages[e.target.value]});
  }

  render() {
    return <div className='lobby'>
      <div className='inner-lobby'>
        <h1>Lobby!</h1>
        <div className='rooms-and-language-select'>
          <div className='rooms-list'>
            <ul>
              <li>Room 1</li>
              <li>Room 2</li>
              <li>Room 3</li>
            </ul>
          </div>
          <div className='language-select'>
            <ul>
              {languages.map((language, index) => <NavLink to={`/lobby/${language}`} activeClassName='activelanguage' key={index} value={index} onClick={(e) => this.selectLanguage(e)}>{language}</NavLink>)}
            </ul>
          </div>
        </div>
      </div>

      <button onClick={() => this.createRoom()}>Submit</button>
    </div>;
  }
}

export default connect(null, actions)(Lobby);
