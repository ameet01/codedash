import React from 'react';
<<<<<<< HEAD
=======
import NavBarContainer from './containers/NavBarContainer';
import GameContainer from './containers/GameContainer';
import LobbyContainer from './containers/LobbyContainer';
import SessionContainer from './containers/SessionContainer';

>>>>>>> 5e9415dcd07e2fb550da0138c1edc5a968200572
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBarContainer from './containers/NavBarContainer';
import SplashContainer from './containers/SplashContainer';
import SessionContainer from './containers/SessionContainer';
import LobbyContainer from './containers/LobbyContainer';
import GameContainer from './containers/GameContainer';

const Routes = () => {
  return (
<<<<<<< HEAD
    <div className="app-container">
      <Router>
        <div>
          <Route path="/" component={NavBarContainer} />
          <Route exact path="/" component={SplashContainer} />
          <Route exact path="/signup" component={SessionContainer} />
          <Route exact path="/lobby" component={LobbyContainer} />
          <Route exact path="/game" component={GameContainer} />
        </div>
      </Router>
    </div>
=======
    <Router>
      <div>
        <Route path="/" component={NavBarContainer} />
        <Route exact path="/signup" component={SessionContainer} />
        <Route exact path="/lobby" component={LobbyContainer} />
        <Route exact path="/game" component={GameContainer} />
      </div>
    </Router>
>>>>>>> 5e9415dcd07e2fb550da0138c1edc5a968200572
  );
};

export default Routes;
