import express from "express";
import {
  ProvinciaService
} from "../servicios/ProvinciaService.js";

const router = express.Router();
const ProvService = new ProvinciaService();


router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  try {
    const provincias = await ProvService.getProvincias(limit, offset);
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
      return res.status(404).json("No existe una provincia con esa id");

    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.get("/:id/locations", async (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  const id=req.params.id
  try {
    const collection = await ProvService.getLocalidadesByProvincia(id,limit,offset);
    if (collection.Colection!=null) {
      return res.status(200).json(collection);
    }else{
      return res.status(404).json("No se encontro informacion");

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

  console.log(Provincia.name.length);
  try {
    if(Provincia.name!=null && Provincia.full_name!=null && Provincia.latitude!=null && Provincia.longitude!=null && Provincia.display_order!=null){

      if(!(Number.isNaN(Provincia.latitude)) && !(Number.isNaN(Provincia.longitude)) && Provincia.name.length>3){

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

router.delete("/:id" , async (req, res) => {
  const id = req.params.id;
  try {
    const Prov=await ProvService.getProvinciaById(id)
    if(Prov!=null){
      try{
        const eliminado=await ProvService.DeleteProvincia(id);
        if (eliminado) {        
          return res.status(200).send("Provincia eliminada");
        }else{
          return res.status(403).send("No se puede eliminar porque tiene localidades")
        }

      }catch(error){
        console.log(error);
        return res.json(error);
      }
    }else{
      return res.status(404).send("No existe una provincia con esa id");
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;
