import React from 'react';
import Typewriter from 'typewriter-effect/dist/core';
import algoliasearch from 'algoliasearch/lite';
import config from 'react-global-configuration';

const internals = {
  client: algoliasearch(config.get('app.searchAppID'), config.get('app.searchKey'))
};

internals.algolia = internals.client.initIndex('reca_prod');

class SearchBarHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.initTypeWriter = this.initTypeWriter.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
  }

  componentDidMount() {
    this.initTypeWriter();
  }

  initTypeWriter() {
    const typeWriterEl = document.querySelector('.typewriter-show');
    const tw = new Typewriter(typeWriterEl, {
      strings: ['Carnes', 'Maiz', 'Verduras', 'Frutas', 'Pollo', 'A Domicilio', 'Pastas'],
      autoStart: true,
      loop: true,
      cursor: '_',
      pauseFor: 5000
    });

    tw.start();
  }

  _handleSearch(e) {
    e.preventDefault();

    internals.algolia.search('coca').then(({ hits }) => {
      console.log(hits);
    });
  }

  render() {
    return (
      <div className="search-bar row">
        <div className="columns is-centered">
          <div className="column is-two-thirds has-text-centered">
            <img src="/images/team.svg" width="120" />
            <br/><br/>
            <h2 className="has-text-centered title is-2 ">
              <span className="typewriter-show has-text-primary is-uppercase has-text-weight-bold" />
            </h2>
            <h5 className="title is-5 has-text-centered has-text-grey">
              <span>¿Qu&eacute; estas buscando?</span>
            </h5>
            <div className="field">
              <div className="control has-icons-left">
                <input className="input  is-primary is-rounded" type="text" placeholder="Arroz, frijoles, platanos &oacute; bananos el roble, pollos satelite" required="required" />
                <span className="icon is-large is-left">
                  <i className="mdi mdi-card-search"/>
                </span>
              </div>
            </div>
            <div className="field is-rounded ">
              <div className="control has-text-centered">
                <label className="radio"> <input type="radio" name="ciudad" checked={true}/><b> San Pedro Sula</b></label> |
                <label className="radio"> <input type="radio" name="ciudad" /><b> Tegucigalpa</b></label>
              </div>
            </div>
            <br/>
            <div className="has-text-centered">
              <button className="button  is-primary is-medium" onClick={ e => this._handleSearch(e)}>
                <span className="icon">
                  <i className="mdi mdi-magnify" />
                </span>
                <span><b>Buscar</b></span>
              </button>
            </div>
          </div>
        </div>
        <hr/>
      </div>
    );
  }
}

export default SearchBarHome;
