<<<<<<< HEAD
import { connect } from 'react-redux';

import Session from '../components/Session/Session';

let mapStateToProps;
let mapDispatchToProps;
=======
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
>>>>>>> 5e9415dcd07e2fb550da0138c1edc5a968200572

export default connect(mapStateToProps, mapDispatchToProps)(Session);
