const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;
        const techArray = parseStringAsArray(techs);

        //listando os devs passando filtros (é possível passar vários filtros para cada parâmetro)
        const devs = Dev.find({
            techs: {
                $in: techArray, //retorne devs com as tecnologias que estejam dentro do array passado ($in - é um operador do próprio mongoDB)
            },
            location: {
                //retorn os elementos perto do ponto passado ($near - operador do mongoDB) e com a distância máxima de 10 mil metros
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            }
        });

        console.log(techArray);

        return response.json({ devs: [] });
    }
};