import React, { useState } from 'react';
import './App.css';
import List from "./component/list/List";
import Detail from "./component/detail/Detail";
import Converse from "./component/chat/Converse";
import Login from "./component/login/Login";
import Notification from "./component/notification/Notification";

function App() {
    const [user, setUser] = useState({ isLoggedIn: false, credentials: null });

    console.log('App component user state:', user);

    return (
        <div className="container">
            {
                user.isLoggedIn ? (
                    <>
                        <List user={user.credentials} />
                        <Converse />
                        <Detail />
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