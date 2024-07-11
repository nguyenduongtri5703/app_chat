import "./login.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import WebSocketService from "../../WebSocketService";

const Login = ({ setUser }) => {
    const [avatar, setAvatar] = useState({ file: null, url: "" });
    const [credentials, setCredentials] = useState({ user: "", pass: "" });
    const [registerCredentials, setRegisterCredentials] = useState({ username: "", email: "", password: "" });

    useEffect(() => {
        WebSocketService.registerCallback('LOGIN', (data) => {
            console.log('Login response:', data);
            if (data.RE_LOGIN_CODE) {
                const userData = {
                    isLoggedIn: true,
                    credentials: {
                        user: credentials.user,
                        pass: credentials.pass
                    }
                };
                console.log('Setting user data:', userData);
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData)); // Save user state in localStorage
                toast.success("Đăng nhập thành công");
            } else {
                toast.error("Đăng nhập thất bại");
            }
        });

        WebSocketService.registerCallback('REGISTER', (data) => {
            console.log('Register response:', data);
            if (data.status === 'success') {  // kiểm tra xem thành công không
                toast.success("Đăng ký thành công");
            } else {
                toast.error("Đăng ký thất bại");
            }
        });
    }, [credentials, registerCredentials, setUser]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleRegisterInputChange = e => {
        const { name, value } = e.target;
        setRegisterCredentials({
            ...registerCredentials,
            [name]: value
        });
    };

    const handleAvatar = e => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const handleLogin = e => {
        e.preventDefault();
        WebSocketService.sendMessage({
            action: 'onchat',
            data: {
                event: 'LOGIN',
                data: {
                    user: credentials.user,
                    pass: credentials.pass
                }
            }
        });
    };

    const handleRegister = e => {
        e.preventDefault();
        WebSocketService.sendMessage({
            action: 'onchat',
            data: {
                event: 'REGISTER',
                data: {
                    user: registerCredentials.email,
                    pass: registerCredentials.password
                }
            }
        });
    };

    return (
        <div className='login'>
            <div className="item">
                <h2>Chào mừng trở lại,</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" name="user" placeholder="User" value={credentials.user} onChange={handleInputChange} />
                    <input type="password" name="pass" placeholder="Password" value={credentials.pass} onChange={handleInputChange} />
                    <button>Đăng nhập</button>
                </form>
            </div>
            <div className="seperator"></div>
            <div className="item">
                <h2>Tạo tài khoản</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "/avatar.png"} alt="" />
                        Tải ảnh lên
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                    <input type="text" name="username" placeholder="Tên người dùng" value={registerCredentials.username} onChange={handleRegisterInputChange} />
                    <input type="text" name="email" placeholder="Email" value={registerCredentials.email} onChange={handleRegisterInputChange} />
                    <input type="password" name="password" placeholder="Mật khẩu" value={registerCredentials.password} onChange={handleRegisterInputChange} />
                    <button>Đăng ký</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
