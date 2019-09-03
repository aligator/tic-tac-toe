import React from 'react';
import TicTacToe from './TicTacToe';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TicTacToe</h1>
      </header>
      <TicTacToe/>
    </div>
  );
}

export default App;
