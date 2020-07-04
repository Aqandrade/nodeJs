const livroRotas = require('./livroRotas');

const baseRotas = require('./baseRotas');

module.exports = (app) =>{

    baseRotas(app);

    livroRotas(app);

}