import React from 'react';
import config from 'react-global-configuration';
import axios from 'axios';

const internals = {
  apiUrl: config.get('app.apiURL'),
  c_nombre: '',
  c_email: '',
  c_mensaje: ''
};

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this._handleContactSubmit = this._handleContactSubmit.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleInputChange(e) {
    internals[e.target.name] = e.target.value.trim();
  }

  async _handleContactSubmit(e) {
    e.preventDefault();
    const { c_nombre: nombre, c_email: email, c_mensaje: mensaje } = internals;

    console.log(nombre, email, mensaje);

    if (!nombre.length || !email.length || !mensaje.length) {
      alert('site');

      return;
    }

    try {
      const result = await axios.post(`${internals.apiUrl}/contacts`, { nombre, email, mensaje } );

      console.log(result);

    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return(
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered has-text-grey-dark">¡Ayudanos a mejorar!</h3>
          <p className="has-text-centered">Si te ha gustado el proyecto o tienes alguna<br/>sugerencia que nos ayude a mejorar, <b>¡escribenos!</b></p>
          <br/><br/>
          <div className="row">
            <div className="columns is-centered">
              <div className="column is-half">
                <form onSubmit={ e => this._handleContactSubmit(e) }>
                  <div className="field is-horizontal">
                    <div className="field-body">
                      <div className="field">
                        <p className="control is-expanded has-icons-left">
                          <input className="input input is-primary" name="c_nombre" type="text" placeholder="Tu nombre" required onChange={e => this._handleInputChange(e)} />
                          <span className="icon is-small is-left"><i className="mdi mdi-account-circle"/></span>
                        </p>
                      </div>
                      <div className="field">
                        <p className="control is-expanded has-icons-left has-icons-right">
                          <input className="input is-primary" name="c_email" type="email" placeholder="Tu correo electr&oacute;nico" required onChange={e => this._handleInputChange(e)} />
                          <span className="icon is-small is-left"><i className="fas fa-envelope"/></span>
                          <span className="icon is-small is-left"><i className="mdi mdi-email"/></span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <textarea className="textarea is-primary" name="c_mensaje" placeholder="Tu mensaje aqu&iacute;" required onChange={e => this._handleInputChange(e)}/>
                    </div>
                  </div>
                  <div className="buttons is-centered">
                    <button className="button is-primary"><span className="icon"><i className="mdi mdi-send-circle"/></span><span><b>Enviar</b></span></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
