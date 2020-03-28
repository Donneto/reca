// Dependencies
import React from 'react';
// import config from 'react-global-configuration';

// Custom
import SearchBarHome from '../components/searchBarHome';
import About from '../components/about';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    return(
      <div className="home-view">
        <SearchBarHome />
        <About/>
      </div>
    );
  }
}

export default Home;
