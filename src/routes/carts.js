import { Router } from 'express';
import CartManager from '../managers/CartManager.js';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const cartManager = new CartManager('./data/carts.json');
const productManager = new ProductManager('./data/products.json');

// Ruta GET /:cid - Listar productos del carrito
router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getById(req.params.cid);
  if (!cart) {
    return res.status(404).send('Cart not found');
  }

  res.json(cart.products);
});

// Ruta POST /:cid/product/:pid - Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const product = await productManager.getById(req.params.pid);
  if (!product) {
    return res.status(404).send('Product not found');
  }

  const updatedCart = await cartManager.addProductToCart(req.params.cid, product);
  if (!updatedCart) {
    return res.status(404).send('Cart not found');
  }

  res.status(200).json(updatedCart);
});

export default router;
