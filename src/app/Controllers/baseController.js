const template = require('../view/template');
const { response } = require('express');

const LivroController = require('./livroController');

class BaseController{

    static rotas(){
        return {
            home: '/',
            login: '/login'
        };
    }

    home(){
        return function(request,response){
            response.marko(template.base.home);
        }
    }

    login(){
        return function(request,response){
            response.marko(template.base.login);
        }
    }

    efetuaLogin(){
        return function(request,response,next){
            const passport = request.passport;
            passport.authenticate('local', (erro,usuario,info) => {
                if(info) {
                    return resp.marko(template.base.login);
                }

                if(erro) {
                    return next(erro);
                }

                request.login(usuario,(erro) => {
                    if(erro){
                        return next(erro);
                    }

                    return response.redirect(LivroController.rotas().lista); 
                });
            })(request,response,next);
        };

    }

}


module.exports = BaseController;