import express from "express";
import routerEvento from "./src/controllers/EventoController.js";
import routerUsuario from "./src/controllers/UsuarioController.js"
import routerProvincia from "./src/controllers/ProvinciaController.js"

const app =express();
const port=3000;

app.use(express.json());

app.use("/event", routerEvento);
app.use("/user", routerUsuario);
app.use("/provincia", routerProvincia);






app.listen(port,()=>{
    console.log("server is running");
});