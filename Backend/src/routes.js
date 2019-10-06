const express = require('express');
const Devcontrollers = require('./controllers/DevControllers')
const routes = express.Router();

routes.post('/devs', Devcontrollers.store);

module.exports = routes;