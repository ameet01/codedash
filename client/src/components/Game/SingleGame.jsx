import StatsModal from './StatsModal';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import api from '../../api';
import { ClipLoader } from 'react-spinners';
let Highlight = require('react-syntax-highlight');

class SingleGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      showStats: false,
      pointer: 0,
      incorrect: false,
      wrongstreak: 0,
      key: undefined,
      mistakes: 0,
      timer: 5,
      keystrokes: 0,
      gameStarted: false,
      users: [],
      loading: true
    };

    let language = this.props.languages[`${this.props.match.params.language}`];
    this.code = language[this.props.match.params.langnum];
    let spaces = 0;
    for(let i = 1; i < this.code.length; i++) {
      if (this.code[i] === " " && this.code[i-1] !== " " && this.code[i-1] !== '\n') {
        spaces += 1;
      }
    }

    this.codeLength = this.code.split('').filter(char => char !== " ").length + spaces;
    this.timer = undefined;
    this.startTime = undefined;
    this.endTime = undefined;
    this.timeElapsed = undefined;
    this.speed = undefined;
    this.accuracy = undefined;
    this.gameId = parseInt(this.props.match.params.gameId, 10);

    this.registerKeyPress = this.registerKeyPress.bind(this);
    this.backspace = this.backspace.bind(this);
    this.unmountModal = this.unmountModal.bind(this);
  }

  componentDidMount() {
    api.put('/api/updateuser/', {
      id: this.props.auth._id, currentGame: this.gameId, currentGameType: 1, currentGameLang: this.props.match.params.language, currentGameLangNum: this.props.match.params.langnum
    });

    setTimeout(() => {
      const users = [...this.state.users, this.props.auth];
      this.setState({users: users, loading: false});

      this.timer = setInterval(() => {
        this.setState({timer: this.state.timer - 1});
        if (this.state.timer === 0) {
          this.startTime = new Date().getTime();
          clearInterval(this.timer);
          this.setState({gameStarted: true});
          document.getElementById('timer').innerHTML = 'GO!';
          document.getElementById('timer').style.color = '#00b39f';
        }
      }, 1000);
      document.addEventListener('keypress', this.registerKeyPress);
      document.addEventListener('keydown', this.backspace);
    }, 1000);
  }

  componentWillUnmount() {
    api.put('/api/updateuser/', {
      id: this.props.auth._id, currentGame: null, currentGameType: null, currentGameLang: null, currentGameLangNum: null
    });
    clearInterval(this.timer);
    document.removeEventListener('keypress', this.registerKeyPress);
    document.removeEventListener('keydown', this.backspace);
  }

  registerKeyPress(e) {
    e.preventDefault();
    if (this.state.gameStarted) {
      if (this.state.wrongstreak <= 5) {
        if (this.code[this.state.pointer + 1] === undefined && e.keyCode === 13 && this.state.incorrect === false) {
          this.endTime = new Date().getTime();
          this.timeElapsed = ((this.endTime - this.startTime)/1000).toPrecision(4);
          this.speed = ((this.codeLength / 5) / (this.timeElapsed / 60)).toPrecision(4);
          this.accuracy = ((this.codeLength - this.state.mistakes) * 100 / this.codeLength).toPrecision(4);
          this.setState({ gameStarted: false, showStats: true, showButton: true });
        }
        if (e.keyCode === (this.code[this.state.pointer].charCodeAt(0)) && this.state.incorrect === false) {
          this.setState({pointer: this.state.pointer + 1, incorrect: false, keystrokes: this.state.keystrokes + 1});
        } else if (this.code[this.state.pointer].charCodeAt(0) === 10 && e.keyCode === 13) {
          if (this.state.incorrect === true) {
          } else {
            this.setState({incorrect: false});
          }
          let num = this.state.pointer + 1;
          if (this.code[num]) {
            while(this.code[num].match(/\s/g)) {
              num += 1;
            }
            this.setState({pointer: num, keystrokes: this.state.keystrokes + 1});
          }
        } else if (this.code[this.state.pointer].charCodeAt(0) === 10 && e.keyCode !== 13) {
          if (this.state.incorrect === false) {
            this.setState({incorrect: true});
          } else {
            let num = this.state.pointer + 1;
            if (this.code[num]) {
              while(this.code[num].match(/\s/g)) {
                num += 1;
              }
              this.setState({pointer: num, wrongstreak: this.state.wrongstreak + 1});
            }
          }

        } else {
          if (this.state.wrongstreak === 0) {
            this.setState({key: this.state.pointer}, this.setState({incorrect: true, pointer: this.state.pointer + 1, wrongstreak: this.state.wrongstreak + 1, mistakes: this.state.mistakes + 1, keystrokes: this.state.keystrokes + 1}));
          } else {
            this.setState({incorrect: true, pointer: this.state.pointer + 1, wrongstreak: this.state.wrongstreak + 1, keystrokes: this.state.keystrokes + 1});
          }
        }
      }
    }
  }

  backspace(e) {
    if (this.state.gameStarted) {
      if (this.state.incorrect === true && e.keyCode === 8) {
        if (this.state.wrongstreak > 1) {
          let num = this.state.pointer - 1;
          let original = num;
          if (this.code[num]) {
            let string = '';
            while(this.code[num].match(/\s/g)) {
              string+=this.code[num];
              num -= 1;
            }
            if (string.includes('\n')) {
              this.setState({pointer: num+1, wrongstreak: this.state.wrongstreak - 1, keystrokes: this.state.keystrokes + 1 });
            } else {
              this.setState({pointer: original, wrongstreak: this.state.wrongstreak - 1, keystrokes: this.state.keystrokes + 1});
            }
          }
        } else {
          this.setState({pointer: this.state.pointer - 1, incorrect: false, key: undefined, wrongstreak: 0, keystrokes: this.state.keystrokes + 1});
        }
      } else if (this.state.incorrect === false && e.keyCode === 8) {
        let num = this.state.pointer - 1;
        let original = num;
        if (this.code[num]) {
          let string = '';
          while(this.code[num].match(/\s/g)) {
            string+=this.code[num];
            num -= 1;
          }
          if (string.includes('\n')) {
            this.setState({pointer: num, keystrokes: this.state.keystrokes + 1});
          } else {
            this.setState({pointer: original, keystrokes: this.state.keystrokes + 1});
          }
        }
      }
    }
  }

  unmountModal() {
    this.setState({ showStats: false });
  }

  render() {
    let spinner;
    let codeArea;
    let highlight;

    spinner = <div className="sweet-loading">
      <ClipLoader
        color={'#2d9ee0'}
        loading={this.state.loading}
        size={45}
        />
    </div>;

    let count = 1;
    for(let z = 0; z < this.code.length; z++) {
      if (this.code[z] === '\n') {
        count += 1;
      }
    }

    let lineNumbers = [];
    let codeStyle;
    if (this.props.match.params.language === 'non-code') {
      lineNumbers = null;
      codeStyle = { padding: '10px' };
      let pres = document.querySelectorAll('pre');
      for (let i = 0; i < pres.length; i++) {
        pres[i].classList.add('changeMinWidth');
      }
    } else {
      for(let i = 1; i < count; i++) {
        lineNumbers.push(i);
      }
      lineNumbers = <div className="linenumbers">
        {lineNumbers.map((num, idx) => <span key={idx}>{num}</span>)}
      </div>;
      codeStyle = {};
    }

    let codeOpacity;
    if (this.state.gameStarted) {
      codeOpacity = { opacity: '1' };
    } else {
      codeOpacity = { opacity: '0' };
    }

    Object.assign(codeStyle, codeOpacity);

    if (this.state.loading) {
      return (
        <div className="game">
          <h1>Solo Game</h1>
          {spinner}
        </div>
      );
    } else {
      codeArea = <div className="code-area top">
        <pre id="pre">
          {lineNumbers}
          <code className="code" style={codeStyle}>
            {this.code.split('').map((char, index) => {
              let span;
              let bolded;
              if (this.state.wrongstreak > 0) {
                if (this.state.pointer - this.state.wrongstreak > index) {
                  bolded = this.props.match.params.language === 'non-code' ?
                    ' bolded noncode' : ' bolded';
                } else {
                  bolded = '';
                }
              } else {
                if (this.state.pointer > index) {
                  bolded = this.props.match.params.language === 'non-code' ?
                    ' bolded noncode' : ' bolded';
                } else {
                  bolded = '';
                }
              }

              if (index === this.state.pointer) {
                if (char === '\n') {
                  span = <span
                    className={
                      this.state.incorrect ?
                      'active enter-incorrect' : 'active enter'
                    }
                    key={index}>
                    {char}
                  </span>;
                } else {
                  if (this.state.incorrect) {
                    span = <span className="wrong" key={index}>{char}</span>;
                    } else {
                      span = <span className="active" key={index}>{char}</span>;
                      }
                    }
                  } else {
                    span = <span className={`regular${bolded}`} key={index}>{char}</span>;
                    }

                    if (this.state.key === index) {
                      span = <span className="incorrect" key={index}>{char}</span>;
                      }
                      return span;
                    })}
          </code>
        </pre>
      </div>;
    }

    let lang;
    if(this.props.match.params.language === 'non-code') {
      lang = 'Markdown';
    } else {
      lang = this.props.match.params.language;
    }

    highlight =
      <div className="code-area bottom">
        <Highlight
          lang={`${lang}`}
          value={`${this.code}`}
        />
        {codeArea}
      </div>;

    let timer;
    if (!this.state.loading) {
      timer = <div id="timer">Timer: {this.state.timer}</div>;
    }

    let lobbyButton = <div
      className="lobby-back"
      onClick={() => this.props.history.push('/lobby')}>
      Lobby
    </div>;

    return <div className="game">
      <h1>Solo Game</h1>
      {timer}
      {highlight}
      {lobbyButton}
      <StatsModal
        mounted={this.state.showStats}
        onTransitionEnd={this.transitionEnd}
        speed={this.speed}
        time={this.timeElapsed}
        errors={this.state.mistakes}
        accuracy={this.accuracy}
        unmount={this.unmountModal}
        collateral={this.state.keystrokes - this.codeLength + 1}
        />
    </div>;
  }
}

export default connect(null, actions)(SingleGame);
