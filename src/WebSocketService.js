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
            if (data.status === 'success' || data.status === 'error') {
                callbacks[data.event](data);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };

    const registerCallback = (event, callback) => {
        callbacks[event] = callback;
    };

    const sendMessage = (message) => {
        try {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(message));
            } else {
                console.error('WebSocket is not open. Failed to send message:', message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const close = () => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.close();
        }
    };

    return {
        connect,
        registerCallback,
        sendMessage,
        close
    };
})();

export default WebSocketService;
