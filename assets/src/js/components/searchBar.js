import React from 'react';
import Typewriter from 'typewriter-effect/dist/core';
import _ from '../utils';

const internals = {
  query: _.getQuery()
};

class SearchBarHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submit: false,
      city: internals.query.city
    };

    this.initTypeWriter = this.initTypeWriter.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleCityChange = this._handleCityChange.bind(this);
    this._handleEnterPressed = this._handleEnterPressed.bind(this);
  }

  componentDidMount() {

    this.initTypeWriter();
  }

  initTypeWriter() {
    const typeWriterEl = document.querySelector('.typewriter-show');

    if (typeWriterEl) {
      const tw = new Typewriter(typeWriterEl, {
        strings: ['Doctor', 'Frutas', 'Nebulizacion', 'A Domicilio', 'Leche', 'Verduras', 'Electricidad'],
        autoStart: true,
        loop: true,
        cursor: '_',
        pauseFor: 5000
      });

      tw.start();
    }
  }

  _handleCityChange(e) {
    let { city } = this.state;
    const value = e.target.value;

    city = value;
    internals.query.city = value;

    this.setState({ city });
  }

  _handleSearch(e) {
    e.preventDefault();
    const { query } = internals;

    _.setToLocalStorage('_app_d', query);

    window.location = '/resultados';
  }

  _handleInputChange(e) {
    internals.query.queryString = e.target.value;
  }

  _handleEnterPressed(e) {

    if (e.charCode === 13) {
      console.log('here');
      this._handleSearch(e);
    }
  }

  render() {

    return (
      <section className="section">
        <div className="container">
          <div className="search-barrow">
            <div className="columns is-centered">
              <div className="column is-two-thirds has-text-centered">
                {this.props.view === 'home' && <div>
                  <img src="/images/team.svg" width="120" />
                  <br/><br/>
                  <h2 className="has-text-centered title is-2 ">
                    <span className="typewriter-show has-text-grey-dark is-uppercase has-text-weight-bold" />
                  </h2>
                  <h5 className="title is-5 has-text-centered has-text-grey-dark">
                    <span>¿Qu&eacute; estas buscando?</span>
                  </h5>
                </div>}
                <br/>
                <div className="field has-addons">
                  <div className="control is-expanded has-icons-left">
                    <input
                      defaultValue={internals.query.queryString}
                      className="input is-primary is-rounded"
                      type="text"
                      placeholder="Consulta M&eacute;dica, Productos de Limpieza, Frijoles, Queso, Pizza, Tortillas, Minisuper"
                      onChange={ (e) => this._handleInputChange(e)}
                      onKeyPress={(e) => this._handleEnterPressed(e)}
                    />
                    <span className="icon is-large is-left">
                      <i className="mdi mdi-card-search"/>
                    </span>
                  </div>
                  <div className="control">
                    <button className="button is-primary is-rounded " onClick={ e => this._handleSearch(e)}>
                      <span className="icon">
                        <i className="mdi mdi-magnify" />
                      </span>
                      {/* <span><b>Buscar</b></span> */}
                    </button>
                  </div>
                </div>
                <div className="field is-rounded ">
                  <div className="control has-text-centered">
                    <label className="radio">
                      <input
                        type="radio"
                        value="san pedro sula"
                        name="ciudad"
                        onChange={ e => this._handleCityChange(e)}
                        checked={this.state.city === 'san pedro sula'}/><b> San Pedro Sula</b></label> |
                    <label className="radio">
                      <input
                        type="radio"
                        value="tegucigalpa"
                        name="ciudad"
                        onChange={ e => this._handleCityChange(e)}
                        checked={this.state.city === 'tegucigalpa'}/><b> Tegucigalpa</b></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SearchBarHome;
