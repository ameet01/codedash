import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Game from '../components/Game/Game';

let javascript1 = `const Auth = ({component: Component, path, auth}) => (
  <Route exact path={path} render={(props) => (
      !auth ? (
        <Component {...props} />
      ) : (
        <Redirect to='/lobby' />
      )
    )} />
);`;
let javascript2 = ``;
let javascript3 = ``;
let javascript4 = ``;
let javascript5 = ``;
let javascript6 = ``;

const LANGUAGES = {
  'javascript': [
    javascript1, javascript2, javascript3, javascript4, javascript5, javascript6
  ],
  'ruby': [

  ],
  'java': [

  ],
  'python': [

  ],
  'c++': [

  ],
  'css': [

  ],
  'html': [

  ]
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    languages: LANGUAGES
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
