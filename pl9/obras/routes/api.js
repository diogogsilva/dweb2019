var express = require('express');
var router = express.Router();
var Obra = require('../controllers/obra')

/* GET: lista obras de um ano x */ 
/* GET: lista obras de um compositor y e duracao superior a z*/  
/* GET: lista obras de um periodo a */ 
/* GET: lista obras */
// -> /OBRAS 
router.get('/obras', function(req, res) {
    if(req.query['compositor'] != null && req.query['duracao'] != null) {
      Obra.listarObrasDeUmCompositorEDuracaoSuperior(req.query['compositor'],req.query['duracao'])
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    } else if(req.query['ano'] != null) {
      Obra.listarObrasDeUmAno(req.query['ano'])
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    } else if(req.query['periodo'] != null) {
      Obra.listarObrasDeUmPeriodo(req.query['periodo'])
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    } else {
      Obra.listarObras()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
});

/* GET: OBRA by id */ 
// -> /OBRAS/:id 
router.get('/obras/:id', function(req, res) {
  Obra.listarObraPorId(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

/* GET: lista compositores */ 
// -> /COMPOSITORES
router.get('/compositores', function(req, res) {
    Obra.listarCompositores()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
});

/* GET: lista periodos */ 
// -> /PERIODOS
router.get('/periodos', function(req, res) {
  Obra.listarPeriodos()
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
