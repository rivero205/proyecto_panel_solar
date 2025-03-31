// routes.js
const express = require('express');
const router = express.Router();
const db = require('./database');

// Clave de autenticación para el NodeMCU
const NODEMCU_KEY = 'secreta-clave-nodemcu';

// Obtener todos los datos del panel solar
router.get('/datos', (req, res) => {
    db.query('SELECT * FROM datos_panel', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Insertar datos solo si provienen del NodeMCU
router.post('/datos', (req, res) => {
    const authKey = req.headers['x-api-key'];
    if (authKey !== NODEMCU_KEY) {
        return res.status(403).json({ error: 'Acceso denegado' });
    }
    
    const { voltaje, potencia, carga } = req.body;
    if (!voltaje || !potencia || !carga) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO datos_panel (voltaje, potencia, carga) VALUES (?, ?, ?)';
    db.query(query, [voltaje, potencia, carga], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Datos insertados con éxito', id: result.insertId });
    });
});

module.exports = router;
