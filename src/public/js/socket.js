const socket = io();

/*socket.emit("message", "hola me estoy comunicando");
socket.on("evento_socket_individual", (data) => {
  console.log(data);
});
socket.on("evento_para_todos_menos_actual", (data) => {
  console.log(data);
});

socket.on("evento_para_todos", (data) => {
  console.log(data);
});*/
// const realTimeProducts = io();
let productToAdd;

let productTitle = document.getElementById("productToAddTitle");
let productPrice = document.getElementById("productToAddPrice");
let productCode = document.getElementById("productToAddCode");
let productStock = document.getElementById("productToAddStock");
let productStatus = document.getElementById("productToAddStatus");
let productCategory = document.getElementById("productToAddCategory");
let productThumbnails = document.getElementById("productToAddThumbnails");
let productDescription = document.getElementById("productToAddDescription");
let submitButton = document.getElementById("submitButton");
let deleteButton = document.getElementById("deleteButton");
let productToBeDeleteId = document.getElementById("productToBeDeleteId");

function handleSubmitButtonClick(e) {
  productToAdd = {
    title: productTitle.value,
    description: productDescription.value,
    code: productCode.value,
    price: productPrice.value,
    stock: productStock.value,
    category: productCategory.value,
    thumbnails: productThumbnails.value,
  };
  socket.emit("Product database update", productToAdd);
}
submitButton.addEventListener("click", handleSubmitButtonClick);

socket.on("real time products update", (data) => {
  const productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = "";

  data.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
      <h4>${product.title}</h4>
      <p>Precio: ${product.price}</p>
      <p>Description: ${product.description}</p>
      <p>Category: ${product.category}</p>
      <p>ID: ${product.id}</p>
      <br>
    `;
    productsContainer.appendChild(productElement);
  });
});

function handleDeleteButtonClick(e) {
  //esto funciona!

  let id = productToBeDeleteId.value;
  // console.log('este es el id a ver')
  // console.log(id)
  socket.emit("product deleted", id);
}

deleteButton.addEventListener("click", handleDeleteButtonClick);
