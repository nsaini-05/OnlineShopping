import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {positions , transitions , Provider as AlertProvider} from 'react-alert' ;
import AlertTemplate from 'react-alert-template-basic' ;
import {Provider} from 'react-redux'
import store from './store'



const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}


ReactDOM.render(
  <Provider store = {store}>
  <AlertProvider template = {AlertTemplate} {...options}>
    <App />
    </AlertProvider>
    </Provider>,
  document.getElementById('root')
);


 