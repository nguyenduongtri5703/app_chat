import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from "./component/list/List";
import Detail from "./component/detail/Detail";
import Converse from "./component/chat/Converse";

function App() {
  return (
    <div className="container">
      <List/>
       <Converse/>
      <Detail/>
    </div>
  );
}

export default App;
