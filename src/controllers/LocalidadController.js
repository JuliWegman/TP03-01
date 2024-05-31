import express from "express";
import {LocalidadService} from "../servicios/LocalidadService.js";
import AuthMiddleware from "../auth/authMiddleware.js";

const LocalService = new LocalidadService();

const router = express.Router();

router.get("/", async (req, res) => {
    const pageSize = req.query.pageSize;
    const reqPage = req.query.reqPage;
    try {
      const Localidades = await LocalService.getLocalidades(pageSize, reqPage);
      return res.status(200).json(Localidades);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
});


router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const LocalidadById = await LocalService.getLocalidadById(id);
    if (LocalidadById!=null) {
      return res.status(200).json(LocalidadById);
    }else{
      return res.status(401).json("No existe la id");
  
    }
  } catch (error) {
    console.log(error);
      return res.json(error);
  }
});
    

export default router;
