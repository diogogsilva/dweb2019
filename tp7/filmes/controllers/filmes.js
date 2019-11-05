var Filme = require('../models/filme')

const Filmes = module.exports

Filmes.listar = () => {
    return Filme
        .find()
        .sort({title: 1})
        .limit(100)
        .exec()
}

Filmes.consultar = fid => {
    return Filme
        .findOne({_id: fid})
        .exec()
}

Filmes.contar = () => {
    return Filme
        .countDocuments()
        .exec()
}

Filmes.projetar = () => {
    return Filme
        .find({}, campos)
        .exec()
}

Filmes.agregar = campo => {
    return Filme
        .aggregate([{$group: {_id: "$" + campo, contador: {$sum: 1}}}, {$sort: {contador: -1}}])
        .exec()
}

Filmes.adicionar = body => {
    var filme = new Filme(body)
    filme.save(function (err) {
        if (err) return handleError(err);
        else console.log("Saved")
    });
    return Filme
        .find()
        .sort({title: 1})
        .exec()
}

Filmes.apagar = fid => {
    Filme
        .deleteOne({_id: fid})
        .exec()
    return Filme
        .find()
        .sort({title: 1})
        .exec()
}

Filmes.editar = filme => {
    return Filme
        .findOneAndUpdate({_id: filme._id}, filme, {new: true})
}