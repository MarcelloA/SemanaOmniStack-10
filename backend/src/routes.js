const { Router } = require("express"); // importando apenas o modulo de roteamento
const DevController = require('./controllers/DevController');

const routes = Router();
// async => pode demorar a responder
routes.post("/devs", DevController.store);

module.exports = routes;