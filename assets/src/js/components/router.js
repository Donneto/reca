// Dependencies
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Custom
import Home from '../views/home';
import Registration from '../views/registration';
import Footer from './footer';
import Header from './header';

const appRouter = () => {
  return (
    <Router>
      <div>
        <Header />
        <section className="section">
          <div className="container">
            <Switch>
              <Route path="/registro">
                <Registration />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </section>
        <Footer />
      </div>
    </Router>
  );
};

export default appRouter;
