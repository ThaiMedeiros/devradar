const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index); //listar devs
routes.post('/devs', DevController.store); //cadastrar devs

routes.get('/search', SearchController.index); //buscar dev passando parâmetros

module.exports = routes;