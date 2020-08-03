import React from 'react';
import './App.css';
import  { Joke } from './joke';
import JokeGenerator from './jokeGenerator';

function App() {
  return (
    <div className="App" >
      <Joke />
      <JokeGenerator />
    </div>
  );
}

export default App;
