import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from "./component/list/List";
import Detail from "./component/detail/Detail";
import Converse from "./component/chat/Converse";
import Login from "./component/login/Login";
import Notification from "./component/notification/Notification";

function App() {
    const user = true;

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
            <Notification/>
        </div>
    );
}

export default App;
