const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], //colchetes indica que é um array (neste caso de Strings)
    location: {
        type: PointSchema,
        createIndexes: '2dsphere'
    } //location irá receber um objeto (indicado pelas chaves)
});

module.exports = mongoose.model('Dev', DevSchema);