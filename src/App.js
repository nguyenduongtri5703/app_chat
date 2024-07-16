import React, { useState, useEffect } from 'react';
import './App.css';
import List from "./component/list/List";
import Detail from "./component/detail/Detail";
import Converse from "./component/chat/Converse";
import Login from "./component/login/Login";
import Notification from "./component/notification/Notification";
import WebSocketService from "./WebSocketService";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/userSlice";

function App() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageData, setMessageData] = useState([]);
    const [state, setState] = useState({})

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            dispatch(setUser({
                isLoggedIn: true,
                credentials: userData.credentials
            }));
        }

        WebSocketService.connect('ws://140.238.54.136:8080/chat/chat');
        console.log('App component user state:', user);
    }, [dispatch]);


    return (
        <div className="container">
            {
                user.isLoggedIn ? (
                    <>
                        <List
                            user={user.credentials}
                            setSelectedUser={setSelectedUser}
                            messageData={messageData}
                            setMessageData={setMessageData}
                            state = {state}
                            setState = {setState}
                        />
                        <Converse
                            selectedUser={selectedUser}
                            messageData={messageData}
                            setMessageData={setMessageData}
                            state = {state}
                            setState = {setState}
                        />
                        <Detail user={user.credentials}
                                setUser={(user) => dispatch(setUser(user))}
                        />
                    </>
                ) : (
                    <Login setUser={(user) => dispatch(setUser(user))} />
                )
            }
            <Notification />
        </div>
    );
}

export default App;
