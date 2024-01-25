import express from "express";
import ProductRoutes from "./router/product.routes.js";
import CartRoutes from "./router/cart.routes.js";
import { engine } from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";
import ProductManager from "./control/ProductManager.js";
import { Server } from "socket.io";

const app = express();
const port = 8080;
const producto = new ProductManager();

const httpServer = app.listen(port, () => {
  console.log(`Se ha creado el servidor en el Puerto: ${port}`);
});

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  let todosProductos = await producto.getProducts();
  res.render("home", {
    title: "E-commerce BackEnd",
    products: todosProductos,
  });
});

/*app.get("/:id", async (req, res) => {
  let productosId = await producto.getProductsById(req.params.id);
  res.render("prod", {
    title: "Producto seleccionado",
    products: productosId,
  });
});*/
app.use("/api/productos", ProductRoutes);
app.use("/api/cart", CartRoutes);

/*app.use("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts", {
    title: "Socket io",
  });
});*/

app.get("/realTimeProducts", async (req, res) => {
  let allProductos = await producto.getProducts();
  res.render("realTimeProducts", {
    title: "Socket io",
    productos: allProductos,
  });
});

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("Product database update", async (data) => {
    await producto.createNewProduct(data);
    let updatedCart = await producto.getProducts();

    socketServer.emit("real time products update", updatedCart);
  });

  socket.on("product deleted", async (data) => {
    await producto.getProducts(data);
    let id = data;
    await producto.deleteProductById(id);
    let newProductos = await producto.getProducts();

    socketServer.emit("real time products update", newProductos);
  });
});

// socketServer.on("connection", (socket) => {
//   console.log("Nuevo cliente conectado");

//   socket.on("message", (data) => {
//     console.log(data);
//   });
//   socket.emit(
//     "evento_socket_individual",
//     "este mensaje lo debe recibir el socket actual"
//   );

//   socket.broadcast.emit(
//     "evento_para_todos_menos_actual",
//     "Se conecto otro cliente"
//   );

//   socketServer.emit(
//     "evento_para_todos",
//     "este evento es escuchados por todos los usuarios conectados"
//   );
// });
