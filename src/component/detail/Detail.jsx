import React from 'react';
import "./detail.css";
import WebSocketService from "../../WebSocketService";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/userSlice";

const Detail = ({ user, setUser }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        WebSocketService.sendMessage({
            action: "onchat",
            data: { event: "LOGOUT" },
        });

        if (!WebSocketService.registerCallback['AUTH']) {
            dispatch(setUser({ isLoggedIn: false, credentials: null }));
            localStorage.removeItem('user');
            console.log('Logout confirmed:', 'You Logged out');
            WebSocketService.close();
            window.location.href = '/login';
        } else {
            WebSocketService.registerCallback('AUTH', (data) => {
                console.log('Logout confirmed:', data);
                dispatch(setUser({ isLoggedIn: false, credentials: null }));
                localStorage.removeItem('user');
                WebSocketService.close();
                window.location.href = '/login';
            });
        }
    };


    return (
        <div className='detail'>
            <div className="user">
                <img src="/avatar.png" alt=""/>
                <h2>{user.user || 'Dương Trí Nguyên'}</h2>
                <p>NLUer</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Tùy chỉnh đoạn chat</span>
                        <img src="/arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Quyền riêng tư & hỗ trợ</span>
                        <img src="/arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Chia sẻ</span>
                        <img src="/arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>File phương tiện</span>
                        <img src="/arrowDown.png" alt=""/>
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://yt3.googleusercontent.com/uMUat6yJL2_Sk6Wg2-yn0fSIqUr_D6aKVNVoWbgeZ8N-edT5QJAusk4PI8nmPgT_DxFDTyl8=s900-c-k-c0x00ffffff-no-rj"
                                    alt=""
                                />
                                <span>Gawr_Gura.png</span>
                            </div>
                            <img src="/download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://yt3.googleusercontent.com/uMUat6yJL2_Sk6Wg2-yn0fSIqUr_D6aKVNVoWbgeZ8N-edT5QJAusk4PI8nmPgT_DxFDTyl8=s900-c-k-c0x00ffffff-no-rj"
                                    alt=""
                                />
                                <span>Gawr_Gura.png</span>
                            </div>
                            <img src="/download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://yt3.googleusercontent.com/uMUat6yJL2_Sk6Wg2-yn0fSIqUr_D6aKVNVoWbgeZ8N-edT5QJAusk4PI8nmPgT_DxFDTyl8=s900-c-k-c0x00ffffff-no-rj"
                                    alt=""
                                />
                                <span>Gawr_Gura.png</span>
                            </div>
                            <img src="/download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://yt3.googleusercontent.com/uMUat6yJL2_Sk6Wg2-yn0fSIqUr_D6aKVNVoWbgeZ8N-edT5QJAusk4PI8nmPgT_DxFDTyl8=s900-c-k-c0x00ffffff-no-rj"
                                    alt=""
                                />
                                <span>Gawr_Gura.png</span>
                            </div>
                            <img src="/download.png" alt="" className="icon"/>
                        </div>
                    </div>
                </div>
                <button>Chặn</button>
                <button className="logout" onClick={handleLogout}>Đăng xuất</button>
            </div>
        </div>
    );
};

export default Detail;
