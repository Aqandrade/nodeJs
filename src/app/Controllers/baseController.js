const template = require('../view/template')

class BaseController{

    static rotas(){
        return {
            home: '/'
        };
    }

    home(){
        return function(request,response){
            response.marko(template.base.home);
        }
    }

}


module.exports = BaseController;