import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from "./component/list/List";
import Detail from "./component/detail/Detail";
import Converse from "./component/chat/Converse";
import Login from "./component/login/Login";

function App() {
    const user = false;

    return (
        <div className="container">
            {
                user ? (
                    <>
                        <List/>
                        <Converse/>
                        <Detail/>
                    </>
                ) : (
                    <Login/>
                )
            }
        </div>
    );
}

export default App;
