var express = require('express');
var router = express.Router();
var Nobel = require('../controllers/nobel')

/* GET: lista nobels */
/* GET: lista nobels que contenham a categoria x */ 
/* GET: lista nobels que contenham a categoria x e ano superior a y*/  
// -> /API/PREMIOS 
router.get('/premios', function(req, res) {
    if(req.query['categoria'] != null) {
      if(req.query['data'] != null) {
        Nobel.listarPremiosPorCategoriaEAno(req.query['categoria'],req.query['data'])
        .then(dados => res.render('lista_nobels_filter', {premios: dados}))
        .catch(erro => res.status(500).jsonp(erro))
      } else {
        Nobel.listarPremiosPorCategoria(req.query['categoria'])
        .then(dados => res.render('lista_nobels_filter', {premios: dados}))
        .catch(erro => res.render('erro', {error: erro}))
      }
    }
    else {
      Nobel.listarPremios()
      .then(dados => res.render('lista_nobels', {premios: dados}))
      .catch(erro => res.status(500).jsonp(erro))
    }
});

/* GET: nobel by id */ 
// -> /API/PREMIOS/:id 
router.get('/premios/:id', function(req, res) {
    Nobel.listarPremioPorId(req.params.id)
    .then(dados => res.render('lista_nobel', {premio: dados}))
    .catch(erro => res.status(500).jsonp(erro))
});

/* GET: lista categorias */ 
// -> /API/CATEGORIAS 
router.get('/categorias', function(req, res) {
    Nobel.listarCategorias()
    .then(dados => res.render('lista_categorias', {categorias: dados}))
    .catch(erro => res.status(500).jsonp(erro))
});

/* GET: lista categorias */ 
// -> /API/LAUREADOS 
router.get('/laureados', function(req, res) {
  Nobel.listarLaureados()
  .then(dados => res.render('lista_laureados', {laureados: dados}))
  .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
