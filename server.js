//arquivo principal da API e aqui vamos incluir as informacoes de servico de transicao http utilizando a biblioteca HTTP
const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port)