import React, { useState } from 'react';
import './addUser.css';
import WebSocketService from "../../../../WebSocketService";

const AddUser = ({ userList }) => {
    const [username, setUsername] = useState('');

    const handleAddUser = (event) => {
        event.preventDefault();
        if (username.trim() === '') return;

        WebSocketService.sendMessage({
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: "people",
                    to: username,
                    mes: "xin chào"
                }
            }
        });

        console.log(`Sending chat message to user: ${username}`); // Add console log

        setUsername(''); // Clear input after sending message
    };

    return (
        <div className='addUser'>
            <form onSubmit={handleAddUser}>
                <input
                    type="text"
                    placeholder="Tên người dùng"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button>Thêm</button>
            </form>
        </div>
    );
};

export default AddUser;
