import express from "express";
import {
  UsuarioService
} from "../servicios/UsuarioService.js";

const router = express.Router();
const UserService = new UsuarioService();


router.post("/login", (req, res) => {
  const pass = req.query.password;
  const user = req.query.username;
  try {
    const token = UserService.login(user, pass);
    return res.json(token);
  } catch (error) {
    return res.json("error");
  }
});

router.post("/register", (req, res) => {
  const user = {};
  user.first_name = req.query.first_name;
  user.last_name = req.query.last_name;
  user.username = req.query.username;
  user.password = req.query.password;

  //arreglar body

  UserService.register(user);
  return res.status(201).send(user);
});

export default router;
