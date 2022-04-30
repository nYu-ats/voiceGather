import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AppRoute } from './routes/AppRoute';
import { Provider } from 'react-redux';
import store from './store/index';

export const App = () => {
  return (
    <Router>
      <Provider  store={store}>
        <AppRoute />
      </Provider>
    </Router>
  );
}
