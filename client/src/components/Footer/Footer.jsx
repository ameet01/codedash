import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';

class Footer extends Component {
  render() {
    return(
      <footer>
        <div className="footer-inner">
          <div className="copyright">
            © 2017 CodeTyper
          </div>
          <div className="footer-links">
            <a onClick={() => this.props.history.push('/about')}>About Us</a>
            <a href="https://www.github.com/ameet01/flexproject" target="_blank">GitHub</a>
          </div>
        </div>
      </footer>
    );
  }
}
export default connect(null, actions)(Footer);
