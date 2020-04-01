import crypto from 'crypto-js';

const internals = {
  appKey: 'R3c4Rul3z4eVa'
};


internals.formatMoney = (num) => num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

internals.setToLocalStorage = (key = null, data = null) => {
  let edata = false;

  try {
    if (!key) {
      console.log('{setToLocalStorage}: a key must be specified.');

      return null;
    }

    if (!data) {
      console.log('{setToLocalStorage}: data to save must be provided.');

      return null;
    }

    edata = crypto.AES.encrypt( JSON.stringify(data), internals.appKey).toString();

    return localStorage.setItem(key, edata);
  } catch(e) {
    console.log(e.message);

    return null;
  }
};

internals.getFromLocalStorage = (key = null) => {

  try {
    if (!key) {
      console.log('{getFromLocalStorage}: a key must be specified.');

      return null;
    }

    if (!localStorage[key]) {
      console.log(`{getFromLocalStorage}: specified key {${key}} does not exists in localStorage`);

      return null;
    }

    const _dataByte = crypto.AES.decrypt(localStorage[key], internals.appKey);
    const ecryptedData = JSON.parse(_dataByte.toString(crypto.enc.Utf8));

    return ecryptedData;
  } catch(e) {
    console.log(e.message);

    return null;
  }
};

internals.getQuery = () => {
  const query = internals.getFromLocalStorage('_app_d');

  if (!query) {
    internals.setToLocalStorage('_app_d', {
      queryString: '',
      city: 'san pedro sula'
    });
  }

  return internals.getFromLocalStorage('_app_d');
};

internals.disableReactToosl = () => {
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => null;
  }
};

export default internals;
