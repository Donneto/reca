// Dependencies
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Custom
import Home from '../views/home';
import Registration from '../views/registration';
import SearchResults from '../views/searchResults';
import EditInformation from '../views/EditInformation';
import Footer from './footer';
import Header from './header';

const appRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/registro">
          <Registration />
        </Route>
        <Route path="/resultados">
          <SearchResults date={new Date()}/>
        </Route>
        <Route path="/editar-informacion">
          <EditInformation />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default appRouter;
