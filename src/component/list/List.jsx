import "./list.css";
import Userinfo from "./userInfo/Userinfo";
import ChatList from "./chatList/ChatList";

const List = ({ user, setSelectedUser }) => {
    return (
        <div className='list'>
            <Userinfo user={user} />
            <ChatList user={user} onUserSelect={setSelectedUser} />
        </div>
    );
};

export default List;
