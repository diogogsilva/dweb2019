var http = require('http');
var fs  = require('fs');

var servidor   = http.createServer(function(req,res) {
    var partes = req.url.split('/');
    var pag    = partes[partes.length -1];
    if(pag >= 1 && pag <= 122){
        fs.readFile('xmls/arq' + pag + '.xml', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.write(data);
            res.end();
        });
    } else {
        var indiceName = '';
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1>Arquiossitos:</h1>");
        res.write("<h3>Diogo Silva</h3>");
        res.write("<ol>")
        for(i = 1; i<= 122; i++) {
            res.write("<li><a href='/" + i + "'>arq" + i + "</a><br></li>");
        }
        res.write("</ol>")
        res.end();
    }
})
servidor.listen(7777);