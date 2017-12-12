import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBarContainer from './containers/NavBarContainer';
import SplashContainer from './containers/SplashContainer';
import SessionContainer from './containers/SessionContainer';
import LobbyContainer from './containers/LobbyContainer';
import GameContainer from './containers/GameContainer';
import Footer from './components/Footer/Footer';

const Routes = () => {
  return (
    <div className="app-container">
      <Router>
        <div>
          <Route path="/" component={NavBarContainer} />
          <Route exact path="/" component={SplashContainer} />
          <Route exact path="/signup" component={SessionContainer} />
          <Route exact path="/lobby" component={LobbyContainer} />
          <Route exact path="/game" component={GameContainer} />
          <Route path="/" component={Footer} />
        </div>
      </Router>
    </div>
  );
};

export default Routes;
