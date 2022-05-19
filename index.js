require('dotenv').config();
const express = require('express');
const app = express();

//Configuração de variável de ambiente para Heroku
const port = process.env.PORT || 3030;

//Métodos para o req.body funcionar
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

//const exampleRoutes = require('./routes/example');

const googleSheets = require('./routes/googlesheets')

//app.use('/example', exampleRoutes);
app.use('/sheets', googleSheets);

app.listen(port, 'localhost', () => {
    console.log('[SERVER] API iniciou com sucesso!')
});