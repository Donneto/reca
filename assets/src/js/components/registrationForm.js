import config from 'react-global-configuration';
import React from 'react';
import short from 'short-uuid';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import Spinner from './spinner';
import axios from 'axios';
import Tag from './tag';

const internals = {
  nombre: '',
  email: '',
  telefono: '',
  whatsapp: 'N/A',
  ciudad: 'san pedro sula',
  direccion: '',
  direccionb: 'N/A',
  domicilio: 'si',
  horario: 'Lunes-Viernes',
  productos: '',
  website: 'N/A',
  tags: [],
  activo: true,
  revisado: false,
  uniqueKey: short.generate(),
  horas: {
    startTime: '08:00',
    endTime: '18:00'
  }
};

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      loading: false,
      showSuccessModal: false,
      tags: []
    };

    this._handleGlobalTimeEventChange = this._handleGlobalTimeEventChange.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleLoading = this._handleLoading.bind(this);
    this._handleShowSuccessModal = this._handleShowSuccessModal.bind(this);
    this._handleCloseSuccessModal = this._handleCloseSuccessModal.bind(this);
    this._handleDeleteTag = this._handleDeleteTag.bind(this);
    this._handleTagInputChange = this._handleTagInputChange.bind(this);
  }

  _handleInputChange(e) {
    internals[e.target.name] = e.target.value;
  }

  _handleTagInputChange(e) {
    if (e.keyCode === 13) {
      this._handleTagAdd(e);
    }

    internals[e.target.name] = e.target.value;
  }

  _handleTagAdd(e) {
    e.preventDefault();

    const criteria = internals.productos.trim().toLowerCase().split(',')[0];
    const tags = this.state.tags;
    const found = tags.indexOf(criteria);

    if (!criteria || !criteria.length) {

      return;
    }

    // If not found add it
    if (found === -1) {
      tags.push(criteria);
      this.setState({ tags });
      internals.tags = tags;
    }
  }

  _handleDeleteTag(e, tag) {
    e.preventDefault();
    internals.tags = internals.tags.filter( currentTag => currentTag !== tag);

    this.setState({tags: internals.tags});
  }

  _handleCloseSuccessModal(e) {
    e.preventDefault();
    location.reload();
  }

  _handleShowSuccessModal() {
    const showSuccessModal = !this.state.showSuccessModal;

    this.setState({ showSuccessModal });
  }

  _handleLoading() {
    const loading = !this.state.loading;

    this.setState({ loading });
  }

  _handleGlobalTimeEventChange(type, value) {
    const { horas } = internals;
    const hour = value.hour() < 10 ? `0${value.hour()}` : `${value.hour()}`;
    const minute = value.minute() < 10 ? `0${value.minute()}` : `${value.minute()}`;

    horas[type] = `${hour}:${minute}`;

    internals.horas = horas;
  }

  async _handleFormSubmit(e) {
    e.preventDefault();
    this._handleLoading();

    const productString = internals.productos;
    const errors = [];
    const fieldsToValidate = ['nombre', 'telefono', 'email', 'direccion'];
    const apiUrl = config.get('app.apiURL');

    let products = [];

    try {
      products = productString.split(',').map( product => product.toLowerCase().trim()).filter(item => item.length > 0 );
      internals.tags = products;

      this.setState({ errors });

      fieldsToValidate.forEach( item => {
        const trimmedValue = internals[item].trim();

        if (trimmedValue.length === 0) {
          errors.push(`${item} no puede estar vacio.`);
        } else {
          internals[item] = trimmedValue;
        }
      });

      const checkSecretOnDB = await axios.post(`${apiUrl}/negocios/validate-uniquekey`, { uniqueKey: internals.uniqueKey });
      const checkEmailOnDB = await axios.post(`${apiUrl}/negocios/validate-email`, { email: internals.email });

      if (!internals.productos.length) {
        errors.push('productos no puede estar vacio.');
      }

      if (checkSecretOnDB.data.data.exists) {
        errors.push('Esta llave ya esta siendo utilizada. Recargue la pagina para comenzar.');
      }

      if (checkEmailOnDB.data.data.exists) {
        errors.push('Esta correo electronico ya esta siendo utilizado.');
      }

      internals.domicilio = internals.domicilio === 'si' ? true : false;

      if (errors.length) {
        this.setState({ errors });
        this._handleLoading();

        return;
      }

      await axios.post(`${apiUrl}/negocios`, internals);

      this._handleLoading();
      this._handleShowSuccessModal();

    } catch (error) {
      errors.push(`Oops!: ${error.message}`);
      this.setState({ errors });
      this._handleLoading();

      return;
    }
  }

  render() {
    return (
      <div className="hero is-light">
        <section className="section">
          <div className="container row">
            <div className="columns is-centered">
              <div className="column is-two-thirds">
                <form onSubmit={(e) => this._handleFormSubmit(e)}>
                  <h3 className="title is-3">¡Registr&aacute; tu negocio &oacute; Servicio!</h3>
                  <p>Ayud&aacute; a tu comunidad a combatir el <b>COVID-19</b> haciendoles saber como contactarte y que tienes para ofrecer.</p>
                  <hr/>
                  <small className="has-text-danger">(*) campo requerido</small>
                  <hr/>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label"><sup className="has-text-danger">*</sup>Nombre:</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control has-icons-left">
                          <input className="input" type="text" name="nombre" placeholder="ejem.: Importadora de Lacteos El torito" required="required" onChange={e => this._handleInputChange(e) }/>
                          <span className="icon is-left">
                            <i className="mdi mdi-card-text-outline" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label"><sup className="has-text-danger">*</sup>Email:</label>
                    </div>
                    <div className="field-body">
                      <div className="field is-expanded">
                        <div className="field has-addons">
                          <div className="control has-icons-left is-expanded">
                            <input className="input" type="text" name="email" placeholder="tuemail@tu.com" required="required" onChange={e => this._handleInputChange(e) } />
                            <span className="icon is-left">
                              <i className="mdi mdi-email-edit-outline" />
                            </span>
                          </div>
                        </div>
                        <p className="help"><b>IMPORTANTE: Solo se permite un negocio por correo electr&oacute;nico</b></p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label"><sup className="has-text-danger">*</sup>Tel&eacute;fono(s):</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control has-icons-left">
                          <input className="input" type="text" name="telefono" placeholder="1234-5678 &oacute; 1234-5678/0987-6543 &oacute; *2222 " required="required" onChange={e => this._handleInputChange(e) }/>
                          <span className="icon is-left">
                            <i className="mdi mdi-phone"/>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">Website:</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control has-icons-left">
                          <input className="input" type="text" name="website" placeholder="www.tuwebsite.com" onChange={e => this._handleInputChange(e) }/>
                          <span className="icon is-left">
                            <i className="mdi mdi-phone"/>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">WhatsApp:</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control has-icons-left">
                          <input className="input" type="text" name="whatsapp" placeholder="1234-5678 &oacute; 1234-5678/0987-6543" onChange={e => this._handleInputChange(e) }/>
                          <span className="icon is-left">
                            <i className="mdi mdi-whatsapp"/>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label"><sup className="has-text-danger">*</sup>Ciudad:</label>
                    </div>
                    <div className="field-body">
                      <div className="field is-narrow">
                        <div className="control">
                          <div className="select is-fullwidth ">
                            <select name="ciudad" defaultValue={internals.ciudad} onChange={e => this._handleInputChange(e) }>
                              <option value="san pedro sula">San Pedro Sula</option>
                              <option value="tegucigalpa">Tegucigalpa</option>
                              <option value="la ceiba">La ceiba</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label"><sup className="has-text-danger">*</sup>Direcci&oacute;n:</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control has-icons-left">
                          <input className="input" type="text" name="direccion" placeholder="ejem.: Col. Alameda, Casa #1 Calle 56" required="required" onChange={e => this._handleInputChange(e) }/>
                          <span className="icon is-left">
                            <i className="mdi mdi-map-marker"/>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label"/>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <textarea className="textarea " name="direccionb" placeholder="Agrega mas detalle sobre tu direcci&oacute;n para facilitarle a los dem&aacute;s poder encontrarte" onChange={e => this._handleInputChange(e) }/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">A domicilio:</label>
                    </div>
                    <div className="field-body">
                      <div className="field is-narrow">
                        <div className="control">
                          <div className="select is-fullwidth ">
                            <select name="domicilio" defaultValue={internals.domicilio} onChange={e => this._handleInputChange(e) }>
                              <option value="si">Si</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">Horario:</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <label className="label">Dias:</label>
                        <div className="control">
                          <div className="select is-fullwidth is-small ">
                            <select name="horario" defaultValue={internals.horario} onChange={e => this._handleInputChange(e) }>
                              <option value="Lunes-Viernes">Lunes-Viernes</option>
                              <option value="Lunes-Sabado">Lunes-S&aacute;bado</option>
                              <option value="Lunes-Domingo">Lunes-Domingo</option>
                              <option value="Martes-Domingo">Martes-Domingo</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="field is-narrow">
                        <label className="label">De:</label>
                        <div className="control">
                          <TimePicker
                            allowEmpty={false}
                            showSecond={false}
                            defaultValue={ moment().hour(8).minute(0) }
                            onChange={(date) => this._handleGlobalTimeEventChange('startTime', date)}
                            use12Hours={true}
                            inputReadOnly
                          />
                        </div>
                      </div>
                      <div className="field is-narrow">
                        <label className="label">Hasta:</label>
                        <div className="control">
                          <TimePicker
                            allowEmpty={false}
                            showSecond={false}
                            defaultValue={ moment().hour(18).minute(0) }
                            onChange={(date) => this._handleGlobalTimeEventChange('endTime', date)}
                            use12Hours={true}
                            inputReadOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label"><sup className="has-text-danger">*</sup>Productos o Servicios:</label>
                    </div>
                    <div className="field-body">
                      <div className="field is-expanded">
                        <div className="field has-addons">
                          <div className="control has-icons-left is-expanded">
                            <input className="input" name="productos" type="text" placeholder="ejem.: Consulta Media, Productos de Limpieza, Frijoles, Queso, Pizza, Tortillas, Minisuper " required="required" onChange={e => this._handleTagInputChange(e) }/>
                            <span className="icon is-left">
                              <i className="mdi mdi-cart" />
                            </span>
                          </div>
                          <div className="control"><button className="button is-primary" onClick={ e => this._handleTagAdd(e) }><span className="icon"><i className="mdi mdi-plus" /></span><span>Agregar</span> </button></div>
                        </div>
                        <p className="help"><b>Agrega varios productos/servicios con los que cuentes o palabras que describan tu negocio. Ejemplos: Servicios Medicos, Minisuper, Frutas, bananos, pulperia, Nebulizaciones, Toma de la presion,san pedro sula, Carpinteria, Fotografia.   </b></p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal" />
                    <div className="field-body">
                      <div className="field">
                        <div className="buttons">
                          {this.state.tags.length > 0 && this.state.tags.map( tag => <Tag key={tag} tag={tag} deleteTag={this._handleDeleteTag} />)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">Llave Secreta:</label>
                    </div>
                    <div className="field-body">
                      <div className="field is-expanded">
                        <div className="field has-addons">
                          <div className="control has-icons-left is-expanded">
                            <input className="input" readOnly type="text" value={internals.uniqueKey} />
                            <span className="icon is-left">
                              <i className="mdi mdi-key-outline" />
                            </span>
                          </div>
                        </div>
                        <p className="help is-danger"><b>IMPORTANTE: Anotala en un lugar seguro y no la compartas con nadie. Esta llave es necesaria para que luego puedas editar el perfil de tu negocio.</b></p>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  {/* Errors Here */}
                  <div className="tags">
                    {this.state.errors.length > 0 && this.state.errors.map( (item, i) => <span key={`error-${i}`} className="tag is-danger">{item}</span>)}
                  </div>
                  {this.state.showSuccessModal === true && <div className="modal is-active">
                    <div className="modal-background" />
                    <div className="modal-content animated bounceIn">
                      <div className="box">
                        <h4 className="title is-4">¡Gracias por ayudar a tu comunidad!</h4>
                        <hr/>
                        <p>Es importante que juntos hagamos conciencia sobre nuestro papel en esta pandemia. Ayudate quedandote en casa y asi tambien ayudas a los demas. <b>Permitenos hasta 12 horas para revisar tus datos antes de plublicarlos.</b></p>
                        <br/>
                        <p className="has-text-centered">
                          <button className="button is-success is-small" onClick={(e) => this._handleCloseSuccessModal(e)}>
                            <span className="icon"><i className="mdi mdi-close"/></span>
                            <b>Cerrar</b>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>}
                  <div className="has-text-centered">
                    {this.state.loading === true && <Spinner />}
                    <button className="button is-primary is-medium" disabled={this.state.loading}><b>¡Registrame!</b></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default RegistrationForm;
