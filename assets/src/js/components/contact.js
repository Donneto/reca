import React from 'react';
import config from 'react-global-configuration';
import axios from 'axios';
import Spinner from './spinner';

const internals = {
  apiUrl: config.get('app.apiURL'),
  c_nombre: '',
  c_email: '',
  c_mensaje: ''
};

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      isLoading: false,
      contactSuccess: false
    };

    this._handleContactSubmit = this._handleContactSubmit.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleInputChange(e) {
    internals[e.target.name] = e.target.value.trim();
  }

  async _handleContactSubmit(e) {
    e.preventDefault();
    this.setState({ errors: [], isLoading: true});
    const { c_nombre: nombre, c_email: email, c_mensaje: mensaje } = internals;

    try {

      if (!nombre.length || !email.length || !mensaje.length) {
        this.setState({ errors: ['Revisa tus campos.'], isLoading: false});

        return;
      }

      await axios.post(`${internals.apiUrl}/contacts`, { nombre, email, mensaje } );

      this.setState({ errors: [], isLoading: false, contactSuccess: true});

    } catch(error) {
      this.setState({ errors: [error.message], isLoading: false});
    }
  }

  render() {
    return(
      <section className="section">
        <div className="container">
          <h3 className="title is-3 has-text-centered has-text-grey-dark">¡Contactanos!</h3>
          <p className="has-text-centered">Si te ha gustado el proyecto <br/>y tienes alguna sugerencia que nos ayude a mejorar <br/> o quieres reportar un problema, <b>¡Escr&iacute;benos!</b></p>
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
                  <div className="tags">
                    {this.state.errors.length > 0 && this.state.errors.map(error => <span className="tag is-danger">{error}</span>) }
                  </div>
                  <div className="has-text-centered">
                    {this.state.isLoading === true && <Spinner />}
                  </div>
                  <div className="buttons is-centered">
                    <button className="button is-primary" disabled={this.state.isLoading}><span className="icon"><i className="mdi mdi-send-circle"/></span><span><b>Enviar</b></span></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {this.state.contactSuccess === true && <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-content animated bounceIn">
            <div className="box">
              <h4 className="title is-4 has-text-centered">¡Gracias por contactarnos!</h4>
              <hr/>
              <p className="has-text-centered">Tu feedback y comentarios son muy importantes para nosotros.</p>
              <br/>
              <p className="has-text-centered">
                <button className="button is-success is-small" onClick={() => this.setState({contactSuccess: false})}>
                  <span className="icon"><i className="mdi mdi-close"/></span>
                  <b>Cerrar</b>
                </button>
              </p>
            </div>
          </div>
        </div>}
      </section>
    );
  }
}

export default Contact;
