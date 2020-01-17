/*  Funcoes do Controller:
index, show, store, update, destroy
*/  

const axios = require("axios"); //  chamadas para outras APIs
const Dev = require("../models/Dev");
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
      const devs = await Dev.find();

      return response.json(devs);
    },


  // async => pode demorar a responder
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body; // buscando 'github_username' dentro de 'request.body'
        
        let dev = await Dev.findOne({ github_username });

        if(!dev){
          // await => esperar o 'axios.get' finalizar
          const apiResponse = await axios.get(
            `https://api.github.com/users/${github_username}`
          ); // estudar 'promiss'
      
          const { name = login, avatar_url, bio } = apiResponse.data;
      
          const techsArray = parseStringAsArray(techs);
      
          const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
          }
      
          dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
          })
        }
        return response.json(dev);
      }
};