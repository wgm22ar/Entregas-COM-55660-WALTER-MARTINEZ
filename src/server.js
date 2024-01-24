import express from "express";
import ProductRoutes from "./router/product.routes.js";
import CartRoutes from "./router/cart.routes.js";
import { engine } from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";
import ProductManager from "./control/ProductManager.js";

const app = express();
const port = 8080;
const producto = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

app.use("/", express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  let todosProductos = await producto.getProducts();
  res.render("home", {
    title: "E-commerce BackEnd",
    products: todosProductos,
  });
});

app.get("/:id", async (req, res) => {
  let productosId = await producto.getProductsById(req.params.id);
  res.render("prod", {
    title: "E-commerce BackEnd",
    products: productosId,
  });
});
app.use("/api/productos", ProductRoutes);
app.use("/api/cart", CartRoutes);

app.listen(port, () => {
  console.log(`Se ha creado el servidor en el Puerto: ${port}`);
});
