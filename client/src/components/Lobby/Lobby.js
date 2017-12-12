import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

class Lobby extends Component {
  constructor(props) {
    super(props);
  }

  render() {

  }
}

export default connect(null, actions)(Lobby);
