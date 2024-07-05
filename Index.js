import express from "express";
import routerEvento from "./src/controllers/EventoController.js";
import routerUsuario from "./src/controllers/UsuarioController.js";
import routerProvincia from "./src/controllers/ProvinciaController.js";
import routerLocalidad from './src/controllers/LocalidadController.js'
import routerCategoria from './src/controllers/CategoryController.js'
import routerEventLocation from './src/controllers/Event-LocationController.js'
import "dotenv/config"

const app = express();
app.use(express.json());


app.use("/api/event", routerEvento);
app.use("/api/user", routerUsuario);
app.use("/api/province", routerProvincia);
app.use("/api/location", routerLocalidad);
app.use("/api/event-category", routerCategoria);
app.use("/api/event-location",routerEventLocation);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});

