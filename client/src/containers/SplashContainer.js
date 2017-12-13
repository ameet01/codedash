import { connect } from 'react-redux';

import Splash from '../components/Splash/Splash';

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

let mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
