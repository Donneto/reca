// Dependencies
import React from 'react';

const Spinner = () => {
  return(
    <div className="has-text-centered spinner-holder">
      {/* <div className="lds-ellipsis"><div/><div/><div/><div/></div> */}
      <img className="spinnerImg" src="/images/orbit.svg" width="100" />
      <p><small><b>Procesando...Espera un momento</b></small></p>
    </div>
  );
};

export default Spinner;
