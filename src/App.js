import React from 'react';
import './App.scss';

// components
import Header from './components/Header/Header';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  );
}

export default App;
