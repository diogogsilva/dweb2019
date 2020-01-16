var express = require('express');
var router = express.Router();

var Arquivo = require('../controllers/arquivos')

/* GET /obras... */
router.get('/obras', function(req, res) {
  if(req.query.compositor != undefined && req.query.instrumento == undefined){
    Arquivo.getArquivosByCompositor(req.query.compositor)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.statusCode(500).jsonp(erro))
  } else if(req.query.compositor == undefined && req.query.instrumento != undefined){
    Arquivo.getArquivosByInstrumento(req.query.instrumento)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.statusCode(500).jsonp(erro))
  } else {
    Arquivo.getArquivos()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.statusCode(500).jsonp(erro))
  }
});

/* GET /obrasQuant... */
router.get('/obrasQuant', function(req, res) {
  Arquivo.getArquivosQuant()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.statusCode(500).jsonp(erro))
})

/*GET /obras/:id */
router.get('/obras/:id', function(req, res) {
  Arquivo.getArquivoById(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.statusCode(500).jsonp(erro))
});

/*GET /tipos */
router.get('/tipos', function(req, res) {
  Arquivo.getTipos()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.statusCode(500).jsonp(erro))
});

module.exports = router;
