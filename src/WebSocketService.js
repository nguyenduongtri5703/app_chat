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
            console.log('WebSocket message received:', data);

            if (data.event && callbacks[data.event] && typeof callbacks[data.event] === 'function') {
                if (data.status == 'success') {
                    callbacks[data.event](data.data);
                } else if (data.status == 'error') {
                    callbacks[data.event](data.mes);
                }
            } else {
                console.warn(`No valid callback registered for event: ${data.event}`);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
        };

        socket.onerror = (error) => {
            console.log('WebSocket error', error);
        };
    };

    const registerCallback = (event, callback) => {
        if (typeof callback === 'function') {
            callbacks[event] = callback;
            console.log(`Callback registered for event: ${event}`);
        } else {
            console.warn(`Attempted to register a non-function callback for event: ${event}`);
        }
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
        sendMessage,
        close
    };
})();

export default WebSocketService;
