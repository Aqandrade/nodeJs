const { check, validationResult } = require('express-validator/check');

const LivroDao = require('../infra/livro-dao');

const db = require('../../config/database.js');

module.exports = (app) =>{

    app.get('/',function(request,response){
        console.log(`URL: '/' acessada`);
        response.marko(require('../view/base/home/home.marko'));
    });
    
    app.get('/livros',function(request,response){
        
        console.log(`URL: '/livros' acessada`);

        const livroDao = new LivroDao(db);

        livroDao.lista()
            .then(livros => response.marko(require('../view/livros/lista/lista.marko'),{
                livros
            }))
            .catch(erro => console.log(erro));

    });

    app.get('/livros/form',function(request,response){
        response.marko(require('../view/livros/form/form.marko'),
        {
            livro:{}
        })
    });

    app.get('/livros/form/:id',function(request,response){
        const id = request.params.id;

        livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
            .then(livro => {
                console.log(livro);
                response.marko(
                    require('../view/livros/form/form.marko'),
                    {
                        livro:livro
                    }
                );
            })
            .catch(erro => console.log(erro));
    });

    app.post('/livros/form',[
        check('titulo').isLength({ min:5 }).withMessage('É necessário ter no mínimo 5 caracteres.'),
        check('preco').isCurrency().withMessage('É necessário ser um valor monetário.')

    ],function(request,response){

        erros = validationResult(request);

        if(!erros.isEmpty()){
            response.marko(require('../view/livros/form/form.marko'),
            {
                livro:request.body,
                errosValidacao:erros.array()
            });
        }else{
            const livroDao = new LivroDao(db);

            livroDao.adiciona(request.body)
                .then(response.redirect('/livros'))
                .catch(erro => console.log(erro));
        }
    });
    
    app.put('/livros',function(request,response){

        const livroDao = new LivroDao(db);
        console.log(request.body);
        livroDao.atualiza(request.body)
            .then(response.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id',(request,response) => {
        const id = request.params.id;

        const livroDao = new LivroDao(db);

        livroDao.remove(id)
            .then(() => response.status(200).end())
            .catch(erro => console.log(erro));
    })
}