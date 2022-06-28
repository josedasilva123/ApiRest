require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

//Configuração de variável de ambiente para Heroku
const port = process.env.PORT || 3030;

app.use(cors());  

//Métodos para o req.body funcionar
app.use(
    express.urlencoded({
        extended: true,
    })
)

//Resolvendo erros de CORS

/*
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");      
    next();   
});
*/

app.use(express.json());


//const exampleRoutes = require('./routes/example');
const googleSheets = require('./routes/googlesheets')
const formEmail = require('./routes/email')

//app.use('/example', exampleRoutes);
app.use('/sheets', googleSheets);
app.use('/email', formEmail);

app.listen(port, () => {
    console.log('[SERVER] API iniciou com sucesso!')
});