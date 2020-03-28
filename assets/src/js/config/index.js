// Dependendices
import config from 'react-global-configuration';

const internals = {
  env: window.location.hostname === 'localhost' ? 'dev' : 'prd',
  apiURL: 'http://localhost:3000',
  fb: {
    apiKey: 'AIzaSyCo25SInuoHny698saNa9u7d4bCqD0a6hE',
    authDomain: 'reca-hn.firebaseapp.com',
    databaseURL: 'https://reca-hn.firebaseio.com',
    projectId: 'reca-hn',
    storageBucket: 'reca-hn.appspot.com',
    messagingSenderId: '825542764235',
    appId: '1:825542764235:web:b72eae87e27b8fbb181d4e'
  }
};

// Env Check
if( internals.env !== 'dev') {
  internals.apiURL = 'https://acklen-coding-test.herokuapp.com';
}

internals.init = () => {
  config.set({ app: internals },  { freeze: false });
};

internals.init();
