const socket = io();

socket.emit("message", "hola me estoy comunicando");
socket.on("evento_socket_individual", (data) => {
  console.log(data);
});
socket.on("evento_para_todos_menos_actual", (data) => {
  console.log(data);
});

socket.on("evento_para_todos", (data) => {
  console.log(data);
});
