import express from "express";
import {UsuarioService1} from "../servicios/UsuarioService.js";

const router = express.Router();
const UserService1= UsuarioService1();

router.post("/", (req, res) => {
    const body = req.body;
    console.log(body);
    return res.status(201).send({
      id: 4,
      name: body.name,
      price: body.price,
    });
  });
  





export default controller;