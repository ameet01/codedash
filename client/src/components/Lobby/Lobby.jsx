import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {languageSelect: "", roomSelect: ""};
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
              <li>JavaScript</li>
              <li>Ruby</li>
              <li>C++</li>
            </ul>
          </div>
        </div>
        
        <button>Submit</button>
      </div>
    </div>;
  }
}

export default connect(null, actions)(Lobby);
