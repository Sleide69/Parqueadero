const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000; // Usa el puerto del entorno o 3000 por defecto

// Configuración de seguridad con Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:'],
      },
    },
  })
);

// Middleware para CORS y parseo de solicitudes
app.use(cors());
app.use(express.json());
app.use(express.text({ type: 'application/xml' }));

// Crear la carpeta 'reservas' si no existe
const reservasDir = path.join(__dirname, 'reservas');
if (!fs.existsSync(reservasDir)) {
  fs.mkdirSync(reservasDir);
}

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor de reservas activo');
});

// Endpoint para manejar reservas en formato JSON
app.post('/api/reservas/json', (req, res) => {
  try {
    console.log('Datos JSON recibidos:', req.body);

    const { usuario, vehiculo, espacio, fecha } = req.body;
    if (!usuario || !vehiculo || !espacio || !fecha) {
      return res.status(400).json({ error: 'Faltan datos obligatorios en la reserva.' });
    }

    const filePath = path.join(reservasDir, `${usuario}_${Date.now()}_reserva.json`);
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));

    res.status(201).json({ message: 'Reserva JSON guardada exitosamente', path: filePath });
  } catch (error) {
    console.error('Error al procesar reserva JSON:', error);
    res.status(500).json({ error: 'Error interno del servidor al procesar la reserva JSON.' });
  }
});

// Endpoint para manejar reservas en formato XML
app.post('/api/reservas/xml', (req, res) => {
  try {
    console.log('Datos XML recibidos:', req.body);

    const xmlData = req.body;
    if (!xmlData.includes('<usuario>') || !xmlData.includes('<vehiculo>') || !xmlData.includes('<espacio>') || !xmlData.includes('<fecha>')) {
      return res.status(400).json({ error: 'Faltan datos obligatorios en la reserva XML.' });
    }

    const filePath = path.join(reservasDir, `${Date.now()}_reserva.xml`);
    fs.writeFileSync(filePath, xmlData);

    res.status(201).json({ message: 'Reserva XML guardada exitosamente', path: filePath });
  } catch (error) {
    console.error('Error al procesar reserva XML:', error);
    res.status(500).json({ error: 'Error interno del servidor al procesar la reserva XML.' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
