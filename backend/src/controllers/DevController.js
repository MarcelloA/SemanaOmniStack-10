const axios = require("axios"); //  chamadas para outras APIs
const Dev = require("../models/Dev")

module.exports = {
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body; // buscando 'github_username' dentro de 'request.body'
        // await => esperar o 'axios.get' finalizar
        const apiResponse = await axios.get(
          `https://api.github.com/users/${github_username}`
        ); // estudar 'promiss'
      
        const { name = login, avatar_url, bio } = apiResponse.data;
      
        const techsArray = techs.split(",").map(tech => tech.trim());
      
        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        }
      
        const dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location,
        })
      
        return response.json(dev);
      }
};