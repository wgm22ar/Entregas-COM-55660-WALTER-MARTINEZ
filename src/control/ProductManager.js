import { json } from "express";
import { promises as fs } from "fs";
import { nanoid } from "nanoid";

export default class ProductManager {
  constructor() {
    this.path = "./src/model/products.json";
  }

  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products);
  };

  writeProduct = async (producto) => {
    await fs.writeFile(this.path, JSON.stringify(producto));
  };

  existeId = async (id) => {
    let respuestaId = await this.readProducts();
    return respuestaId.find((product) => product.id === id);
  };

  addProducts = async (producto) => {
    let originalArray = await this.readProducts();
    producto.id = nanoid();
    let productosTotales = [...originalArray, producto];
    await this.writeProduct(productosTotales);
    return "Se ha agragado el producto a la DB";
  };

  getProducts = async () => {
    return await this.readProducts();
  };

  getProductsById = async (id) => {
    let productsById = await this.existeId(id);
    if (!productsById) return "Producto no Encontrado";
    return productsById;
  };

  deleteProductById = async (id) => {
    let deleteById = await this.readProducts();
    let productoAeliminar = deleteById.some((product) => product.id === id);
    if (productoAeliminar) {
      let deleteFilter = deleteById.filter((product) => product.id != id);
      await this.writeProduct(deleteFilter);
      return "El producto indicado ha sido eliminado de la BD";
    }
    return "El producto que quiere eliminar no existe";
  };

  updateProducts = async (id, product) => {
    let productsById = await this.existeId(id);
    if (!productsById) return "Producto no Encontrado";
    await this.deleteProductById(id);
    let originalArray = await this.readProducts();
    let products = [{ ...product, id: id }, ...originalArray];
    await this.writeProduct(products);
    return "El producto se ha actualizado correctamente";
  };
}
