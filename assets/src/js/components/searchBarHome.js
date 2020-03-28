import React from 'react';
import Typewriter from 'typewriter-effect/dist/core';

class SearchBarHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.initTypeWriter = this.initTypeWriter.bind(this);
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
              <button className="button  is-primary is-medium">
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
