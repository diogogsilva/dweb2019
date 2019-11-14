var Nobel = require('../models/nobel')

//GET LISTA NOBELS
module.exports.listarPremios = () => {
    return Nobel
        .find({}, {'_id': 0, 'year': 1, 'category': 1})
        .exec()
}

//GET LISTA CATEGORIAS
module.exports.listarCategorias = () => {
    return Nobel
        .find({}, {'_id': 0})
        .distinct('category')
        .exec()
}

//GET 1 NOBEL
module.exports.listarPremioPorId = id => {
    return Nobel
        .findOne({_id: id})
        .exec()
}

//GET NOBEL POR CATEGORIA
module.exports.listarPremiosPorCategoria = categ => {
    return Nobel
        .find({category: categ})
        .exec()
}

//GET NOBEL POR CATEGORIA E ANO SUPERIOR A DATA.
module.exports.listarPremiosPorCategoriaEAno = (categ, data) => {
    return Nobel
        .find({category: categ, year: {$gt : data}})
        .exec()
}

//GET LISTA LAUREADOS
module.exports.listarLaureados = () => {
    return Nobel
        .aggregate([{$unwind: "$laureates"}])
        .group({
            _id: "$laureates.id",
            firstname: { $first: "$laureates.firstname" },
            surname: {$first: "$laureates.surname" },
            prizes: {
                $push: {
                    year: "$year",
                    category: "$category"
                }
            }
        })
        .sort({firstname: true, surname: true })
    /*return Nobel
        .find({}, {'_id': 0, 'year': 1, 'category': 1, 'laureates': 1})
        .
        .exec()*/
}
