// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';

export default class About extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={classnames('About', className)} props={this.props}>
        <h1>
          React Router working!
        </h1>
      </div>
    );
  }
}
