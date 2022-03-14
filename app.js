const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')


const rotasProdutos = require('./routes/produtos');
const rotasPedidos = require('./routes/pedidos')
const rotasUsuarios = require('./routes/usuarios')

app.use(morgan('dev'));
app.use('/uploads', express.static(`uploads`))
app.use(bodyParser.urlencoded({extended: false})); // apenas aceitar dados simples
app.use(bodyParser.json()) // json de entradano body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'),
    res.header(
            'Access-Control-Allow-Header',
             'Origin, X-Requrested-With, Content-Type, Authorization'
             );
    if(req.method === 'OPTIONS'){
        res.heade('Acess-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({})
    }
    next();
});

app.use('/produtos', rotasProdutos);
app.use('/pedidos', rotasPedidos)
app.use('/usuarios', rotasUsuarios)

// Quando nao encontra uma rota...
app.use((req, res, next) => {
    const erro = new Error('Nao encontrado');
    erro.status = 404;
    next(erro)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
});

module.exports = app;