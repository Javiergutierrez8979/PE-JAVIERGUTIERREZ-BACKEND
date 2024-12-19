import fs from 'fs/promises';

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAll() {
    const data = await fs.readFile(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  async getById(id) {
    const carts = await this.getAll();
    return carts.find(c => c.id === id);
  }

  async create() {
    const carts = await this.getAll();
    const newCart = { id: `${Date.now()}`, products: [] };
    carts.push(newCart);
    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async addProductToCart(cartId, product) {
    const carts = await this.getAll();
    const cart = carts.find(c => c.id === cartId);
    if (!cart) return null;

    // Verificar si el producto ya está en el carrito
    const productIndex = cart.products.findIndex(p => p.id === product.id);
    if (productIndex === -1) {
      cart.products.push({ id: product.id, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }

    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    return cart;
  }
}

export default CartManager;
