import "./chatList.css";
import { useState, useEffect } from "react";
import AddUser from "./addUser/addUser";
import WebSocketService from "../../../WebSocketService";

const ChatList = ({ user, onUserSelect, messageData, setMessageData }) => {
    const [addMode, setAddMode] = useState(false);
    const [userList, setUserList] = useState([]);
    // const [messageData, setMessageData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Cập nhật thông tin messageData
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

            localStorage.setItem('messageData', JSON.stringify(updatedMessages)); // Update localStorage

            return updatedMessages.sort((a, b) => new Date(b.createAt) - new Date(a.createAt)); // Sort messages by createAt descending
        });
    };

    // useEffect để register call back and và lấy dữ liệu
    useEffect(() => {
        WebSocketService.registerCallback('GET_USER_LIST', (data) => {
            setUserList(data);
            localStorage.setItem('userList', JSON.stringify(data)); // Lưu data vào localStorage

            // Gửi data đến từng user trong list
            data.forEach(user => {
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
        WebSocketService.sendMessage({
            action: "onchat",
            data: { event: "GET_USER_LIST" }
        });

    }, []);

    // Effect để load messageData và userList từ localStorage
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

    // Lấy message mới nhất từ người dùng cụ thể
    const getLatestMessageForUser = (userName) => {
        const messagesForUser = messageData.filter(msg => msg.name === userName || msg.to === userName);

        if (messagesForUser.length === 0) return '';

        // So sánh ngày gửi tin nhắn giữa các message
        const latestMessage = messagesForUser.reduce((prev, current) => (
            new Date(current.createAt) > new Date(prev.createAt) ? current : prev
        ));
        const sender = latestMessage.to === userName ? 'You: ' : '';
        return `${sender}${latestMessage.mes}`;
    };

    // Lọc user khi tìm kiếm
    const filteredUserList = userList.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
                <div key={index} className="item" onClick={() => onUserSelect(user)}>
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
