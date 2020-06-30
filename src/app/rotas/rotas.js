const LivroDao = require('../infra/livro-dao');

const db = require('../../config/database.js');

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
    
    app.get('/livros',function(request,response){
        
        console.log(`URL: '/livros' acessada`);

        const livroDao = new LivroDao(db);

        livroDao.lista()
            .then(livros => response.marko(require('../view/lista/lista.marko.js'),{
                livros
            }))
            .catch(erro => console.log(erro));

      
    });
}