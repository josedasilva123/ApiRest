require('dotenv').config();
const express = require('express');

const cors = require('cors');

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

//Resolvendo erros de CORS
app.use(cors());

//const exampleRoutes = require('./routes/example');

const googleSheets = require('./routes/googlesheets')
const formEmail = require('./routes/email')

//app.use('/example', exampleRoutes);
app.use('/sheets', googleSheets);
app.use('/email', formEmail);

app.listen(port, () => {
    console.log('[SERVER] API iniciou com sucesso!')
});