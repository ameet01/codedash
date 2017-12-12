import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBarContainer from './containers/NavBarContainer';
import SplashContainer from './containers/SplashContainer';
import SessionContainer from './containers/SessionContainer';
import LobbyContainer from './containers/LobbyContainer';
import GameContainer from './containers/GameContainer';
import Footer from './components/Footer/Footer';

import {AuthRoute, ProtectedRoute} from './util/route_util';

const Routes = () => {
  return (
    <div className="app-container">
      <Router>
        <div>
          <Route path="/" component={NavBarContainer} />
          <AuthRoute path="/" component={SplashContainer} />
          <AuthRoute path="/signup" component={SessionContainer} />
          <ProtectedRoute path="/lobby" component={LobbyContainer} />
          <ProtectedRoute path="/game" component={GameContainer} />
          <Route path="/" component={Footer} />
        </div>
      </Router>
    </div>
  );
};

export default Routes;
