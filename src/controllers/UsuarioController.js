import express from "express";
import {UsuarioService1, UsuarioService2} from "../servicios/UsuarioService.js";

const router = express.Router();
const UserService1= new UsuarioService1();
const UserService2= new UsuarioService2();

const usuario = {
  first_name: "huevo",
  last_name: "wegman", 
  username: "juli",
  password: "huevo2007"
}


router.post("/login", (req, res) => {
    const pass = req.query.password;
    const user = req.query.username;
    try {
      const token=UserService1.login(user,pass);
      return res.json(token);
    } catch (error) {
      return res.json("error");
    }
  });

router.post("/register", (req, res) => {
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const username = req.query.username;
  const password = req.query.password;

  //arreglar body
  
  UserService2.register(first_name,last_name,username,password);
  return res.status(201).send({first_name,
    last_name,
    username ,
    password });
});


  





export default router;