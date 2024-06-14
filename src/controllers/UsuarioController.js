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

    if(token!="Usuario o Contraseña no existen"){
    return res.status(200).json({
      "succes":true,
      "message":"Logueado correctamente",
      "token":token});
    }else{
      return res.status(401).json({
        "succes":false,
        "message":"Logueado correctamente",
        "token":""});
    }
  } catch (error) {
    return res.json(error);
  }
});

router.post("/register", async (req, res) => {
  const user = {};
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.username = req.body.username;
  user.password = req.body.password;

  const mailish = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    if (user.first_name!=null && user.last_name!=null && user.password!=null && user.username!=null) {

      if(user.first_name.length>=3 && user.last_name.length>=3 && user.password.length>=3){

        if(mailish.test(user.username)){
          
           await UserService.register(user);
           return res.status(201).send("created")
  
        }else{
          return res.status(400).json("Mail incorrecto")
  
        }
      }else{
        return res.status(400).json("Nombre, apellido y contraseña deben tener más de 3 caracteres")
      }
    }else{
      return res.status(400).json("Alguno de los campos esta incompleto");
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;
