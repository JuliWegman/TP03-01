import express from "express";
import {
  UsuarioService
} from "../servicios/UsuarioService.js";

const router = express.Router();
const UserService = new UsuarioService();


router.post("/login", async (req, res) => {
  const pass = req.body.password;
  const user = req.body.username;
  try {
    const token = await UserService.login(user, pass);
    return res.json(token);
  } catch (error) {
    return res.json(error);
  }
});

router.post("/register", async (req, res) => {
  const user = {};
  user.first_name = req.query.first_name;
  user.last_name = req.query.last_name;
  user.username = req.query.username;
  user.password = req.query.password;
  try {
    const mensaje = await UserService.register(user);
    return res.json(mensaje);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;
