import {Redirect, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';

const Auth = ({component: Component, path, auth}) => (
  <Route exact path={path} render={(props) => (
      !auth ? (
        <Component {...props} />
      ) : (
        <Redirect to='/lobby' />
      )
    )} />
);

const Protected = ({component: Component, path, auth}) => (
  <Route exact path={path} render={(props) => (
      auth ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      )
    )} />
);

const mapStateToProps = state => (
  {auth: state.auth}
);

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
