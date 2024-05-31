import express from "express";
import {
  ProvinciaService
} from "../servicios/ProvinciaService.js";

import AuthMiddleware from "../auth/authMiddleware.js";


const router = express.Router();
const ProvService = new ProvinciaService();


router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize;
  const reqPage = req.query.reqPage;
  try {
    const provincias = await ProvService.getProvincias(pageSize, reqPage);
    return res.status(200).json(provincias);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.get("/:id", async (req, res) => {
  const id=req.params.id
  try {
    const provincia = await ProvService.getProvinciaById(id);
    if (provincia!=null) {
      return res.status(200).json(provincia);
    }else{
      return res.status(404).json("No existe la id");

    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.get("/:id/locations", async (req, res) => {
  const pageSize = req.query.pageSize;
  const reqPage = req.query.reqPage;
  const id=req.params.id
  try {
    const localidades = await ProvService.getLocalidadesByProvincia(id);
    if (provincia!=null) {
      return res.status(200).json(localidades);
    }else{
      return res.status(401).json("No existe la id");

    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.post("/",async (req, res) =>{
  const Provincia={}
  Provincia.name=req.body.name
  Provincia.full_name=req.body.full_name
  Provincia.latitude=req.body.latitude
  Provincia.longitude=req.body.longitude
  Provincia.display_order=req.body.display_order

  try {
    if(Provincia.name!=null && Provincia.full_name!=null && Provincia.latitude!=null && Provincia.longitude!=null && Provincia.display_order!=null){

      if(!(Number.isNaN(Provincia.latitude)) && !(Number.isNaN(Provincia.longitude) && Provincia.name.length>3)){

        const respuesta = await ProvService.InsertProvincia(Provincia);
        return res.status(201).json(respuesta);

      }else{
        return res.status(400).send("Algun dato esta mal");
      }
    }else{
      return res.status(400).send("Faltan datos");
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
})

router.put("/" , async(req, res) => {
  const Provincia = {};
  Provincia.name = req.body.name;
  Provincia.full_name = req.body.full_name;
  Provincia.latitude = req.body.latitude;
  Provincia.longitude = req.body.longitude;
  Provincia.display_order = req.body.display_order;
  Provincia.id = req.body.id;
  try {
    const Prov=await ProvService.getProvinciaById(Provincia.id)

    if(Prov!=null){
      if(Provincia.name!=null && Provincia.full_name!=null && Provincia.latitude!=null && Provincia.longitude!=null && Provincia.display_order!=null){

        if(!(Number.isNaN(Provincia.latitude)) && !(Number.isNaN(Provincia.longitude) && Provincia.name.length>3)){
    
          await ProvService.patchProvincia(Provincia);
          return res.status(201).json("Provincia modificada");
    
        }else{
          return res.status(400).send("Algun dato esta mal");
        }
      }else{
        return res.status(400).send("Faltan datos");
      }
    }else{
      return res.status(404).send("No existe una provincia con esa id");

    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.delete("/" , async (req, res) => {
  const id = req.query.id;
  try {
    const Prov=await ProvService.getProvinciaById(Provincia.id)

    if(Prov!=null){
      await ProvService.DeleteProvincia(id);
      return res.status(200).send("Provincia eliminada");
    }else{
      return res.status(404).send("No existe una provincia con esa id");
    }

    const respuesta = await ProvService.DeleteProvincia(id);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;
