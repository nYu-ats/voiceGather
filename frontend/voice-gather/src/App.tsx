import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AppRoute } from './routes/AppRoute';

export const App = () => {
  return (
    <Router>
      <AppRoute />
    </Router>
  );
}
