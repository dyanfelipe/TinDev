const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectUsers = {}

io.on('connect', socket => {
    const { user } = socket.handshake.query;
    connectUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://dev:dev@cluster0-o7vg9.mongodb.net/teste?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connection = connectUsers;
    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);