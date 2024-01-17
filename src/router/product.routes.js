import { Router } from "express";
import ProductManager from "../control/ProductManager.js";

const ProductRoutes = Router();
const producto = new ProductManager();

ProductRoutes.post("/", async (req, res) => {
  let newProduct = req.body;
  res.send(await producto.addProducts(newProduct));
});

ProductRoutes.get("/", async (req, res) => {
  res.send(await producto.getProducts());
});

ProductRoutes.get("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await producto.getProductsById(id));
});

ProductRoutes.delete("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await producto.deleteProductById(id));
});

ProductRoutes.put("/:id", async (req, res) => {
  let id = req.params.id;
  let updateProduct = req.body;
  res.send(await producto.updateProducts(id, updateProduct));
});

export default ProductRoutes;
