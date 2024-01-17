import { Router } from "express";
import CartManager from "../control/CartManager.js";

const CartRoutes = Router();
const cart = new CartManager();

CartRoutes.post("/", async (req, res) => {
  res.send(await cart.addCart());
});

CartRoutes.get("/", async (req, res) => {
  res.send(await cart.readCarts());
});

CartRoutes.get("/:id", async (req, res) => {
  res.send(await cart.getCartById(req.params.id));
});

CartRoutes.post("/:cid/productos/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  res.send(await cart.addProductoenCarrito(cartId, productId));
});

export default CartRoutes;
