import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Keycloak from 'keycloak-js';
import { createUser } from './User/UserInfo';

let initOptions = {
  url: 'http://localhost:8080/',
  realm: 'review-app',
  clientId: 'review-app-auth',
  onLoad: 'check-sso', // check-sso | login-required
  KeycloakResponseType: 'code',
};

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: 'login-required',
  silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html", 
  checkLoginIframe: false,
  pkceMethod: 'S256'
}).then(async (auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.log('Keycloak', kc);
    const userData = await kc.loadUserProfile();
    console.log('userData', userData);
    const user = createUser({ id: userData.id, username: userData.username, email: userData.email });
    console.log('user', user);
    kc.onTokenExpired = () => {
      console.log('token expired')
    }
  }
}, () => {
  console.error("Authenticated Failed");
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
