// Dependencies
import React from 'react';
// import config from 'react-global-configuration';

// Custom
import RegistrationForm from '../components/registrationForm';


class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    return(
      <div className="registration-view">
        <RegistrationForm />
      </div>
    );
  }
}

export default Registration;
