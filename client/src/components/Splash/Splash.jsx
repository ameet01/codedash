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
          <h2>Dash to the finish</h2>
          <p>Hone your code typing skills and race head to head against your friends</p>
          <button>Play Now</button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Splash);
