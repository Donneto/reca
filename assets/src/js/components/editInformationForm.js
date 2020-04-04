import React from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import config from 'react-global-configuration';
import Tag from './tag';
import axios from 'axios';
import Spinner from './spinner';

const internals = {
  _id: '',
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
  website: '',
  tags: [],
  activo: true,
  revisado: true,
  uniqueKey: '',
  horas: {
    startTime: '08:00',
    endTime: '18:00'
  }
};

class EditInformationForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayEditForm: false,
      errors: [],
      tags: [],
      loading: false,
      showModal: false,
    };

    this._renderEditForm = this._renderEditForm.bind(this);
    this._renderLoginForm = this._renderLoginForm.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleUpdateSubmit = this._handleUpdateSubmit.bind(this);
    this._handleDeleteTag = this._handleDeleteTag.bind(this);
    this._handleTagAdd = this._handleTagAdd.bind(this);
    this._handleTagInputChange = this._handleTagInputChange.bind(this);
    this._handleGlobalTimeEventChange = this._handleGlobalTimeEventChange.bind(this);
    this._toggleLoading = this._toggleLoading.bind(this);
    this._handleCloseModal = this._handleCloseModal.bind(this);
    this._handleShowModal = this._handleShowModal.bind(this);
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

  async _handleLogin(e) {
    e.preventDefault();
    this._toggleLoading();
    const apiURL = config.get('app.apiURL');
    const { email, uniqueKey } = internals;

    try {
      const fetchInformation = await axios.post(`${apiURL}/negocios/fetch-information`, { email, uniqueKey });

      if (fetchInformation.data.data.hasOwnProperty('error')) {
        const errors = [fetchInformation.data.data.error];

        this._toggleLoading();
        this.setState({ errors });

      } else {

        Object.keys(internals).forEach((property) => {
          internals[property] = fetchInformation.data.data[property];
        });

        internals.domicilio = internals.domicilio ? 'si' : 'no';

        this._toggleLoading();
        this.setState((prevState) => ({ displayEditForm: !prevState.displayEditForm, errors: [], tags: internals.tags }));
      }
    } catch(error) {
      console.log(error);
      this._toggleLoading();
    }
  }

  _handleGlobalTimeEventChange(hourType, value) {
    const { horas } = internals;
    const hour = value.hour() < 10 ? `0${value.hour()}` : `${value.hour()}`;
    const minute = value.minute() < 10 ? `0${value.minute()}` : `${value.minute()}`;

    horas[hourType] = `${hour}:${minute}`;

    internals.horas = horas;
  }

  _handleInputChange(e) {
    internals[e.target.name] = e.target.value;
  }

  _toggleLoading() {
    this.setState((prevState) => ({ loading: !prevState.loading }));
  }


  _handleCloseModal(e) {
    e.preventDefault();
    location.reload();
  }

  _handleShowModal() {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  }

  async _handleUpdateSubmit(e) {
    e.preventDefault();
    this._toggleLoading();

    const errors = [];
    const validateFields = ['nombre', 'telefono', 'direccion'];
    const apiUrl = config.get('app.apiURL');

    try {

      this.setState({ errors });

      validateFields.forEach((field) => {
        const trimmedFieldValue = internals[field].trim();

        if (trimmedFieldValue.length === 0) {
          errors.push(`${field} no puede estar vacio.`);
        } else {
          internals[field] = trimmedFieldValue;
        }
      });

      if (!internals.tags.length) {
        errors.push('Productos no puede estar vacio.');
      }

      internals.domicilio = internals.domicilio === 'si' ? true : false;

      if (errors.length) {

        this._toggleLoading();
        this.setState({ errors });

        return;
      }

      await axios.post(`${apiUrl}/negocios/update-information`, internals);

      this._toggleLoading();
      this._handleShowModal();

    } catch(error) {
      errors.push(`Oops!: ${error.message}`);
      this.setState({ errors });

      return;
    }

  }

  _renderEditForm() {

    return (
      <React.Fragment>
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <form onSubmit={ this._handleUpdateSubmit }>
              <h3 className="title is-3">Edita la informaci&oacute;n de tu negocio.</h3>
              <hr/>
              <small className="has-text-danger">(*) campo requerido</small>
              <hr/>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label htmlFor="nombre" className="label">
                    <sup className="has-text-danger">*</sup>
                    Nombre:
                  </label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control has-icons-left">
                      <input type="text" className="input" id="nombre" name="nombre" required placeholder="ejem.: Importadora de Lacteos El torito" onChange={ this._handleInputChange } defaultValue={ internals.nombre } />
                      <span className="icon is-left">
                        <i className="mdi mdi-card-text-outline" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label htmlFor="telefono" className="label">
                    <sup className="has-text-danger">*</sup>
                    Tel&eacute;fono(s):
                  </label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control has-icons-left">
                      <input className="input" type="text" id="telefono" name="telefono" placeholder="1234-5678 &oacute; 1234-5678/0987-6543 &oacute; *2222" required onChange={ this._handleInputChange } defaultValue={ internals.telefono } />
                      <span className="icon is-left">
                        <i className="mdi mdi-phone"/>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label htmlFor="website" className="label">Sitio Web:</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control has-icons-left">
                      <input className="input" type="text" id="website" name="website" placeholder="www.tusitioweb.com" onChange={ this._handleInputChange } defaultValue={ internals.website } />
                      <span className="icon is-left">
                        <i className="mdi mdi-phone"/>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label htmlFor="whatsapp" className="label">WhatsApp:</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control has-icons-left">
                      <input className="input" type="text" id="whatsapp" name="whatsapp" placeholder="1234-5678 &oacute; 1234-5678/0987-6543" onChange={ this._handleInputChange } defaultValue={ internals.whatsapp } />
                      <span className="icon is-left">
                        <i className="mdi mdi-whatsapp"/>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label htmlFor="ciudad" className="label"><sup className="has-text-danger">*</sup>Ciudad:</label>
                </div>
                <div className="field-body">
                  <div className="field is-narrow">
                    <div className="control">
                      <div className="select is-fullwidth ">
                        <select id="ciudad" name="ciudad" onChange={ this._handleInputChange } defaultValue={ internals.ciudad } >
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
                  <label htmlFor="direccion" className="label">
                    <sup className="has-text-danger">*</sup>Direcci&oacute;n:
                  </label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control has-icons-left">
                      <input className="input" type="text" id="direccion" name="direccion" placeholder="ejem.: Col. Alameda, Casa #x Calle 56" required onChange={ this._handleInputChange } defaultValue={ internals.direccion } />
                      <span className="icon is-left">
                        <i className="mdi mdi-map-marker"/>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label htmlFor="direccionb" className="label"/>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <textarea className="textarea" id="direccionb" name="direccionb" placeholder="Agrega mas detalle sobre tu direcci&oacute;n para facilitarle a los dem&aacute;s poder encontrarte" onChange={ this._handleInputChange } defaultValue={ internals.direccionb } />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label htmlFor="domicilio" className="label">A domicilio:</label>
                </div>
                <div className="field-body">
                  <div className="field is-narrow">
                    <div className="control">
                      <div className="select is-fullwidth ">
                        <select id="domicilio" name="domicilio" onChange={ this._handleInputChange } defaultValue={ internals.domicilio } >
                          <option value="si">Si</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label htmlFor="horario" className="label">Horario:</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <label className="label">Dias:</label>
                    <div className="control">
                      <div className="select is-fullwidth is-small ">
                        <select id="horario" name="horario" onChange={ this._handleInputChange } defaultValue={ internals.horario } >
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
                        defaultValue={ moment().hour(internals.horas.startTime.split(':')[0]).minute(internals.horas.startTime.split(':')[1]) }
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
                        defaultValue={ moment().hour(internals.horas.endTime.split(':')[0]).minute(internals.horas.endTime.split(':')[1]) }
                        onChange={(date) => this._handleGlobalTimeEventChange('endTime', date)}
                        use12Hours={true}
                        inputReadOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label htmlFor="productos" className="label">
                    <sup className="has-text-danger">*</sup>
                    Productos o Servicios:
                  </label>
                </div>
                <div className="field-body">
                  <div className="field is-expanded">
                    <div className="field has-addons">
                      <div className="control has-icons-left is-expanded">
                        <input className="input" id="productos" name="productos" type="text" placeholder="ejem.: maiz, frescos, coca cola, frijoles" required onChange={ (e) => this._handleTagInputChange(e) } />
                        <span className="icon is-left">
                          <i className="mdi mdi-cart" />
                        </span>
                      </div>
                      <div className="control">
                        <button className="button is-primary" onClick={ (e) => this._handleTagAdd(e) }>
                          <span className="icon"><i className="mdi mdi-plus" /></span><span>Agregar</span>
                        </button>
                      </div>
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
                      {
                        this.state.tags.length > 0 && this.state.tags.map( tag => <Tag key={tag} tag={tag} deleteTag={this._handleDeleteTag} />)
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="tags" />
              <div className="has-text-centered">
                <button className="button is-primary is-medium" disabled={ this.state.loading }>
                  <b>Salvar Cambios</b>
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }

  _renderLoginForm() {
    return (
      <React.Fragment>
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <form onSubmit={ this._handleLogin }>
              <h3 className="title is-3">
                Por favor ingresa tu correo y llave secreta para acceder a tu informaci&oacute;n.
              </h3>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">
                    <sup className="has-text-danger">*</sup>Email:
                  </label>
                </div>
                <div className="field-body">
                  <div className="field is-expanded">
                    <div className="field has-addons">
                      <div className="control has-icons-left is-expanded">
                        <input className="input" type="text" name="email" placeholder="tuemail@tu.com" required onChange={ this._handleInputChange } />
                        <span className="icon is-left">
                          <i className="mdi mdi-email-edit-outline" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label htmlFor="uniqueKey" className="label">
                    <sup className="has-text-danger">*</sup>Llave Secreta:
                  </label>
                </div>
                <div className="field-body">
                  <div className="field is-expanded">
                    <div className="field has-addons">
                      <div className="control has-icons-left is-expanded">
                        <input className="input" id="uniqueKey" name="uniqueKey" placeholder="xxxxxxxxxxxxxxxxx" type="password" required onChange={ this._handleInputChange } />
                        <span className="icon is-left">
                          <i className="mdi mdi-key-outline" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="has-text-centered">
                <button className="button is-primary is-medium" disabled={ this.state.loading }>
                  <b>Acceder</b>
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {

    return (
      <section className="section">
        <div className="container">
          { !this.state.displayEditForm && this._renderLoginForm() }
          { this.state.displayEditForm && this._renderEditForm() }
          <div className="tags is-centered">
            { this.state.errors.length > 0 && this.state.errors.map( (error, index) => <span key={`error-${index}`} className="tag is-danger" >{error}</span>  ) }
          </div>
          <div className="has-text-centered">
            {
              this.state.loading && <Spinner />
            }
          </div>
          {
            this.state.showModal && <div className="modal is-active">
              <div className="modal-background" />
              <div className="modal-content animated bounceIn">
                <div className="box">
                  <h4 className="title is-4">¡Tu informacion ha sido actualizada!</h4>
                  <hr/>
                  <p>Es importante que juntos hagamos conciencia sobre nuestro papel en esta pandemia. Ayudate quedandote en casa y asi tambien ayudas a los demas.</p>
                  <br/>
                  <p className="has-text-centered">
                    <button className="button is-success is-small" onClick={ this._handleCloseModal }>
                      <span className="icon"><i className="mdi mdi-close"/></span>
                      <b>Cerrar</b>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          }
        </div>
      </section>
    );
  }
}

export default EditInformationForm;
