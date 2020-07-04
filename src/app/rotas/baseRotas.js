const BaseController = require('../Controllers/baseController');
const baseController = new BaseController();

module.exports = (app) =>{

    const rotasBase = BaseController.rotas();

    app.get(rotasBase.home,baseController.home());
}