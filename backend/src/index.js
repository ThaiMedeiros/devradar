const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://developer:developer@cluster0-pafje.mongodb.net/devradar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());

//Métodos: GET, POST, PUT, DELETE

//Tipos de Parâmetros:
/*
 * Query params: request.query (filtros, ordenação, paginação, etc..)
 * Route Params: request.params (identificar recurso na alteração ou remoção / o nomde do recurso aparece na url após '?')
 * Body: request.body (dados para criação ou alteração de um registro / o nomde do recurso é indicado na criação da rota)  
*/

app.use(routes);
app.listen(3333);