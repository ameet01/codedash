import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Footer extends Component {
  render() {
    return(
      <footer>
        <div className="footer-inner">
          <div className="copyright">
            © 2017 CodeDash
          </div>
          <div className="footer-links">
            <span onClick={() => this.props.history.push('/about')}>
              About Us
            </span>
            <a href="https://www.github.com/ameet01/codedash"
              target="_blank"
              rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default connect(null, actions)(Footer);
