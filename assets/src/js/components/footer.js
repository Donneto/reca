// Dependencies
import React from 'react';
import Contact from './contact';

const Footer = () => {

  return(
    <div>
      <Contact />
      <footer className="footer has-text-centered">
        <div className="content has-text-centered">
          <p className="is-italic"><b>"Y la paz de Dios que sobrepasa todo entendimiento, guardar&aacute; vuestros corazones y vuestros pensamientos en Cristo Jes&uacute;s"<br/> - Filipenses 4:7</b></p>
          <br/>
          <span className="icon"><i className="mdi mdi-twitter"/></span>
          <a href="https://twitter.com/hashtag/quedateEnCasa" target="_blank">#quedateEnCasa</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
