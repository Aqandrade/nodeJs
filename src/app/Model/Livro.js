const { check } = require('express-validator/check');

class Livro{
    
    static validacoes(){
        return [
            check('titulo').isLength({ min:5 }).withMessage('É necessário ter no mínimo 5 caracteres.'),
            check('preco').isCurrency().withMessage('É necessário ser um valor monetário.')
        ];
    }
}


module.exports = Livro;