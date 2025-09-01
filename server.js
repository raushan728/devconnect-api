const express = require('express');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require("socket.io");
const Message = require('./models/Message');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
connectDB();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/users', require('./routes/users'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/messages', require('./routes/messages'));
let onlineUsers = [];

const addUser = (userId, socketId) => {
    if (userId && !onlineUsers.some((user) => user.userId === userId)) {
        onlineUsers.push({ userId, socketId });
    }
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId);
};
io.on('connection', (socket) => {
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        io.emit('getUsers', onlineUsers);
        console.log('User connected:', userId);
        console.log('Online users:', onlineUsers);
    });
    socket.on('sendMessage', async ({ senderId, receiverId, text }) => {
        const receiver = getUser(receiverId);
        
        if (receiver) {
            const newMessage = new Message({
                sender: senderId,
                receiver: receiverId,
                text: text,
                conversationId: [senderId, receiverId].sort().join('_')
            });

            try {
                const savedMessage = await newMessage.save();
                io.to(receiver.socketId).emit('receiveMessage', savedMessage);
                console.log(`Message sent to online user: ${receiverId}`);
            } catch (err) {
                console.error('Error saving message:', err);
            }
        } else {
            console.log(`Message for offline user ${receiverId} could be stored or handled.`);
        }
    });
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        const receiver = getUser(userToCall);
        if (receiver) {
            io.to(receiver.socketId).emit("callIncoming", { signal: signalData, from, name });
            console.log(`Incoming call signal sent to: ${receiver.userId}`);
        } else {
            socket.emit("callFailed", { msg: "User is not online." });
        }
    });
    socket.on("answerCall", (data) => {
        const caller = getUser(data.to);
        if (caller) {
            io.to(caller.socketId).emit("callAccepted", data.signal);
            console.log(`Call accepted signal sent to: ${caller.userId}`);
        }
    });
    socket.on("hangUp", ({ to }) => {
        const receiver = getUser(to);
        if (receiver) {
            io.to(receiver.socketId).emit("callEnded");
            console.log(`Call ended signal sent to: ${receiver.userId}`);
        }
    });
    socket.on('disconnect', () => {
        removeUser(socket.id);
        io.emit('getUsers', onlineUsers);
        console.log('A user disconnected!');
    });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));