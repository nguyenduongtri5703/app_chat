import "./userInfo.css";

const Userinfo = ({ user }) => {
    // console.log('Userinfo component user prop:', user);
    return (
        <div className='userInfo'>
            <div className="user">
                <img src="/avatar.png" alt="" />
                <h2>{user ? user.user : 'User not found'}</h2>
            </div>
            <div className="icons">
                <img src="/more.png" alt="" />
                <img src="/video.png" alt="" />
                <img src="/edit.png" alt="" />
            </div>
        </div>
    );
};

export default Userinfo;