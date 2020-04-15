// Dependencies
import React from 'react';
import Contact from './contact';

const Footer = () => {

  return(
    <div>
      <Contact />
      <footer className="footer has-text-centered is-danger">
        <div className="content has-text-centered">
          {/* <p className="is-italic"><b>"Y la paz de Dios que sobrepasa todo entendimiento, guardar&aacute; vuestros corazones y vuestros pensamientos en Cristo Jes&uacute;s"<br/> - Filipenses 4:7</b></p> */}
          <br/>
          <p className="has-text-centered"><img src="/images/honduras-flag.png" width="25"/> Sistema Comunitario de Servicios y Abastos. Todos los derechos reservados.</p>
          <span className="icon"><i className="mdi mdi-twitter"/></span>
          <a href="https://twitter.com/hashtag/QuedateEnCasa" target="_blank"><b>#QuedateEnCasa</b></a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
