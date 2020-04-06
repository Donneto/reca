import React from 'react';

const ResultItem = (props) => {
  const {item} = props;
  const startTime = item.horas.startTime.split(':');
  const endTime = item.horas.endTime.split(':');
  const openTime = new Date();
  const closeTime = new Date();
  const rightNow = new Date();
  const adomilicioText = item.domicilio ? 'Si' : 'No';

  let isOpen = 'Cerrado';

  openTime.setHours(startTime[0]);
  openTime.setMinutes(startTime[1]);
  closeTime.setHours(endTime[0]);
  closeTime.setMinutes(endTime[1]);
  isOpen = rightNow > openTime && rightNow < closeTime ? 'Abierto' : isOpen;

  return(
    <div className="card">
      <div className="card-content">
        <div className="columns">
          <div className="column is-half">
            <p className="title is-3 has-text-grey-dark">{item.nombre} </p>
            <div className="subtitle is-capitalized">
              <b>
                <div className="tags">
                  <span className={`tag is-light ${isOpen === 'Abierto' ? 'is-success' : 'is-danger'}`}>{isOpen}</span>
                  <span className="tag is-info is-light"><span className="icon"><i className="mdi mdi-map-marker" /></span><span>{item.ciudad}</span></span>
                  <span className={`tag is-light ${adomilicioText === 'Si' ? 'is-info' : 'is-danger'}`}><span className="icon"><i className="mdi mdi-truck-delivery" /></span><span>A domicilio: {adomilicioText}</span> </span>
                </div>
              </b>
            </div>
            <p><span className="icon"><i className="mdi mdi-alarm"/></span><b>Horario:</b> {item.horario} <b>de</b> {item.horas.startTime} - {item.horas.endTime}</p>
            <hr/>
            <div className="tags">
              {item.tags.map((itemTag, tagindex) => <span key={`tag-${tagindex}`} className="tag is-warning is-light"><b>{itemTag}</b></span>  )}
            </div>
            {/* <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Tweets</p>
                  <p class="title">3,456</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Following</p>
                  <p class="title">123</p>
                </div>
              </div>
            </nav> */}
          </div>
          <div className="column">
            <p className="title is-4 has-text-grey-dark">Contacto:</p>
            <hr/>
            <p><span className="icon"><i className="mdi mdi-phone"/></span><b>Telefono:</b> {item.telefono}</p>
            <p><span className="icon"><i className="mdi mdi-whatsapp"/></span><b>WhatsApp:</b> {item.telefono}</p>
            <p><span className="icon"><i className="mdi mdi-link-variant"/></span><b>Website:</b> {item.website}</p>
            <p><span className="icon"><i className="mdi mdi-map-marker"/></span><b>Direcci&oacute;n:</b> {item.direccion}</p>
            <p><span className="icon"><i className="mdi mdi-map-marker-alert"/></span><b>Indicaciones:</b> {item.direccionb}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
