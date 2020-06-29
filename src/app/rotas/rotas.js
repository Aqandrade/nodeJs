module.exports = (app) =>{

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
}