import React from 'react';
import Routes from './routes'
import { HashRouter as Router } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
