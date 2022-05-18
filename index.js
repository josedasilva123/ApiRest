require('dotenv').config();
const express = require('express');
const app = express();

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

app.listen(3030, 'localhost', () => {
    console.log('[SERVER] API iniciou com sucesso!')
});