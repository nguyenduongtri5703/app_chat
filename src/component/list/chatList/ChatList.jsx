import "./chatList.css";
import { useState, useEffect } from "react";
import AddUser from "./addUser/addUser";
import WebSocketService from "../../../WebSocketService";

const ChatList = ({ user, onUserSelect, messageData, setMessageData }) => {
    const [addMode, setAddMode] = useState(false);
    const [userList, setUserList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleWebSocketData = (data) => {
        setMessageData(prevMessages => {
            const updatedMessages = [...prevMessages];

            data.forEach(message => {
                const existingIndex = updatedMessages.findIndex(msg => msg.createAt === message.createAt);
                if (existingIndex !== -1) {
                    updatedMessages[existingIndex] = message;
                } else {
                    updatedMessages.push(message);
                }
            });

            return updatedMessages.sort((a, b) => new Date(b.createAt) - new Date(a.createAt)); // Sort messages by createAt descending
        });
    };

    useEffect(() => {
        const fetchUserList = () => {
            WebSocketService.sendMessage({
                action: "onchat",
                data: { event: "GET_USER_LIST" }
            });
        };

        WebSocketService.registerCallback('GET_USER_LIST', (data) => {
            // Filter out the logged-in user from the user list
            const filteredData = data.filter(u => u.name !== user.user);
            setUserList(filteredData);

            // Fetch messages for all users
            filteredData.forEach((user) => {
                WebSocketService.sendMessage({
                    action: "onchat",
                    data: {
                        event: "GET_PEOPLE_CHAT_MES",
                        data: {
                            name: user.name,
                            page: 1
                        }
                    }
                });
            });
        });

        WebSocketService.registerCallback('GET_PEOPLE_CHAT_MES', handleWebSocketData);

        fetchUserList();

    }, [user]);

    useEffect(() => {
        WebSocketService.registerCallback('NEW_MESSAGE', (message) => {
            setMessageData(prevMessages => [...prevMessages, message]);
        });

    }, []);

    useEffect(() => {
        const storedMessageData = localStorage.getItem('messageData');
        const storedUserList = localStorage.getItem('userList');
        if (storedMessageData) {
            setMessageData(JSON.parse(storedMessageData));
        }
        if (storedUserList) {
            setUserList(JSON.parse(storedUserList));
        }
    }, []);

    useEffect(() => {
        const sortedUserList = [...userList].sort((a, b) => {
            const latestMessageA = messageData.find(msg => msg.name === a.name || msg.to === a.name);
            const latestMessageB = messageData.find(msg => msg.name === b.name || msg.to === b.name);
            return new Date(latestMessageB?.createAt || 0) - new Date(latestMessageA?.createAt || 0);
        });
        setUserList(sortedUserList);
    }, [messageData]);

    const getLatestMessageForUser = (userName) => {
        const messagesForUser = messageData.filter(msg => msg.name === userName || msg.to === userName);
        if (messagesForUser.length === 0) return '';
        const latestMessage = messagesForUser.reduce((prev, current) => (
            new Date(current.createAt) > new Date(prev.createAt) ? current : prev
        ));
        const sender = latestMessage.to === userName ? 'You: ' : '';
        return `${sender}${latestMessage.mes}`;
    };

    const filteredUserList = userList.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleUserSelect = (user) => {
        onUserSelect(user);
        WebSocketService.sendMessage({
            action: "onchat",
            data: {
                event: "GET_PEOPLE_CHAT_MES",
                data: {
                    name: user.name,
                    page: 1
                }
            }
        });
    };

    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt=""/>
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <img
                    src={addMode ? "/minus.png" : "/plus.png"}
                    alt=""
                    className="add"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            {filteredUserList.map((user, index) => (
                <div key={index} className="item" onClick={() => handleUserSelect(user)}>
                    <div className="avatar-container">
                        <img src="/avatar.png" alt=""/>
                    </div>
                    <div className="texts">
                        <span>{user.name}</span>
                        <p className="message">{getLatestMessageForUser(user.name)}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser userList={userList} />}
        </div>
    );
};

export default ChatList;
