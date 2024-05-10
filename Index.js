import express from "express";
import routerEvento from "./src/controllers/EventoController.js";
import routerUsuario from "./src/controllers/UsuarioController.js";
import routerProvincia from "./src/controllers/ProvinciaController.js";
import { BDconfig } from "./src/configs/BD.js";

const app = express();
app.use(express.json());
const port=3000;

app.use("/event", routerEvento);
app.use("/user", routerUsuario);
app.use("/provincia", routerProvincia);

app.listen(port, () => {
  console.log("server is running");
});

