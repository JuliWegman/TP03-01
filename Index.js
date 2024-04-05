import express from "express";
import routerEvento from "./src/controllers/EventoController.js";
import routerUsuario from "./src/controllers/UsuarioController.js"

const app =express();
const port=3000;

app.use(express.json());

app.use("/event", routerEvento);
app.use("/user", routerUsuario);





app.listen(port,()=>{
    console.log("server is running");
});