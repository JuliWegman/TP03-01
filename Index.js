import express from "express";
import router from "./src/controllers/EventoController.js";

const app =express();
const port=3000;

app.use(express.json());

app.use("/event", router);





app.listen(port,()=>{
    console.log("server is running");
});