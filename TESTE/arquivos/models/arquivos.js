const mongoose = require('mongoose');

var instrumento = new mongoose.Schema({
    designacao: String,
    partitura: String
})

var arquivosSchema = new mongoose.Schema({
    titulo: String,
    tipo: String,
    compositor: String,
    instrumentos: [instrumento]
})

module.exports = mongoose.model('arquivos', arquivosSchema)