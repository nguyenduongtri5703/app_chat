import "./converse.css"
import EmojiPicker from "emoji-picker-react";
import {useEffect, useRef, useState} from "react";
import WebSocketService from "../../WebSocketService";

const Converse = ({selectedUser, messageData, setMessageData}) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [scrolledToBottom, setScrolledToBottom] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const loadMoreMessages = () => {
        if (!hasMoreMessages) return;

        const nextPage = currentPage + 1; // Tính toán trang tiếp theo cần lấy

        WebSocketService.sendMessage({
            action: "onchat",
            data: {
                event: "GET_PEOPLE_CHAT_MES",
                data: {
                    name: selectedUser.name,
                    page: nextPage
                }
            }
        });

        setCurrentPage(nextPage);
    };

    useEffect(() => {
        WebSocketService.registerCallback("GET_PEOPLE_CHAT_MES", (data) => {
            if (data.length === 0) {
                setHasMoreMessages(false);
                return;
            }
            console.log("Data: " + data.length);

            //Thêm dữ liệu mới vào đầu messageData
            setMessageData(currentMessages => [...data, ...currentMessages]);

        });
    }, []);

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollTop === 0 && messageList.length > 0) {
            loadMoreMessages();
        }
        if (scrollTop + clientHeight === scrollHeight) {
            setScrolledToBottom(true);
        } else {
            setScrolledToBottom(false);
        }
    };

    const endRef = useRef(null);

    useEffect(() => {
        setMessageList(messageData);
    }, [messageData]);

    useEffect(() => {
        if (scrolledToBottom) {
            endRef.current?.scrollIntoView({ behavior: "auto" });
        }
    }, [messageList, selectedUser, scrolledToBottom]);

    const formatMessageTime = (timestamp) => {
        const messageDate = new Date(timestamp);
        const currentDate = new Date();
        const timeDifference = (currentDate.getTime() - messageDate.getTime()) / 1000;

        if (timeDifference < 60) {
            return `0 phút trước`;
        } else if (timeDifference < 3600) {
            return `${Math.floor(timeDifference / 60)} phút trước`;
        } else if (
            messageDate.getDate() === currentDate.getDate() &&
            messageDate.getMonth() === currentDate.getMonth() &&
            messageDate.getFullYear() === currentDate.getFullYear()
        ) {
            return `${Math.floor(timeDifference / 3600)} giờ trước`;
        } else if (
            messageDate.getDate() === currentDate.getDate() - 1 &&
            messageDate.getMonth() === currentDate.getMonth() &&
            messageDate.getFullYear() === currentDate.getFullYear()
        ) {
            return "Hôm qua";
        } else {
            return messageDate.toLocaleString();
        }
    };

    const handleEmoji = (e) => {
        setText(prev => prev + e.emoji);
        setOpen(false);
    }

    const handleSendMessage = () => {
        if (!text.trim()) return;

        const newMessage = {
            type: "people",
            to: selectedUser.name,
            mes: text,
        };

        WebSocketService.sendMessage({
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: newMessage,
            }
        });

        const messageWithTimestamp = {
            ...newMessage,
            name: localStorage.getItem('user').name,
            createAt: new Date().toISOString()
        };

        const updatedMessages = [messageWithTimestamp, ...messageData];
        setMessageData(updatedMessages);

        setText("");
    }

    useEffect(() => {
        WebSocketService.registerCallback("SEND_CHAT", (data) => {
            // Check if the message is for the selected user or from the current user
            if (selectedUser && (data.name === selectedUser.name || data.name === localStorage.getItem('user').name)) {
                const newMessage = {
                    type: "people",
                    name: data.name,
                    to: data.to,
                    mes: data.mes,
                    createAt: new Date().toISOString()
                };
                setMessageData(current => {
                    const updatedMessages = [newMessage, ...current];
                    return updatedMessages;
                });
            }
        });
    }, [setMessageData, selectedUser]);

    const messagesToShow = selectedUser
        ? [...messageList.filter(msg => msg.name === selectedUser.name || msg.to === selectedUser.name)].reverse()
        : [];
    console.log('data: ' + JSON.stringify(messagesToShow,null, 2))
    return (
        <div className='converse'>
            <div className="top">
                {selectedUser && (
                    <div className="user">
                        <img src="/avatar.png" alt=""/>
                        <div className="texts">
                            <span>{selectedUser ? selectedUser.name : ''}</span>
                        </div>
                    </div>
                )}
                {selectedUser && (
                    <div className="icons">
                        <img src="/phone.png" alt=""/>
                        <img src="/video.png" alt=""/>
                        <img src="/info.png" alt=""/>
                    </div>
                )}
            </div>
            <div className="center" onScroll={handleScroll}>
                {messagesToShow.map((message, index) => (
                    <div key={index} className={`message ${message.name === selectedUser.name ? "" : "own"}`}>
                        {message.name === selectedUser.name && (
                            <img src="/avatar.png" alt="" />
                        )}
                        <div className="texts">
                            <p>{message.mes}</p>
                            <span title={new Date(message.createAt).toLocaleString()}>
                                {formatMessageTime(message.createAt)}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="/img.png" alt=""/>
                    <img src="/camera.png" alt=""/>
                    <img src="/mic.png" alt=""/>
                </div>
                <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="emoji">
                    <img src="/emoji.png" alt="" onClick={() => setOpen(prev => !prev)} />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className="sendButton" onClick={handleSendMessage}>Gửi</button>
            </div>
        </div>
    )
}

export default Converse;
