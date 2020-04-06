import React from 'React';

class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section className="section">
        <div className="container">
          <h2 className="title is-2 has-text-centered has-text-grey-dark">¡Ayudanos a mejorar!</h2>
          <p className="has-text-centered">Si te ha gustado el proyecto o tienes alguna<br/>sugerencia que nos ayude a mejorar, <b>¡escribenos!</b></p>
          <br/><br/>
          <div className="row">
            <div className="columns is-centered">
              <div className="column is-half">
                <form action="">
                  <div className="field is-horizontal">
                    <div className="field-body">
                      <div className="field">
                        <p className="control is-expanded has-icons-left">
                          <input className="input input is-primary" type="text" placeholder="Tu nombre" />
                          <span className="icon is-small is-left"><i className="mdi mdi-account-circle"/></span>
                        </p>
                      </div>
                      <div className="field">
                        <p className="control is-expanded has-icons-left has-icons-right">
                          <input className="input is-primary" type="email" placeholder="Tu correo electr&oacute;nico" />
                          <span className="icon is-small is-left"><i className="fas fa-envelope"/></span>
                          <span className="icon is-small is-left"><i className="mdi mdi-email"/></span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <textarea className="textarea is-primary" placeholder="Tu mensaje aqu&iacute;" />
                    </div>
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
