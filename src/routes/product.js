import { Router } from 'express';

const router = Router();

// Base de datos de ejemplo
let products = [
  { id: 1, title: "Manzanas", description: "Fruta fresca", code: "A001", price: 50, status: true, stock: 100, category: "Frutas", thumbnails: [] },
  { id: 2, title: "Leche", description: "Leche entera", code: "L002", price: 120, status: true, stock: 200, category: "Lácteos", thumbnails: [] },
  { id: 3, title: "Arroz", description: "Arroz integral", code: "R003", price: 90, status: true, stock: 150, category: "Granos", thumbnails: [] },
  { id: 4, title: "Pan", description: "Pan de molde", code: "P004", price: 60, status: true, stock: 50, category: "Panadería", thumbnails: [] }
];

// Ruta raíz GET /
router.get('/', (req, res) => {
  const { limit } = req.query;

  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit, 10));
    return res.status(200).json(limitedProducts);
  }

  res.status(200).json(products);
});

// Ruta GET /:pid
router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid, 10);

  // Buscar el producto con el id proporcionado
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(200).json(product);
});

// Ruta POST /
// Agrega un nuevo producto
router.post('/', (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  // Validar que todos los campos sean proporcionados, excepto thumbnails
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'All fields are required except thumbnails' });
  }

  // Generar un ID únic

  const newId = products.length ? products[products.length - 1].id + 1 : 1;

  // Crear el nuevo producto
  const newProduct = {
    id: newId,
    title,
    description,
    code,
    price,
    status: true, 
    stock,
    category,
    thumbnails: thumbnails || [] 

  // Agregar el nuevo producto a la base de datos
  products.push(newProduct);

  // Responder con el producto agregado
  res.status(201).json(newProduct);
});

// Ruta PUT /:pid
// Actualiza un producto con el id proporcionado
router.put('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid, 10);
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  // Buscar el producto con el id proporcionado
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Actualizar el producto manteniendo el id
  products[productIndex] = {
    ...products[productIndex],
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails: thumbnails || products[productIndex].thumbnails 
  };

  res.status(200).json(products[productIndex]);
});

// Ruta DELETE /:pid
// Elimina un producto con el id proporcionado
router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid, 10);

  // Buscar el índice del producto con el id proporcionado
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Eliminar el producto de la base de datos
  products.splice(productIndex, 1);

  res.status(200).json({ message: 'Product deleted successfully' });
});

export default router;
