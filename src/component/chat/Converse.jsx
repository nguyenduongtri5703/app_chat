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

    const isOwnMessage = (message) => {
        return message.to === selectedUser.name;
    };

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
              {/*<div className="message">*/}
              {/*    <img src="/avatar.png" alt=""/>*/}
              {/*    <div className="texts">*/}
              {/*        <p>Previously known as an outstanding Jinzhou Patroller,*/}
              {/*            Yinlin is steady and reliable,*/}
              {/*            yet harbors hidden depths of secrets.*/}
              {/*        </p>*/}
              {/*        <span>1 phút trước</span>*/}
              {/*    </div>*/}
              {/*</div>*/}
              {/*<div className="message own">*/}
              {/*    <div className="texts">*/}
              {/*        <p>Previously known as an outstanding Jinzhou Patroller,*/}
              {/*            Yinlin is steady and reliable,*/}
              {/*            yet harbors hidden depths of secrets.*/}
              {/*        </p>*/}
              {/*        <span>1 phút trước</span>*/}
              {/*    </div>*/}
              {/*</div>*/}
              {/*<div className="message">*/}
              {/*    <img src="/avatar.png" alt=""/>*/}
              {/*    <div className="texts">*/}
              {/*        <p>Previously known as an outstanding Jinzhou Patroller,*/}
              {/*            Yinlin is steady and reliable,*/}
              {/*            yet harbors hidden depths of secrets.*/}
              {/*        </p>*/}
              {/*        <span>1 phút trước</span>*/}
              {/*    </div>*/}
              {/*</div>*/}
              {/*<div className="message own">*/}
              {/*    <div className="texts">*/}
              {/*        <img src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/448839707_984915886354727_5128022529440101055_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGDKerHQJtjNom2Xp2NGrwn-Aw-xZTJspz4DD7FlMmynIZ_QeGu1m7OZ3PpJcdy3N0iPNLkFrQRJEnyYRzkN1HC&_nc_ohc=652BL-yu8eUQ7kNvgGqtneO&_nc_ht=scontent.fsgn4-1.fna&oh=00_AYCFhFxa2kS32uDZcpW9dkLZZuiAHCGODE7IWbRvyn22bQ&oe=667B32C8" alt=""/>*/}
              {/*        <p>Previously known as an outstanding Jinzhou Patroller,*/}
              {/*            Yinlin is steady and reliable,*/}
              {/*            yet harbors hidden depths of secrets.*/}
              {/*        </p>*/}
              {/*        <span>1 phút trước</span>*/}
              {/*    </div>*/}
              {/*</div>*/}
              {messagesToShow.map((message, index) => (
                  <div key={index} className={`message ${isOwnMessage(message) ? "own" : ""}`}>
                      {!isOwnMessage(message) && (
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