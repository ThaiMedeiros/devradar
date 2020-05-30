const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//Funções padrão de um controlador:
/*
 * index: exibir/mostrar uma lista de elementos/recursos
 * show: exibir/mostrar um único elemento/recurso
 * store: cadastrar/criar um elemento/recurso
 * update: atualizar/alterar um elemento/recurso 
 * destroy: destruir/deletar um elemento/recurso
*/

module.exports = {

    //lista de devs
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    //name functions (cadastrar um dev)
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        //verificando se já existe um dev cadastrado com o username passado
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data; //caso o name não exista, por padrão seu valor será o login (atribui automaticamente)

            //transformando a string de tecnologias em um array
            const techsArray = parseStringAsArray(techs);

            //tratando a localização
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            //Cadastrando
            dev = await Dev.create({
                github_username, //Caso a variável tenha o mesmo nome da propriedade, pode adotar a short sintaxe no js (entende que a propriedade e valor tem mesmo nome)
                name,
                avatar_url,
                bio,
                techs: techsArray, //neste caso propriedade e valores tem nomes diferentes
                location,
            });
        }

        return response.json(dev);
    }
};