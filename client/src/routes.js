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
    <Router>
      <div className="app-container">
        <Route path="/" component={NavBarContainer} />
        <Route exact path="/" component={SplashContainer} />
        <Route exact path="/signup" component={SessionContainer} />
        <Route exact path="/lobby" component={LobbyContainer} />
        <Route exact path="/lobby/:language" component={LobbyContainer} />
        <Route exact path="/game" component={GameContainer} />
        <Route path="/" component={Footer} />
      </div>
    </Router>
  );
};

export default Routes;
