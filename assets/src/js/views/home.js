// Dependencies
import React from 'react';
// import config from 'react-global-configuration';

// Custom
import SearchBar from '../components/searchBar';
import About from '../components/about';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    return(
      <div className="home">
        <SearchBar view="home"/>
        <About/>
      </div>
    );
  }
}

export default Home;
