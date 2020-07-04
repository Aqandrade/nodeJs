const LivroController = require('../Controllers/livroController');
const livroController = new LivroController();

const Livro = require('../Model/Livro');

module.exports = (app) =>{
    
    const rotasLivro = LivroController.rotas();
    
    app.get(rotasLivro.lista,livroController.lista());
 
    app.route(rotasLivro.cadastro)
        .get(livroController.formularioCadastro())
        .post(Livro.validacoes(),livroController.cadastra())
        .put(livroController.atualiza());

    app.get(rotasLivro.edicao,livroController.formularioEdicao());

    app.delete(rotasLivro.deleta,livroController.deleta());
}