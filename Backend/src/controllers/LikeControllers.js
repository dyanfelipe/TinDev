const Dev = require('../models/Dev');
module.exports = {
    async store(req, res) {

        console.log(req.io, req.connectedUser)
        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({ error: "Usuário não existe" });
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            const loggedSocket = req.connectedUser[user];
            const targetSocket = req.connectedUser[devId];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('math', targetDev);
            }

            if (loggedSocket) {
                req.io.to(targetSocket).emit('math', loggedDev);
            }
        }

        loggedDev.likes.push(targetDev._id);

        loggedDev.save();

        return res.json(loggedDev);
    }
};