const express = require('express');
const { response } = require('express');

const app = express();

app.listen(3000,function(){

    console.log("Servidor iniciado na porta 3000");

    app.get('/',function(request,response){
        console.log(`URL: '/' acessada`);
        response.send(`
            <html>
                <head>
                    <meta charset='utf-8'/>
                </head>
                <body>
                    <h1>Casa do código</h1>
                </body>
            </html>`
        );
    });

    app.get('/listagemLivros',function(request,response){
        console.log(`URL: '/listagemLivros' acessada`);
        response.send(`
            <html>
                <head>
                    <meta charset='utf-8'/>
                </head>
                <body>
                    <h1>Listagem livros</h1>
                </body>
            </html>
        `);
    });

})

/*const http = require('http');

const servidor = http.createServer(function(request,response){
    if(request.url == '/'){
        response.end(`
            <html>
                <head>
                    <meta charset='utf-8'/>
                </head>
                <body>
                    <h1>Casa do códido</h1>
                </body>
            </html>
        `);
    } else if (request.url == '/listagemLivros') {
        response.end(
            `<html>
                <head>
                    <meta charset='utf-8'/>
                </head>
                <body>
                    <h1>Listagem livros</h1>
                </body>
             </html>`
        );
    }


});

servidor.listen(3000);*/