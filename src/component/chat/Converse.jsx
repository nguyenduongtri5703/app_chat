import "./converse.css"
import EmojiPicker from "emoji-picker-react";
import {useEffect, useRef, useState} from "react";
import WebSocketService from "../../WebSocketService";

const Converse = ({selectedUser, messageData, setMessageData}) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [messageList, setMessageList] = useState([]);

    // const [messageData, setMessageData] = useState([]);

    const endRef = useRef(null);

    useEffect(() => {
        const storedMessageData = localStorage.getItem('messageData');
        if (storedMessageData) {
            setMessageData(JSON.parse(storedMessageData));
        }
    }, []);

    useEffect(() => {
        setMessageList(messageData);
    }, [messageData]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList, selectedUser]);

    useEffect(() => {
        WebSocketService.registerCallback("SEND_CHAT", (data) => {
            const newMessage = {
                type: "people",
                to: data.name,
                mes: data.mes,
                createAt: new Date().toISOString()
            };
            // Kiểm tra nếu tin nhắn mới là của người dùng đang xem hoặc là người gửi, thì mới cập nhật messageData
            if (selectedUser && (data.name === selectedUser.name || data.name === localStorage.getItem('user').name)) {
                setMessageData(prev => {
                    const updatedMessages = [newMessage, ...prev];
                    localStorage.setItem("messageData", JSON.stringify(updatedMessages));
                    return updatedMessages;
                });
            }
        });
    }, [setMessageData, selectedUser]);

    const formatMessageTime = (timestamp) => {
        const messageDate = new Date(timestamp);
        const currentDate = new Date();

        // Độ chênh lệch giờ hiện tại và thời gian tin nhắn
        const timeDifference = (currentDate.getTime() - messageDate.getTime()) / 1000; // Đổi sang giây

        if (timeDifference < 60) {
            return `${Math.floor(timeDifference / 60)} phút trước`;
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
            // Nếu không phải trong ngày hôm qua thì hiển thị ngày và giờ
            return messageDate.toLocaleString();
        }
    };

    const handleEmoji = (e) => {
        setText(prev=>prev+e.emoji)
        setOpen(false)
    }

    const handleSendMessage = () => {
        if (!text.trim()) return;

        const newMessage = {
            type: "people",
            to: selectedUser.name,
            mes: text
        };

        WebSocketService.sendMessage({
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: newMessage
            }
        });

        const messageWithTimestamp = {
            ...newMessage,
            createAt: new Date().toISOString()
        };

        const updatedMessages = [messageWithTimestamp, ...messageData];

        setMessageData(updatedMessages);
        localStorage.setItem("messageData", JSON.stringify(updatedMessages));

        setText("");
    }

    const messagesToShow = selectedUser ? [...messageList.filter(msg => msg.name === selectedUser.name || msg.to === selectedUser.name)].reverse() : [];
  return (
      <div className='converse'>
        <div className="top">
          <div className="user">
            <img src="/avatar.png" alt=""/>
            <div className="texts">
              <span>{selectedUser ? selectedUser.name : ''}</span>
            </div>
          </div>
          <div className="icons">
            <img src="/phone.png" alt=""/>
            <img src="/video.png" alt=""/>
            <img src="/info.png" alt=""/>
          </div>
        </div>
          <div className="center">
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
              <input type="text" placeholder="Nhập tin nhắn..."
                     value={text}
                     onChange={(e) => setText(e.target.value)}
              />
              <div className="emoji">
                  <img src="/emoji.png" alt="" onClick={() => setOpen(prev => !prev)}/>
                  <div className="picker">
                      <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                  </div>
              </div>
              <button className="sendButton" onClick={handleSendMessage}>Gửi</button>
          </div>
      </div>
  )
}

export default Converse;