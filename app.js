const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')


const routesProducts = require('./routes/products');
const routesOrders = require('./routes/orders')
const routesUsers = require('./routes/users')
const routesImage = require('./routes/image')
const routesCategories = require('./routes/category')
const routerOrdersItem = require('./routes/cartItem')

app.use(morgan('dev'));
app.use('/uploads', express.static(`uploads`))
app.use(bodyParser.urlencoded({extended: false})); // apenas aceitar dados simples
app.use(bodyParser.json()) // json de entradano body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, , DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

app.use('/products', routesProducts);
app.use('/orders', routesOrders)
app.use('/users', routesUsers)
app.use('/images', routesImage)
app.use('/categories', routesCategories)
app.use('/ordersItem', routerOrdersItem)

// Quando nao encontra uma rota...
app.use((req, res, next) => {
    const erro = new Error('Nao encontrado');
    erro.status = 404;
    next(erro)
});
app.use(cors({
    allowedHeaders:'*',
    origin:'*'
  }))

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
});

module.exports = app;