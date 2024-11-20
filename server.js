const express = require('express');
const testRoutes = require('./Routes/testRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const messageRoutes = require('./Routes/messageRoutes');
const userRoutes = require('./Routes/userRoutes');
const companyRoutes = require('./Routes/companyRoutes');
const taskRoutes = require('./Routes/taskRouter');
const financeRoutes = require('./Routes/financialRouter');
const leaveRoutes = require('./Routes/leaveRoutes');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');
const pool = require('./config/db');

// Initialize express app
const app = express();
const server = http.createServer(app);

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize Socket.IO
const io = new Server(server, {
  cors: corsOptions,
  pingTimeout: 60000,
  pingInterval: 25000
});

// Token verification middleware
const verifyToken = (req, res, next) => {
  if (
    req.path === '/user/login' ||
    req.path === '/user/register' ||
    req.path === '/company/'
  ) {
    return next();
  }

  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Apply middleware
app.use(verifyToken);

// API Routes
app.use('/tests', testRoutes);
app.use('/events', eventRoutes);
app.use('/messages', messageRoutes);
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/task', taskRoutes);
app.use('/finance', financeRoutes);
app.use('/leaves', leaveRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // Handle joining a chat
  socket.on('join_chat', async (data) => {
    const { sender_id, recipient_id } = data;
    console.log('Join chat request:', { sender_id, recipient_id });
    
    try {
      const [messages] = await pool.query(
        `SELECT * FROM messages 
         WHERE (sender_id = ? AND recipient_id = ?)
         OR (sender_id = ? AND recipient_id = ?)
         ORDER BY __createdtime__ ASC 
         LIMIT 100`,
        [sender_id, recipient_id, recipient_id, sender_id]
      );
      
      socket.emit('last100messages', messages);
      console.log(`Sent ${messages.length} messages to client`);
    } catch (error) {
      console.error('Error fetching messages:', error);
      socket.emit('error', { message: 'Failed to fetch messages' });
    }
  });

  // Handle sending messages
  socket.on('send_message', async (data) => {
    const { message, sender_id, recipient_id, __createdtime__ } = data;
    console.log('New message:', { sender_id, recipient_id, message });
    
    try {
      await pool.query(
        "INSERT INTO messages (message, sender_id, recipient_id, __createdtime__) VALUES (?, ?, ?, ?)",
        [message, sender_id, recipient_id, __createdtime__]
      );
      
      io.emit('receive_message', data);
      console.log('Message broadcasted to all clients');
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', { message: 'Failed to save message' });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const HTTP_PORT = process.env.PORT || 3000;
const SOCKET_PORT = 4000;

// Start both HTTP and Socket.IO servers
server.listen(SOCKET_PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error('Error starting Socket.IO server:', err);
    return;
  }
  console.log(`Socket.IO server running on port ${SOCKET_PORT}`);
});

// Create a separate HTTP server for the API
app.listen(HTTP_PORT, () => {
  console.log(`HTTP API server running on port ${HTTP_PORT}`);
});

module.exports = { app, io };