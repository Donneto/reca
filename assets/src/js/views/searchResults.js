import React from 'react';
import SearchBar from '../components/searchBar';
import Results from '../components/searchResults';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="search-results-view">
        <SearchBar />
        <Results />
      </div>
    );
  }
}

export default SearchResults;
