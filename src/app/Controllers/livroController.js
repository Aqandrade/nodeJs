const { validationResult } = require('express-validator/check');

const LivroDao = require('../infra/livro-dao');

const db = require('../../config/database');

const template = require('../view/template');


class LivroController{

    static rotas(){
        return {
            autenticadas:   '/livros*',
            lista:          '/livros',
            cadastro:       '/livros/form',
            edicao:         '/livros/form/:id',
            cadastra:       '/livros/form',
            edita:          '/livros/form',
            deleta:         '/livros/:id'
        }
    }

    lista(){
        return function(request,response){

            const livroDao = new LivroDao(db);

            livroDao.lista()
                .then(livros => response.marko(template.livro.lista,{
                    livros
                }))
                .catch(erro => console.log(erro));
        }
    }

    formularioCadastro(){
        return function(request,response){
            response.marko(template.livro.form,
            {
                livro:{}
            })
        }
    }

    formularioEdicao(){
        return function(request,response){
            const id = request.params.id;
            const livroDao = new LivroDao(db)
    
            livroDao.buscaPorId(id)
                .then(livro => {
                    response.marko(
                        template.livro.form,
                        {
                            livro:livro
                        }
                    );
                })
                .catch(erro => console.log(erro));
        }
    }

    cadastra(){
        return function(request,response){

            const erros = validationResult(request);
    
            if(!erros.isEmpty()){
                response.marko(template.livro.form,
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
        }
    }

    atualiza(){
        return function(request,response){
            
            const livroDao = new LivroDao(db);
            
            livroDao.atualiza(request.body)
                .then(response.redirect('/livros'))
                .catch(erro => console.log(erro));
        }
    }

    deleta(){
        return function(request,response){
                const id = request.params.id;

                const livroDao = new LivroDao(db);

                livroDao.remove(id)
                    .then(() => response.status(200).end())
                    .catch(erro => console.log(erro));
        }
    }

}

module.exports = LivroController;