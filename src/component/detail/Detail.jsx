import React, { useState, useEffect } from 'react';
import "./detail.css";
import WebSocketService from "../../WebSocketService";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser as setUserRedux } from "../../store/userSlice";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUsers, FaUserPlus, FaTimes } from 'react-icons/fa';

const Detail = ({ user, setUser }) => {
    const dispatch = useDispatch();
    const [roomName, setRoomName] = useState("");
    const [joinRoomName, setJoinRoomName] = useState("");
    const [showCreateRoom, setShowCreateRoom] = useState(false);
    const [showJoinRoom, setShowJoinRoom] = useState(false);

    useEffect(() => {
        WebSocketService.registerRoomCreationCallback((error, data) => {
            if (error) {
                handleRoomCreationError(error);
            } else {
                handleRoomCreationSuccess(data);
            }
        });

        WebSocketService.registerRoomJoinCallback((error, data) => {
            if (error) {
                handleRoomJoinError(error);
            } else {
                handleRoomJoinSuccess(data);
            }
        });
    }, []);

    const handleLogout = () => {
        WebSocketService.sendMessage({
            action: "onchat",
            data: { event: "LOGOUT" },
        });

        if (!WebSocketService.registerCallback['AUTH']) {
            dispatch(setUserRedux({ isLoggedIn: false, credentials: null }));
            localStorage.removeItem('user');
            console.log('Logout confirmed:', 'You Logged out');
            WebSocketService.close();
            window.location.href = '/login';
        } else {
            WebSocketService.registerCallback('AUTH', (data) => {
                console.log('Logout confirmed:', data);
                dispatch(setUserRedux({ isLoggedIn: false, credentials: null }));
                localStorage.removeItem('user');
                WebSocketService.close();
                window.location.href = '/login';
            });
        }
    };

    const handleCreateRoom = () => {
        if (!roomName.trim()) {
            toast.error("Không được để trống tên group");
            return;
        }
        const message = {
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: {
                    name: roomName
                }
            }
        };
        WebSocketService.sendMessage(message);
    };

    const handleJoinRoom = () => {
        if (!joinRoomName.trim()) {
            toast.error("Không được để trống tên group");
            return;
        }

        const joinMessage = {
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: {
                    name: joinRoomName
                }
            }
        };

        const chatMessageRoom = {
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: "room",
                    to: joinRoomName,
                    mes: "Xin chào nhóm " + joinRoomName
                }
            }
        };

        const chatMessagePeople = {
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: "people",
                    to: joinRoomName,
                    mes: "Xin chào nhóm " + joinRoomName
                }
            }
        };
        WebSocketService.sendMessage(joinMessage);
        WebSocketService.sendMessage(chatMessageRoom);
        WebSocketService.sendMessage(chatMessagePeople);
    };

    const handleRoomCreationSuccess = (data) => {
        console.log('Room created successfully:', data);
        toast.success("Tạo group thành công");
    };

    const handleRoomCreationError = (error) => {
        console.error('Error creating room:', error);
        toast.error("Group đã tồn tại");
    };

    const handleRoomJoinSuccess = (data) => {
        console.log('Joined room successfully:', data);
        toast.success("Tham gia group thành công");
    };

    const handleRoomJoinError = (error) => {
        console.error('Error joining room:', error);
        toast.error("Group không tồn tại");
    };

    return (
        <div className='detail'>
            <div className="user" style={{paddingBottom: '0px'}}>
                <img src="/avatar.png" alt=""/>
                <h2>{''}</h2>
                <p>NLUer</p>
                <div className="search">
                    <div className="add" onClick={() => setShowCreateRoom(!showCreateRoom)}>
                        {showCreateRoom ? <FaTimes /> : <FaUsers />}
                    </div>
                    <div className="add" onClick={() => setShowJoinRoom(!showJoinRoom)}>
                        {showJoinRoom ? <FaTimes /> : <FaUserPlus />}
                    </div>
                </div>
                {showCreateRoom && (
                    <div className="modal-content">
                        <input
                            type="text"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            placeholder="Nhập tên group"
                        />
                        <button onClick={handleCreateRoom}>Tạo group</button>
                    </div>
                )}
                {showJoinRoom && (
                    <div className="modal-content">
                        <input
                            type="text"
                            value={joinRoomName}
                            onChange={(e) => setJoinRoomName(e.target.value)}
                            placeholder="Nhập tên group"
                        />
                        <button onClick={handleJoinRoom}>Tham gia</button>
                    </div>
                )}
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
                    </div>
                </div>
                <button>Chặn</button>
                <button className="logout" onClick={handleLogout}>Đăng xuất</button>
            </div>
            <ToastContainer position="bottom-right"/>
        </div>
    );
};

export default Detail;
