import "./addUser.css"

const AddUser = () => {
    return (
        <div className='addUser'>
            <form>
                <input type="text" placeholder="Tên người dùng" name="username"/>
                <button>Tìm</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="/avatar.png" alt=""/>
                    <span>Phúc Lỏ</span>
                </div>
                <button>Thêm</button>
            </div>
        </div>
    )
}
export default AddUser