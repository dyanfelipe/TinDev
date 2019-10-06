const express = require('express');
const Devcontrollers = require('./controllers/DevControllers');
const LikeControllers = require('./controllers/LikeControllers');
const Deslikescontrollers = require('./controllers/DesLikeControllers');
const routes = express.Router();


routes.get('/devs', Devcontrollers.index);
routes.post('/devs', Devcontrollers.store);
routes.post('/devs/:devId/likes', LikeControllers.store);
routes.post('/devs/:devId/dislikes', Deslikescontrollers.store);


module.exports = routes;