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

const exampleRoutes = require('./routes/example');

app.use('/example', exampleRoutes);

app.listen(3030, 'localhost', () => {
    console.log('[SERVER] Api started width sucess!')
} );