// App.js o main.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavbarComponent from './components/NavbarR';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
      </div>
    </Router>
  );
}

export default App;