import React from 'react';
import { withRouter } from 'react-router-dom';

class StatsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      style: {
        opacity: 0
      },
      transition: 0
    };

    this.transitionEnd = this.transitionEnd.bind(this);
    this.mountStyle = this.mountStyle.bind(this);
    this.unmountStyle = this.unmountStyle.bind(this);
    this.escToClose = this.escToClose.bind(this);
  }

  componentDidMount() {
    // setTimeout(this.mountStyle, 10);
    document.addEventListener('keydown', this.escToClose);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.mounted) {
      return this.unmountStyle();
    }

    this.setState({ open: true });
    setTimeout(this.mountStyle, 10);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escToClose);
  }

  transitionEnd() {
    this.setState({ transition: this.state.transition + 1 });
    if (this.state.transition === 1) {
      this.setState({ open: false });
      this.props.unmount();
    }
  }

  mountStyle() {
    this.setState({ style: {
      opacity: 1
    }});
  }

  unmountStyle() {
    this.setState({ style: {
      opacity: 0
    }});
  }

  escToClose(e) {
    if (e.key === 'Escape' || e.key === 'Enter') {
      this.unmountStyle();
    }
  }

  render() {
    let raceResult;

    if (this.props.currentUser) {
      if (this.props.currentUser.currentGameType === 2) {
        if (this.props.order.length > 0) {
          if (this.props.order[0].username === this.props.currentUser.username) {
            console.log('hi');
            raceResult = "You win! Congrats!";
          } else {
            raceResult = "Nice try!";
          }
        }
      }
    }

    if (this.state.open) {
      return(
        <div className="game-stats"
          style={this.state.style}
          onTransitionEnd={this.transitionEnd}>
          <div className="stats-inner">
            <div className="race-result">{raceResult}</div>
            <h1>Game Statistics</h1>
            <div className="modal-close" onClick={this.unmountStyle}>x</div>
            <div className="stats-row">
              <span>Speed</span>
              <span>{this.props.speed} WPM</span>
            </div>
            <div className="stats-row">
              <span>Time</span>
              <span>{this.props.time} seconds</span>
            </div>
            <div className="stats-row">
              <span>Errors</span>
              <span>{this.props.errors} {this.props.errors === 1 ? 'character' : 'characters'}</span>
            </div>
            <div className="stats-row">
              <span>Accuracy</span>
              <span>{this.props.accuracy}%</span>
            </div>
            <div className="stats-row">
              <span>Collateral</span>
              <span>{this.props.collateral} keystrokes</span>
            </div>
            <button onClick={() => this.props.history.push('/lobby')}>Back to Lobby</button>
            <button onClick={this.unmountStyle}>View Code</button>
          </div>
          <div className="backdrop" onClick={this.unmountStyle}></div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(StatsModal);
