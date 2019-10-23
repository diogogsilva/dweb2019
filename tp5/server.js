var http     = require('http');
var url      = require('url'); 
var pug      = require('pug');
var fs       = require('fs');
var jsonfile = require('jsonfile');

var {parse}  = require('querystring');

var myBD     = "tarefas.json";
var myServer = http.createServer((req, res) => {
    var purl = url.parse(req.url, true);
    var query= purl.query;
    if(req.method == 'GET') {
        if((purl.pathname == '/') || (purl.pathname == '/gestaoTarefas')) {
            jsonfile.readFile(myBD, (erro, tarefas)=>{
                if(!erro) {
                    res.writeHead(200, {'ContentType': 'text/html; charset=uft-8'});
                    res.write(pug.renderFile('index.pug', {lista: tarefas})); 
                    res.end()
                } else {
                    res.writeHead(200, {'ContentType': 'text/html; charset=uft-8'});
                    res.write(pug.renderFile('erro.pug', {e: "ERRO na leitura da BD..."}));
                    res.end();
                }
            })
        } else if(purl.pathname == '/w3.css') {
            res.writeHead(200, {'Content-Type': 'text/css'});
            fs.readFile('stylesheets/w3.css', (erro, dados)=>{
                if(!erro){
                    res.write(dados);
                } else {
                    res.write('<p>Erro:' + erro + '</p>');
                }
                res.end();
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=uft-8'});
            console.log("Pedido GET com caminho: " + purl.pathname + ", não está implementado...");
            res.write(pug.renderFile('erro.pug', {e: "Pedido GET com caminho: " + purl.pathname + ", não está implementado..."}));
            res.end();
        }
    } else if(req.method == 'POST') {
        if(req.url == '/aluno') {
            recuperaInfo(req, resultado =>{
                if(resultado != 0){
                    jsonfile.readFile(myBD, (erro, alunos)=>{
                        if(!erro){
                            alunos.push(resultado);
                            jsonfile.writeFile(myBD, alunos, erro => {
                                if(erro) {
                                    console.log(erro);
                                } else {
                                    console.log("Registo guardado com sucesso!");
                                }
                                res.end(pug.renderFile('index.pug',{lista: alunos}))
                            });
                        }
                        else {
                            res.end(pug.renderFile('index.pug',{lista: alunos}))
                        }
                    });
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=uft-8'});
                    console.log("ERRO: Pedido POST para Alunos sem parâmetros não estão implementados...");
                    res.write(pug.renderFile('erro.pug', {e: "ERRO: Pedido POST para Alunos sem parâmetros não estão implementados..."}));
                    res.end();
                }
            })
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=uft-8'});
            console.log("Pedido POST com caminho: " + purl.pathname + ", não está implementado...");
            res.write(pug.renderFile('erro.pug', {e: "Pedido POST com caminho: " + purl.pathname + ", não está implementado..."}));
            res.end();
        }
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=uft-8'});
        console.log("ERRO: Pedidos do tipo " + req.method + " não estão implementados...");
        res.write(pug.renderFile('erro.pug', {e: "ERRO: Pedidos do tipo " + req.method + " não estão implementados..."}));
        res.end();
    }
});

myServer.listen(5005, ()=>{
    console.log("Servidor à escuta na porta 5005...");
});

function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', bloco => {
            body += bloco.toString();
        })
        request.on('end', ()=>{
            callback(parse(body));
        });
    } else {
        callback(0);
    }
}