import React from 'react';
import ToDoList from './components/ToDoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Decentralized To-Do List</h1>
      </header>
      <ToDoList />
    </div>
  );
}

export default App;
