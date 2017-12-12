import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

class Session extends Component {
  constructor(props) {
    super(props);
  }

  render() {

  }
}

export default connect(null, actions)(Session);
