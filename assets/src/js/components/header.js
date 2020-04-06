import React from 'react';
import {
  Link
} from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main dropdown">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="images/team.svg" width="55" />
          <strong>RECA: Red Comunitaria de Abastos</strong>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link className="button is-primary is-small" to="/registro">
              <span className="icon"><i className="mdi mdi-account-badge-horizontal" /></span>
              <strong>Registra tu Negocio</strong>
            </Link>
            <Link className="button is-warning is-small" to="/editar-informacion">
              <span className="icon"><i className="mdi mdi-file-document-edit" /></span>
              <strong>Edita tus Datos</strong>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
