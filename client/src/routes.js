import React from 'react';
import NavBarContainer from './containers/NavBarContainer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <Route path="/" component={NavBarContainer} />
        <Route exact path="/" component={SplashPageContainer} />
        <Route exact path="/signup" component={SignUpContainer} />
        <Route exact path="/lobby" component={LobbyContainer} />
        <Route exact path="/game" component={GameContainer} />
      </div>
    </Router>
  );
};

export default Routes;
