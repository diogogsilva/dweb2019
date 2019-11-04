var express = require('express')
var router = express.Router()
var jsonfile = require('jsonfile')
const nanoid = require('nanoid')

var myBD = __dirname + "/../arq-son-evo.json"

/* GET home page. */
router.get('/', function(req, res, next) {
  jsonfile.readFile(myBD, (erro, songs)=>{  
    if(!erro) {
      songs.forEach(song => {
        song.id = nanoid()
      })
      songs.sort(function(a,b){
        return a.tit.localeCompare(b.tit)
      })
      jsonfile.writeFile(myBD, songs, erro => {
        if (erro) {
          res.render('error', { e: erro })
        } else {
          res.render('index', { songs: songs})
        }
      })
    }
  })
})

router.get('/:id', function(req, res, next) {
  jsonfile.readFile(myBD, (erro, songs)=>{  
    if(!erro){
      var id = req.params.id
      let index = songs.findIndex(song => song.id == id)
      res.render('view', {song: songs[index]})
      res.end()
    }
  })
})

router.post('/', function(req, res, next) {
  jsonfile.readFile(myBD, (erro, songs)=>{  
    if(!erro){
      songs.push(req.body)
      jsonfile.writeFile(myBD, songs, erro => {
        if(erro) console.log(erro)
        else console.log('Música adicionada com sucesso')
      })
    }
  })
  res.redirect('/')
})

router.post('/:id', function(req, res, next){
  jsonfile.readFile(myBD, (erro, songs)=>{  
    if(!erro){
        var id = req.params.id
        let index = songs.findIndex(song => song.id == id)
        songs[index].tit = req.body.tit
        songs[index].prov = req.body.prov
        songs[index].local = req.body.local
        songs[index].duracao = req.body.duracao
        jsonfile.writeFile(myBD, songs, erro => {
          if(erro) console.log(erro)
          else console.log('Musica: ' + id + ' alterada com sucesso!')
        })
      }
      else{
          console.log('Erro na leitura da BD...')
          res.end('1')
      }
  })
  res.redirect('/')
})

router.delete('/:id', function(req, res) {
  jsonfile.readFile(myBD, (erro, songs)=>{  
    if(!erro){
      var id = req.params.id
      var index = songs.findIndex(song => song.id == id)
      if(index != '') {
        songs.splice(index, 1)
        jsonfile.writeFile(myBD, songs, erro => {
          if(erro) console.log(erro)
          else console.log('Removido com sucesso')
        })
        res.end('0')
      } else {
        res.render('error', { e: 'Não encontrada canção para apagar...' })
      }
    } else {
      res.render('error', { e: 'Não encontrada canção para apagar...' })
    }
  })
})

module.exports = router
