const LivroController = require('../Controllers/livroController');
const livroController = new LivroController();

const Livro = require('../Model/Livro');

const BaseController = require('../Controllers/baseController');

module.exports = (app) =>{
    
    const rotasLivro = LivroController.rotas();
    
    app.use(rotasLivro.autenticadas,function(request,response,next){
        if(request.isAuthenticated()){
            next();
        }else{
            response.redirect(BaseController.rotas().home);            
        }
    });

    app.get(rotasLivro.lista,livroController.lista());
 
    app.route(rotasLivro.cadastro)
        .get(livroController.formularioCadastro())
        .post(Livro.validacoes(),livroController.cadastra())
        .put(livroController.atualiza());

    app.get(rotasLivro.edicao,livroController.formularioEdicao());

    app.delete(rotasLivro.deleta,livroController.deleta());
}