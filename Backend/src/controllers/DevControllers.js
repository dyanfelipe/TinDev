const axios = require('axios');
const Dev = require('../models/Dev')
module.exports = {

    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await dev.find({
            $and:[
                { _id: { $ne: user }},
                { _id: { $nin: loggedDev.likes }},
                { _id: { $nin: loggedDev.dislikes }},
            ]
        })
        return res.json(users)
    },

  async store(req, res){
        const { username } = req.body;

        const UserExists = await Dev.findOne( { user: username } );

        if (UserExists) {
            return res.json(UserExists)
        }
        const response =  await axios.get(`https://api.github.com/users/${username}`);

        const { bio, name, avatar_url: avatar } = response.data



        const dev = await Dev.create({
            name: name,
            user: username,
            bio: bio,
            avatar: avatar
        });



        return res.json(dev);
    }
};