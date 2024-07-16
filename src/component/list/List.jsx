import "./list.css";
import Userinfo from "./userInfo/Userinfo";
import ChatList from "./chatList/ChatList";

const List = ({ user, setSelectedUser, messageData, setMessageData, state, setState }) => {
    return (
        <div className='list'>
            <Userinfo user={user.credentials} />
            <ChatList
                user={user.credentials}
                onUserSelect={setSelectedUser}
                messageData={messageData}
                setMessageData={setMessageData}
                state = {state}
                setState={setState}
            />
        </div>
    );
};

export default List;
