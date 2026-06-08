import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

const inventory = [
  { id: 'colombia-huila', name: 'Colombia Huila', stock: 18, status: 'Disponible' },
  { id: 'blend-latinoamericano', name: 'Blend Latinoamericano', stock: 24, status: 'Disponible' },
  { id: 'arabica-100', name: 'Arábico 100%', stock: 15, status: 'Disponible' },
  { id: 'blend-brasileno', name: 'Blend Brasileño', stock: 20, status: 'Disponible' },
  { id: 'robusta', name: 'Robusta', stock: 12, status: 'Disponible' },
];

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'Lambert Coffee local fullstack', mode: process.env.NODE_ENV || 'local' });
});

app.get('/api/inventory', (_request, response) => {
  response.json({ updatedAt: new Date().toISOString(), products: inventory });
});

app.post('/api/orders', (request, response) => {
  const orderNumber = `LC-${Date.now().toString().slice(-8)}`;

  response.status(201).json({
    ok: true,
    orderNumber,
    trackingUrl: `https://tracking.lambertcoffee.local/${orderNumber}`,
    message: 'Pedido recibido en modo local. Configura pasarelas reales para producción.',
    received: request.body,
  });
});

app.use(express.static(distPath));

app.get('*', (_request, response) => {
  response.sendFile(indexPath);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Lambert Coffee fullstack local listo en http://localhost:${port}`);
});
