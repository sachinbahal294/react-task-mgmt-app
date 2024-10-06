const WEBSOCKET_URL = 'ws://localhost:8080';
let socket;

export const connectWebSocket = (onMessage) => {
  socket = new WebSocket(WEBSOCKET_URL);

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    console.log('Received raw message:', event.data); // Log the raw data
    if (onMessage) {
      try {
        onMessage(event.data);
      } catch (error) {
        console.error('Error parsing message:', error); // Log parsing errors
      }
    }
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  socket.onerror = (error) => {
    console.log('WebSocket error:', error);
  };
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
  }
};
