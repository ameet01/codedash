import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Session from '../components/Session/Session';

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

export default connect(mapStateToProps, mapDispatchToProps)(Session);
