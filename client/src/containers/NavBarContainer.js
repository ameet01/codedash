import * as Actions from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavBar from '../components/NavBar/NavBar';

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    receiveUser: (user) => dispatch(Actions.receiveUser(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
