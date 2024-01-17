import express from "express";
import ProductRoutes from "./router/product.routes.js";
import CartRoutes from "./router/cart.routes.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", ProductRoutes);
app.use("/api/cart", CartRoutes);

app.listen(port, () => {
  console.log(`Se ha creado el servidor en el Puerto: ${port}`);
});
