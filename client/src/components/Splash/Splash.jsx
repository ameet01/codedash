import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

import '../../styles/Splash.css';

class Splash extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="splash-container">
        <div className="tagline">
          <h2></h2>
          <button>Play Now</button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Splash);
