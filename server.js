const http = require('http');

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

servidor.listen(3000);