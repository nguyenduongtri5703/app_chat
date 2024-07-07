import "./chatList.css";
import { useState, useEffect } from "react";
import AddUser from "./addUser/addUser";
import webSocketService from "../../../WebSocketService"; // Corrected path

const ChatList = ({ user }) => {
    const [addMode, setAddMode] = useState(false);
    const [chatList, setChatList] = useState([]); // Initialize with an empty array

    useEffect(() => {
        const handleUserList = (data) => {
            setChatList(data.userList || []); // Ensure it's an array
        };

        webSocketService.registerCallback('GET_USER_LIST', handleUserList);

        webSocketService.sendMessage({
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST'
            }
        });

        return () => {
            webSocketService.close();
        };
    }, []);

    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt="" />
                    <input type="text" placeholder={"Tìm kiếm"} />
                </div>
                <img
                    src={addMode ? "/minus.png" : "/plus.png"}
                    alt=""
                    className="add"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            {chatList.map((chatUser, index) => (
                <div key={index} className="item">
                    <img src="/avatar.png" alt="" />
                    <div className="texts">
                        <span>{chatUser.username}</span>
                        <p>{chatUser.message}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
