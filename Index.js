import express from "express";
import routerEvento from "./src/controllers/EventoController.js";
import routerUsuario from "./src/controllers/UsuarioController.js";
import routerProvincia from "./src/controllers/ProvinciaController.js";
import { BDconfig } from "./src/configs/BD.js";
import "dotenv/config"

const app = express();
app.use(express.json());

app.use("/event", routerEvento);
app.use("/user", routerUsuario);
app.use("/provincia", routerProvincia);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});

