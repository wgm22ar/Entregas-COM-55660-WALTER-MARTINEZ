import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import ProductManager from "./ProductManager.js";

const productAll = new ProductManager();

export default class CartManager {
  constructor() {
    this.path = "./src/model/cart.json";
  }
  readCarts = async () => {
    let carts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(carts);
  };

  writeCarts = async (carts) => {
    await fs.writeFile(this.path, JSON.stringify(carts));
  };

  existeId = async (id) => {
    let respuestaId = await this.readCarts();
    return respuestaId.find((cart) => cart.id === id);
  };

  addCart = async () => {
    let originalCart = await this.readCarts();
    let id = nanoid();
    let cartConcat = [{ id: id, products: [] }, ...originalCart];
    await this.writeCarts(cartConcat);
    return "Se ha modificado el Carrito de Productos ";
  };

  getCartById = async (id) => {
    let cartById = await this.existeId(id);
    if (!cartById) return "Carrito no Encontrado";
    return cartById;
  };

  addProductoenCarrito = async (cartId, productId) => {
    let cartById = await this.existeId(cartId);
    if (!cartById) return "Carrito no Encontrado";
    let productById = await productAll.existeId(productId);
    if (!productById) return "Producto no Encontrado";

    let cartAll = await this.readCarts();
    let cartFilter = cartAll.filter((cart) => cart.id != cartId);

    if (cartById.products.some((prod) => prod.id === productId)) {
      let productoEnCarrito = cartById.products.find(
        (prod) => prod.id === productId
      );
      productoEnCarrito.cantidad++;
      let cartsConcat = [cartById, ...cartFilter];
      await this.writeCarts(cartsConcat);
      return "El producto se sumo al Carrito";
    }
    cartById.products.push({ id: productById.id, cantidad: 1 });
    let cartsConcat = [cartById, ...cartFilter];
    await this.writeCarts(cartsConcat);
    return "El producto se agregó al Carrito";
  };
}
