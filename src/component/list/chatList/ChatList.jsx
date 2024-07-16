import "./chatList.css";
import { useState, useEffect, useCallback } from "react";
import AddUser from "./addUser/addUser";
import WebSocketService from "../../../WebSocketService";

const ChatList = ({ user, onUserSelect, messageData, setMessageData, state, setState }) => {
    const [addMode, setAddMode] = useState(false);
    const [userList, setUserList] = useState([]);
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

            return updatedMessages.sort((a, b) => new Date(b.createAt) - new Date(a.createAt)); // Sắp xếp tin nhắn theo createAt giảm dần
        });

        // Sau khi cập nhật tin nhắn, gọi fetchUserList để lấy lại danh sách người dùng
        fetchUserList();
    };

    const fetchUserList = useCallback(() => {
        WebSocketService.sendMessage({
            action: "onchat",
            data: { event: "GET_USER_LIST" }
        });
    }, []);

    useEffect(() => {
        WebSocketService.registerCallback('GET_USER_LIST', (data) => {
            // Loại bỏ người dùng đang đăng nhập ra khỏi danh sách người dùng
            const filteredData = data.filter(u => u.name !== user.user);
            setUserList(filteredData);

            // Lấy tin nhắn cho tất cả người dùng
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

        WebSocketService.registerCallback('GET_PEOPLE_CHAT_MES', (data) => {
            WebSocketService.sendMessage({
                action: "onchat",
                data: { event: "GET_USER_LIST" }
            });
            handleWebSocketData(data);
        });

        fetchUserList();
    }, [user, setMessageData, fetchUserList]);


    useEffect(() => {
        if (state) {
            userList.forEach((user) => {
                WebSocketService.sendMessage({
                    action: "onchat",
                    data: { event: "GET_USER_LIST" }
                });
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
            setState(false);
        }
    }, [state, userList, setState]);


    // Lấy message mới nhất từ người dùng cụ thể
    const getLatestMessageForUser = (userName) => {
        const messagesForUser = messageData.filter(msg => msg.name === userName || msg.to === userName);

        if (messagesForUser.length === 0) return '';

        // Lấy tin nhắn mới nhất
        const latestMessage = messagesForUser.reduce((prev, current) => (
            new Date(current.createAt) > new Date(prev.createAt) ? current : prev
        ));

        const sender = latestMessage.to === userName ? 'You: ' : '';
        return `${sender}${latestMessage.mes}`;
    };

    const filteredUserList = userList.filter((u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hiển thị thông báo khi state là true
    useEffect(() => {
        if (state) {
            console.log("You have a new message");
            setState(false);
        }
    }, [state, setState]);

    const handleUserSelect = (user) => {
        onUserSelect(user);
        setState(false);
    };

    // Sắp xếp danh sách user theo tin nhắn mới nhất
    filteredUserList.sort((a, b) => {
        const latestMessageA = getLatestMessageForUser(a.name);
        const latestMessageB = getLatestMessageForUser(b.name);
        return new Date(latestMessageB.createAt) - new Date(latestMessageA.createAt);
    });

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
            {addMode && <AddUser userList={userList} fetchUserList={fetchUserList} />}
        </div>
    );
};

export default ChatList;
