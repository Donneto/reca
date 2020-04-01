import '../scss/master.scss';

// Dependencies
import React from 'react';
import { render } from 'react-dom';
import './config';

// custom
import Router from './components/router';

class Reca extends React.Component {

  render() {

    return (
      <Router />
    );
  }
}

render(<Reca />, document.getElementById('app'));
