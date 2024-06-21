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
          <div className="center">
              <div className="message">
                  <img src="/avatar.png" alt=""/>
                  <div className="texts">
                      <p>Previously known as an outstanding Jinzhou Patroller,
                          Yinlin is steady and reliable,
                          yet harbors hidden depths of secrets.
                      </p>
                      <span>1 phút trước</span>
                  </div>
              </div>
              <div className="message own">
                  <div className="texts">
                      <p>Previously known as an outstanding Jinzhou Patroller,
                          Yinlin is steady and reliable,
                          yet harbors hidden depths of secrets.
                      </p>
                      <span>1 phút trước</span>
                  </div>
              </div>
              <div className="message">
                  <img src="/avatar.png" alt=""/>
                  <div className="texts">
                      <p>Previously known as an outstanding Jinzhou Patroller,
                          Yinlin is steady and reliable,
                          yet harbors hidden depths of secrets.
                      </p>
                      <span>1 phút trước</span>
                  </div>
              </div>
              <div className="message own">
                  <div className="texts">
                      <img src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/448839707_984915886354727_5128022529440101055_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGDKerHQJtjNom2Xp2NGrwn-Aw-xZTJspz4DD7FlMmynIZ_QeGu1m7OZ3PpJcdy3N0iPNLkFrQRJEnyYRzkN1HC&_nc_ohc=652BL-yu8eUQ7kNvgGqtneO&_nc_ht=scontent.fsgn4-1.fna&oh=00_AYCFhFxa2kS32uDZcpW9dkLZZuiAHCGODE7IWbRvyn22bQ&oe=667B32C8" alt=""/>
                      <p>Previously known as an outstanding Jinzhou Patroller,
                          Yinlin is steady and reliable,
                          yet harbors hidden depths of secrets.
                      </p>
                      <span>1 phút trước</span>
                  </div>
              </div>
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
              <button className="sendButton">Gửi</button>
          </div>
      </div>
  )
}

export default Converse;