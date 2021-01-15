import React from 'react';
import logo from './logo.svg';
import './App.css';
import StackRoutes from './stacks'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StackRoutes />
      </header>
    </div>
  );
}

export default App;
