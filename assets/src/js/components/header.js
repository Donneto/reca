import React from 'react';
import {
  Link
} from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main dropdown">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src="images/team.svg" width="55" />
          <strong>RECA: Red Comunitaria de Abastos</strong>
        </a>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link className="button is-primary is-small" to="/registro">
              <span className="icon"><i className="mdi mdi-account-badge-horizontal" /></span>
              <strong>Registra tu Negocio</strong>
            </Link>
            <a className="button is-warning is-small">
              <span className="icon"><i className="mdi mdi-file-document-edit" /></span>
              <strong>Edita tus Datos</strong>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
