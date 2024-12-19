import fs from 'fs/promises';

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAll() {
    const data = await fs.readFile(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  async getById(id) {
    const products = await this.getAll();
    return products.find(p => p.id === id);
  }

  async create(product) {
    const products = await this.getAll();
    const newProduct = { id: `${Date.now()}`, ...product };
    products.push(newProduct);
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async update(id, updates) {
    const products = await this.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates };
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    return products[index];
  }

  async delete(id) {
    const products = await this.getAll();
    const filteredProducts = products.filter(p => p.id !== id);
    await fs.writeFile(this.filePath, JSON.stringify(filteredProducts, null, 2));
  }
}

export default ProductManager;
