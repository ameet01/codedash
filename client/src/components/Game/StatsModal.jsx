import React from 'react';

class StatsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      style: {
        opacity: 0
      }
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
    if (!this.props.mounted) {
      this.setState({ open: false });
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
    if (e.key === 'Escape') {
      this.props.unmount();
    }
  }

  render() {
    if (this.props.mounted) {
      return(
        this.state.open &&
        <div className="game-stats"
          style={this.state.style}
          onTransitionEnd={this.transitionEnd}>
          <div className="stats-inner">
            <h1>Game Statistics</h1>
            <div className="modal-close" onClick={this.props.unmount}>x</div>
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
          </div>
          <div className="backdrop" onClick={this.props.unmount}></div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default StatsModal;
