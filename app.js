const express = require('express');
const app = express();
const morgan = require('morgan');


const rotasProdutos = require('./routes/produtos');
const rotasPedidos = require('./routes/pedidos')

app.use(morgan('dev'));
app.use('/produtos', rotasProdutos);
app.use('/pedidos', rotasPedidos)

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