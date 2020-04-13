import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import config from 'react-global-configuration';
import _ from '../utils';
import Item from './resultItem';

const internals = {
  query: _.getQuery(),
  client: algoliasearch(config.get('app.searchAppID'), config.get('app.searchKey')),
};

internals.algolia = internals.client.initIndex('reca_prod');

class SearchResultsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
    this._executeSearch = this._executeSearch.bind(this);
  }

  async componentDidMount() {

    await this._executeSearch();
  }

  async _executeSearch() {
    internals.query = _.getQuery();

    const data = await internals.algolia.search(`${internals.query.queryString} ${internals.query.city}`);

    this.setState({ data: data.hits });
  }

  render() {
    const { data } = this.state;

    return (
      <section className="section search-results-items is-light">
        <div className="container ">
          <p className="has-text-centered"><b>Servicios / Productos encontrados: {data.length}</b></p>
          {data.map( negocio => <Item key={negocio.objectID} item={negocio}/>)}
          {data.length === 0 && <div className="card">
            <div className="card-content"><p className="title is-4 has-text-centered">No se encontraron productos o servicios</p></div>
          </div> }
          <p className="has-text-centered"><img src="/images/team.svg" width="65"/></p>
        </div>
      </section>
    );
  }
}

export default SearchResultsComponent;
