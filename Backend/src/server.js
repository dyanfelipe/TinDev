const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://dev:dev@cluster0-o7vg9.mongodb.net/teste?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true 
});


server.use(express.json())
server.use(routes);

server.listen(3333);