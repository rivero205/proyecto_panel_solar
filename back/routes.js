const express = require('express');
const router = express.Router();
const db = require('./database');


// Endpoint de bienvenida
router.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API del panel solar' });
});

// Obtener todos los datos de todas las estaciones
router.get('/datos', (req, res) => {
    db.query('SELECT * FROM datos_panel ORDER BY fecha_registro DESC', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Obtener datos de una estación específica
router.get('/datos/:id_estacion', (req, res) => {
    const { id_estacion } = req.params;
    db.query(
        'SELECT * FROM datos_panel WHERE id_estacion = ? ORDER BY fecha_registro DESC',
        [id_estacion],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(results);
        }
    );
});

// Insertar datos solo si provienen del NodeMCU
router.post('/datos', (req, res) => {
    
    const { 
        id_estacion,
        voltaje_panel, 
        voltaje_bateria, 
        estado_carga, 
        luz_solar, 
        potencia_almacenada,
        usuarios_totales
    } = req.body;

    // Validación de campos
    if (!id_estacion || !voltaje_panel || !voltaje_bateria || 
        estado_carga === undefined || luz_solar === undefined || 
        !potencia_almacenada || usuarios_totales === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = `
        INSERT INTO datos_panel (
            id_estacion, voltaje_panel, voltaje_bateria, 
            estado_carga, luz_solar, potencia_almacenada, 
            usuarios_totales
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [
        id_estacion,
        voltaje_panel, 
        voltaje_bateria, 
        estado_carga, 
        luz_solar,
        potencia_almacenada,
        usuarios_totales
    ], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ 
            message: 'Datos insertados con éxito',
            id_estacion: id_estacion
        });
    });
});

// Obtener últimas lecturas de todas las estaciones
router.get('/ultimas-lecturas', (req, res) => {
    const query = `
        SELECT t1.*
        FROM datos_panel t1
        INNER JOIN (
            SELECT id_estacion, MAX(fecha_registro) as max_fecha
            FROM datos_panel
            GROUP BY id_estacion
        ) t2
        ON t1.id_estacion = t2.id_estacion
        AND t1.fecha_registro = t2.max_fecha
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

module.exports = router;