import "./converse.css"
import EmojiPicker from "emoji-picker-react";
import {useState} from "react";

const Converse = () => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")

    const handleEmoji = (e) => {
        setText(prev=>prev+e.emoji)
        setOpen(false)
    }
  return (
      <div className='converse'>
        <div className="top">
          <div className="user">
            <img src="/avatar.png" alt=""/>
            <div className="texts">
              <span>Dương Trí Nguyên</span>
              <p>Name's Yinlin.</p>
            </div>
          </div>
          <div className="icons">
            <img src="/phone.png" alt=""/>
            <img src="/video.png" alt=""/>
            <img src="/info.png" alt=""/>
          </div>
        </div>
        <div className="center"></div>
        <div className="bottom">
          <div className="icons">
            <img src="/img.png" alt=""/>
            <img src="/camera.png" alt=""/>
            <img src="/mic.png" alt=""/>
          </div>
          <input type="text" placeholder="Nhập tin nhắn..."
          value={text}
          onChange={(e)=> setText(e.target.value)}
          />
          <div className="emoji">
            <img src="/emoji.png" alt="" onClick={()=>setOpen(prev => !prev)}/>
             <div className="picker">
                 <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
             </div>
          </div>
          <button className="sendButton">Gửi</button>
        </div>
      </div>
  )
}

export default Converse;