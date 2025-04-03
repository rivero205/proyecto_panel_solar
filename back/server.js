// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

// Iniciar servidor
const PORT = 4500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puertos:${PORT}`);
});
