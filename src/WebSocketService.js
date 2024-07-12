const WebSocketService = (() => {
    let socket;
    let callbacks = {};

    const connect = (url) => {
        socket = new WebSocket(url);

        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.event === 'REGISTER') {
                handleRegisterResponse(data);
            } else if (data.status == 'success') {
=======
            if (callbacks[data.event]) {
                callbacks[data.event](data.data);
            } else {
                console.warn(`No callback registered for event: ${data.event}`);
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
        socket.onclose();
    }


    return {
        connect,
        registerCallback,
        sendMessage,
        close
    };


})();


export default WebSocketService;