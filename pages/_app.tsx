import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import persist from '../redux/configureStore';
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from '../components/NavBar/NavBar';

toast.configure();
function MyApp({ Component, pageProps, user }) {
  return (
    <Provider store={persist().store}>
      <PersistGate persistor={persist().persistor}>
        <NavBar />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
