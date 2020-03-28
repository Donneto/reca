// Dependendices
import config from 'react-global-configuration';

const internals = {
  env: window.location.hostname === 'localhost' ? 'dev' : 'prd',
  apiURL: 'http://localhost:3000',
  searchKey: 'b43ba9f4727bf6a82d3bd0a0da75d1ce',
  searchAppID: 'SIXFN4ICTO'
};

// Env Check
if( internals.env !== 'dev') {
  internals.apiURL = 'https://reca-hn.herokuapp.com';
}

internals.init = () => {
  config.set({ app: internals },  { freeze: false });
};

internals.init();
