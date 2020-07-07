require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const methodOverride = require('method-override');

const template = require('../app/view/template');

app.use('/estatico',express.static('src/app/public'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride(function(req,res) {
    if(req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

const sessaoAutenticacao = require('./sessao-autenticacao');
sessaoAutenticacao(app);

const rotas = require('../app/rotas/rotas.js');
rotas(app);

// app.use(function(request,response,next){
//     return response.status(404).marko(
//         require(template.base.erro404)
//     );
// });

// app.use(function(error,request,response,next) {
//     return response.status(500).marko(
//         require(template.base.erro500)
//     );
// });

module.exports = app;