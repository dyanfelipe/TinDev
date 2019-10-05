const express = require('express');

const routes = express.Router();

routes.get('/', function (req, res){
    return res.json({ message: `Tudo ok: ${req.query.name}`})
});

routes.post('/devs', (req, res) => {
    return res.json({
        ok: true,
        name: 'dyan',
        idade: 23,
        menbro: true
    });
});

module.exports = routes;