<<<<<<< HEAD
import { connect } from 'react-redux';

import Lobby from '../components/Lobby/Lobby';

let mapStateToProps;
let mapDispatchToProps;
=======
import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Lobby from '../components/Lobby/Lobby';

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}
>>>>>>> 5e9415dcd07e2fb550da0138c1edc5a968200572

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
