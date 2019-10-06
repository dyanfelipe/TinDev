const axios = require('axios');
const Dev = require('../models/Dev')
module.exports = {
  async store(req, res){
        const { username } = req.body;

        const response =  await axios.get(`https://api.github.com/users/${username}`);


        const { bio, name, avatar_url: avatar } = response.data



        const dev = await Dev.create({
            name: name,
            user: username,
            bio: bio,
            avatar: avatar
        })



        return res.json(dev);
    }
};