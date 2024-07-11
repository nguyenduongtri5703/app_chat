import React, { useState, useEffect } from 'react';
import './App.css';
import List from "./component/list/List";
import Detail from "./component/detail/Detail";
import Converse from "./component/chat/Converse";
import Login from "./component/login/Login";
import Notification from "./component/notification/Notification";
import WebSocketService from "./WebSocketService";

function App() {
    const [user, setUser] = useState({ isLoggedIn: false, credentials: null });

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        WebSocketService.connect('ws://140.238.54.136:8080/chat/chat');
        console.log('App component user state:', user);
    }, []);

    return (
        <div className="container">
            {
                user.isLoggedIn ? (
                    <>
                        <List user={user.credentials} />
                        <Converse />
                        <Detail setUser={setUser} />
                    </>
                ) : (
                    <Login setUser={setUser} />
                )
            }
            <Notification />
        </div>
    );
}

export default App;
