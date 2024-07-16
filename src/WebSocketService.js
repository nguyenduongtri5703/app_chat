const WebSocketService = (() => {
    let socket;
    let callbacks = {};

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
            if (data.status == 'success') {
                callbacks[data.event](data.data);
            }else if (data.status == 'error'){
                callbacks[data.event](data.mes);
            }else if (data.event === 'REGISTER') {
                handleRegisterResponse(data);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
        };

        socket.onerror = (error) => {
            console.log('WebSocket error', error);
        };
    };

    // đăng ký

    const handleRegisterResponse = (data) => {
        if (data.status === 'success' || data.status === 'error') {
            callbacks[data.event](data);
        }
    };

    const registerCallback = (event, callback) => {
        callbacks[event] = callback;
    };

    const sendMessage = (message) => {
        try {
            socket.send(JSON.stringify(message));
            // console.log(message)
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
        sendMessage,
        close,

    };


})();


export default WebSocketService;