import React from 'react';

const About = () => {
  return (
    <div className="section row has-text-centered">
      <div className="columns is-centered">
        <div className="column">
          <img src="/images/virus.svg" width="80" />
          <div className="card">
            <div className="card-content">
              <h4 className="title is-4">Coronavirus ( COVID-19 )</h4>
              <hr/>
              <p><b>¡Informate!</b> El mundo se encuentra bajo uno de sus retos mas grandes hasta el momento. Utiliza cualquier medio que tengas a disposicion para informarte, cuidar de ti y de los tuyos de la mejor manera posible. <b>Mantente a salvo</b>.
                <br/><br/>
                <a className="button is-info" target="_blank" href="https://www.who.int/es/emergencies/diseases/novel-coronavirus-2019"><span><b>M&aacute;s sobre el coronavirus</b></span> <span className="icon"><i className="mdi mdi-arrow-right-bold-circle" /></span></a>
              </p>
            </div>
          </div>
        </div>
        <div className="column">
          <img src="/images/manual.svg" width="80" />
          <div className="card">
            <div className="card-content">
              <h4 className="title is-4">Acerca del Proyecto</h4>
              <hr/>
              <p>Considerando el momento tan dif&iacute;cil que se afronta a nivel mundial hemos tomado la iniciativa de poner a tu disposicion un servicio que te ayude a a encontrar los productos que mas necesites sin poner en riesgo tu seguridad y la de tu familia.<br/><br/>
                <b>Sumate! Haz tu parte. Quedate en casa. <a href="https://twitter.com/hashtag/CODVID19" target="_blank">#CODVID19</a></b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <h5 className="title is-5">Links de Inter&eacute;s</h5>
    </div>
  );
};

export default About;
