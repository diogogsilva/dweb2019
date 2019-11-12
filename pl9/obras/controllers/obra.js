var Obra = require('../models/obra')

//GET LISTA OBRAS
module.exports.listarObras = () => {
    return Obra
        .find()
        .exec()
}

//GET OBRAS COM ANO = ANOX
module.exports.listarObrasDeUmAno = anoX => {
    return Obra
        .find({anoCriacao: anoX})
        .exec()
}

//GET OBRAS COM COMPOSITOR = ANOY E DURACAO >= DURACAOZ
module.exports.listarObrasDeUmCompositorEDuracaoSuperior = (compositorY, duracaoZ) => {
    return Obra
        .find({compositor: compositorY, duracao: {$gte: duracaoZ}})
        .exec()
}

//GET OBRAS COM PERIODO = PERIODOA
module.exports.listarObrasDeUmPeriodo = periodoA => {
    return Obra
        .find({periodo: periodoA})
        .exec()
}

//GET OBRA COM ID = id
module.exports.listarObraPorId = id => {
    return Obra
        .findOne({id: id})
        .exec()
}

//GET LISTA COMPOSITORES
module.exports.listarCompositores = () => {
    return Obra
        .find({}, {'_id': 0, 'compositor': 1})
        .distinct('compositor')
        .exec()
}

//GET LISTA PERIODOS
module.exports.listarPeriodos = () => {
    return Obra
        .find({}, {'_id': 0, 'periodo': 1})
        .distinct('periodo')
        .exec()
}