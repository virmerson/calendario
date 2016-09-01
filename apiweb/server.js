
var http = require("http");
var http = require("url");

var server = http.createServer(function (request, response){
    //O que vai no HEAD do cabeçalho HTTP
    response.writeHead(200, {"content-type":"text/html"});
    
    
    if(request.url=="/"){
        
        response.write("<h1>Página inicial</h1>");
        
    }else if (request.url=="/bemvindo"){
        
        response.write("<h1> Bem Vindo :D </h1");
    }else {
         
        response.write("<h1> Página Não encontrada </h1>");
    }
  
    response.end();
    
});


var servidorLigou=function(){
    console.log("Servidor Hello rodando!");
    
};

server.listen(3000, servidorLigou);