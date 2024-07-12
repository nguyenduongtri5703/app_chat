import React, { useState } from 'react';
import './addUser.css';
import WebSocketService from '../../../../WebSocketService';

const AddUser = ({ userList }) => {
    const [username, setUsername] = useState('');

    const handleAddUser = (event) => {
        event.preventDefault();

        // Validate username input
        if (!username.trim()) {
            alert('Tên người dùng không được để trống');
            return;
        }

        // Find the user object from the list based on username (assuming username is unique)
        const userToAdd = userList.find(user => user.name === username);

        if (userToAdd) {
            // Send chat message to user
            WebSocketService.sendMessage({
                action: 'onchat',
                data: {
                    event: 'SEND_CHAT',
                    data: {
                        type: 'people',
                        to: userToAdd.name,
                        mes: 'xin chao'
                    }
                }
            });
            setUsername('');
        }
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
                <button type="submit">Thêm</button>
            </form>
        </div>
    );
};

export default AddUser;
