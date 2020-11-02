import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWithContext from './AppWithContext';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWithContext />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
