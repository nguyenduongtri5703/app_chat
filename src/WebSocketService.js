const WebSocketService = (() => {
    let socket;
    let callbacks = {};
    let roomCreationCallback;
    let roomJoinCallback;

    const connect = (url) => {
        socket = new WebSocket(url);

        socket.onopen = () => {
            console.log('WebSocket connected');
            if (callbacks['open']) {
                callbacks['open']();
            }
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
             if (data.event === 'REGISTER') {
                handleRegisterResponse(data);
            }
             else if (data.event === 'CREATE_ROOM') {
                if (roomCreationCallback) {
                    if (data.status === 'success') {
                        roomCreationCallback(null, data.data);
                    } else {
                        roomCreationCallback(data.mes, null);
                    }
                }
            } else if (data.event === 'JOIN_ROOM') {
                if (roomJoinCallback) {
                    if (data.status === 'success') {
                        roomJoinCallback(null, data.data);
                    } else {
                        roomJoinCallback(data.mes, null);
                    }
                }
            } else if (data.status === 'success') {
                callbacks[data.event](data.data);
            } else if (data.status === 'error') {
                callbacks[data.event](data.mes);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
        };

        socket.onerror = (error) => {
            console.log('WebSocket error', error);
        };
    };

    const handleRegisterResponse = (data) => {
        if (data.status === 'success' || data.status === 'error') {
            callbacks[data.event](data);
        }
    };

    const registerCallback = (event, callback) => {
        callbacks[event] = callback;
    };

    const registerRoomCreationCallback = (callback) => {
        roomCreationCallback = callback;
    };

    const registerRoomJoinCallback = (callback) => {
        roomJoinCallback = callback;
    };

    const sendMessage = (message) => {
        try {
            socket.send(JSON.stringify(message));
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const close = () => {
        if (socket) {
            socket.close();
        }
    };

    return {
        connect,
        registerCallback,
        registerRoomCreationCallback,
        registerRoomJoinCallback,
        sendMessage,
        close,

    };
})();

export default WebSocketService;