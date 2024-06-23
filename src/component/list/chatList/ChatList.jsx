import "./chatList.css"
import {useState} from "react";
import AddUser from "./addUser/addUser";

const ChatList = () => {
    const [addMode, setAddMode] = useState(false)
    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt=""/>
                    <input type="text" placeholder={"Tìm kiếm"}/>
                </div>
                <img src={addMode ? "/minus.png" : "/plus.png"} alt="" className="add"
                     onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            <div className="item">
                <img src="/avatar.png" alt=""/>
                <div className="texts">
                    <span>Dương Trí Nguyên</span>
                    <p>Xin chào</p>
                </div>
            </div>
            <div className="item">
                <img src="/avatar.png" alt=""/>
                <div className="texts">
                    <span>Dương Trí Nguyên</span>
                    <p>Xin chào</p>
                </div>
            </div>
            <div className="item">
                <img src="/avatar.png" alt=""/>
                <div className="texts">
                    <span>Dương Trí Nguyên</span>
                    <p>Xin chào</p>
                </div>
            </div>
            <div className="item">
                <img src="/avatar.png" alt=""/>
                <div className="texts">
                    <span>Dương Trí Nguyên</span>
                    <p>Xin chào</p>
                </div>
            </div>
            {addMode && <AddUser/>}
        </div>
    )
}

export default ChatList;