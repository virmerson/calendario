var http = require("http");
var url = require("url");

var server = http.createServer(function (request, response){
    //O que vai no HEAD do cabeçalho HTTP
    response.writeHead(200, {"content-type":"text/html"});
    response.write("<h1> Dados da query String </h1>");
    
    //?nome=jao&email=jao@htcursos.com&fone=889899
    var  result = url.parse(request.url, true);
    //                    K      v            k             V                k      v
    //result.query = [ {"nome","jao"} ,   {"email":"jao@htcursos.com"}  , {"fone","6565"} ]
    //                        0                     1                            2
    for (var key in result.query){
        response.write("<h2>"+ key + ": "+ result.query[key]+ "</h2>");
    }
    response.end();
    
});

var servidorLigou=function(){
    console.log("Servidor Hello rodando!");
    
};

server.listen(3000, servidorLigou);