import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBarContainer from './containers/NavBarContainer';
import SplashContainer from './containers/SplashContainer';
import SessionContainer from './containers/SessionContainer';
import LobbyContainer from './containers/LobbyContainer';
import SingleGameContainer from './containers/SingleGameContainer';
import MultiGameContainer from './containers/MultiGameContainer';
import Footer from './components/Footer/Footer';

import {AuthRoute, ProtectedRoute} from './util/route_util';

const Routes = () => {
  return (
    <Router>
      <div className="app-container">
        <Route path="/" component={NavBarContainer} />
        <AuthRoute path="/" component={SplashContainer} />
        <AuthRoute path="/signup" component={SessionContainer} />
        <ProtectedRoute path="/lobby" component={LobbyContainer} />
        <ProtectedRoute path="/lobby/:language" component={LobbyContainer} />
        <ProtectedRoute path="/game/:language/:langnum/1/:gameId" component={SingleGameContainer} />
        <ProtectedRoute path="/game/:language/:langnum/2/:gameId" component={MultiGameContainer} />
        <Route path="/" component={Footer} />
      </div>
    </Router>
  );
};

export default Routes;
