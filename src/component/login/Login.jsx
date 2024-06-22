import "./login.css"
import {useState} from "react";
import {toast} from "react-toastify";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const handleAvatar = e => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleLogin = e => {
        e.preventDefault()
        toast.error("Xin chào")
    }

    return (
        <div className='login'>
            <div className="item">
                <h2>Chào mừng trở lại,</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" name="email" placeholder="Email"/>
                    <input type="password" name="password" placeholder="Mật khẩu"/>
                    <button>Đăng nhập</button>
                </form>
            </div>
            <div className="seperator"></div>
            <div className="item">
                <h2>Tạo tài khoản</h2>
                <form>
                    <label htmlFor="file">
                        <img src={avatar.url || "/avatar.png"} alt=""/>
                        Tải ảnh lên
                    </label>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar}/>
                    <input type="text" name="username" placeholder="Tên người dùng"/>
                    <input type="text" name="email" placeholder="Email"/>
                    <input type="password" name="password" placeholder="Mật khẩu"/>
                    <button>Đăng ký</button>
                </form>
            </div>
        </div>
    )
}

export default Login;