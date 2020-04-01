import React from 'react';

const About = () => {
  return (
    <div className="home-about hero is-light">
      <div className="hero-body container is-fullhd">
        <div className="row has-text-centered">
          <div className="columns is-centered">
            <div className="column fadeInDown animated">
              <img src="/images/virus.svg" width="60"  />
              <div className="card">
                <div className="card-content">
                  <h4 className="title is-4">Coronavirus ( COVID-19 )</h4>
                  <hr/>
                  <p><b>¡Informate!</b> El mundo se encuentra bajo uno de sus retos mas grandes hasta el momento. Utiliza cualquier medio que tengas a disposicion para informarte, cuidar de ti y de los tuyos de la mejor manera posible. <b>Mantente a salvo</b>.</p><br/>
                  <div className="buttons is-centered">
                    <a className="button is-info is-small is-light" target="_blank" href="https://www.who.int/es/emergencies/diseases/novel-coronavirus-2019"><span><b>M&aacute;s sobre el coronavirus</b></span> <span className="icon"><i className="mdi mdi-arrow-right-bold-circle" /></span></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column fadeInDown animated">
              <img src="/images/manual.svg" width="60" />
              <div className="card">
                <div className="card-content">
                  <h4 className="title is-4">Acerca del Proyecto</h4>
                  <hr/>
                  <p>Considerando el momento tan dif&iacute;cil que se afronta a nivel mundial hemos tomado la iniciativa de poner a tu disposicion un servicio que te ayude a encontrar los productos que mas necesites sin poner en riesgo tu seguridad y la de tu familia.<br/><br/>
                    <b>Sumate! Haz tu parte. <a href="https://twitter.com/hashtag/quedateEnCasa" target="_blank">#quedateEnCasa</a></b>
                  </p>
                </div>
              </div>
            </div>
            <div className="column fadeInDown animated">
              <img src="/images/group.svg" width="60" />
              <div className="card">
                <div className="card-content">
                  <h4 className="title is-4">¿Quienes participan?</h4>
                  <hr/>
                  <p><b>T&uacute;, tu familia, tu vecino</b>... Si posees un negocio con productos &oacute; servicios que ayuden a tu comunidad a sobrellevar esta pandemia de la mejor manera entonces <a href="/registro">registrate!</a><br/> Comparte para que mas personas se sumen y as&iacute; mantener segura nuestra comunidad.
                    <br/><b><a href="https://twitter.com/hashtag/CODVID19" target="_blank">#CODVID19</a></b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/><br/>
        <h5 className="title is-5 has-text-centered">Links de Inter&eacute;s</h5>
        <div className="columns is-centered">
          <div className="column is-one-third">
            <div className="buttons">
              <a className="button is-info is-fullwidth is-light" target="_blank" href="https://edition.cnn.com/interactive/2020/health/coronavirus-maps-and-cases/"><span><b>Indices Globales ( COVID-19 )</b></span> <span className="icon"><i className="mdi mdi-arrow-right-bold-circle" /></span></a>
              <a className="button is-info is-fullwidth is-light" target="_blank" href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"><span><b>Mapa Global</b></span> <span className="icon"><i className="mdi mdi-arrow-right-bold-circle" /></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
