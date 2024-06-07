import express from "express";
import {LocalidadService} from "../servicios/LocalidadService.js";
import AuthMiddleware from "../auth/authMiddleware.js";

const LocalService = new LocalidadService();

const router = express.Router();

router.get("/", async (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    try {
      const Localidades = await LocalService.getLocalidades(limit, offset);
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

router.get("/:id/event-location", AuthMiddleware ,async (req,res)=>{
  const id=req.params.id;
  const limit = req.query.limit;
  const offset = req.query.offset;
  try {
    if (await LocalService.getLocalidadById(id)!=null) {
      const collection = await LocalService.getEvLocByLocalidad(id,limit, offset);
      return res.status(200).json(collection);
    }else{
      return res.status(404).send("NOT FOUND")
    }
    
  } catch (error) {
    console.log(error);
    return res.json(error);
  }

}); 
    

export default router;
