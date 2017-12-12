import React from 'react';
import NavBarContainer from './containers/NavBarContainer';
import GameContainer from './containers/GameContainer';
import LobbyContainer from './containers/LobbyContainer';
import SessionContainer from './containers/SessionContainer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <Route path="/" component={NavBarContainer} />
        <Route exact path="/signup" component={SessionContainer} />
        <Route exact path="/lobby" component={LobbyContainer} />
        <Route exact path="/game" component={GameContainer} />
      </div>
    </Router>
  );
};

export default Routes;
