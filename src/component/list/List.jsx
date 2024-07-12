import "./list.css";
import Userinfo from "./userInfo/Userinfo";
import ChatList from "./chatList/ChatList";

const List = ({ user, setSelectedUser, messageData, setMessageData }) => {
    return (
        <div className='list'>
            <Userinfo user={user} />
            <ChatList
                user={user}
                onUserSelect={setSelectedUser}
                messageData={messageData}
                setMessageData={setMessageData}
            />
        </div>
    );
};

export default List;
