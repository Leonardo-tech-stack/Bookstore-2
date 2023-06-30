import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './styles/';

function App() {
  return (
    <div> 
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
