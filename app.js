import express from 'express';
import productRoutes from './src/routes/product.js';
import cartRoutes from './src/routes/carts.js';

const app = express();
const PORT = 8080;

// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

// Definir las rutas
app.use('/api/products', productRoutes); // Rutas para productos
app.use('/api/carts', cartRoutes); // Rutas para carritos

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Carritos y Productos!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
