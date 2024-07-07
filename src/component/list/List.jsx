import "./list.css";
import Userinfo from "./userInfo/Userinfo";
import ChatList from "./chatList/ChatList";

const List = ({ user }) => {
    return (
        <div className='list'>
            <Userinfo user={user} />
            <ChatList user={user} />
        </div>
    );
};

export default List;
