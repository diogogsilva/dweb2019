var Arquivo = require('../models/arquivos')

module.exports.getArquivos = () => {
    return Arquivo
        .find()
        .select({'titulo': 1, 'tipo':1, 'compositor':1})
        .exec()
}

module.exports.getArquivoById = (id) => {
    return Arquivo
        .findById(id)
        .exec()
}

module.exports.getArquivosByCompositor = (compositor) => {
    return Arquivo
        .find({compositor: compositor})
        .select({'@id': 0})
        .exec()
}

module.exports.getArquivosByInstrumento = (instrumento) => {
    return Arquivo
        .aggregate(
            [{$unwind: "$instrumentos"},
            {$match:{'instrumentos.designacao':instrumento}}]
        )
}

module.exports.getArquivosQuant = () => {
    return Arquivo
        .aggregate(
            [{$unwind: "$instrumentos"},
            {$group:{_id:"$_id",titulo:{"$first":"$titulo"},partituras:{$sum:1}}}]
        )
}

module.exports.getTipos = () => {
    return Arquivo
        .find()
        .distinct('tipo')
}