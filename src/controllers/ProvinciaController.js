import express from "express";
import { ProvinciaService1,ProvinciaService2,ProvinciaService3,ProvinciaService4} from "../servicios/ProvinciaService.js";

const router = express.Router();
const ProvService1 = new ProvinciaService1();
const ProvService2 = new ProvinciaService2();
const ProvService3 = new ProvinciaService3();
const ProvService4 = new ProvinciaService4();




router.get("/", (req, res) => {
  const pageSize=req.query.pageSize;
  const reqPage=req.query.pageSize;
  try {
    const provincias = ProvService1.getProvincias(pageSize,reqPage);
    return res.json(provincias);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.post("/", (req, res) => {
  const name = req.query.name;
  const full_name = req.query.full_name;
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const display_order = req.query.display_order;

  //arreglar body
  
  ProvService2.InsertProvincia(name, full_name, latitude, longitude, display_order);
  return res.status(201).send("Provincia posteada efectivamente");
});

router.patch("/",(req,res)=>{
  const name = req.query.name;
  const full_name = req.query.full_name;
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const display_order = req.query.display_order;
  const id=req.query.id;

  try {
    const respuesta=ProvService3.patchProvincia(id,name,full_name,latitude,longitude,display_order);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }

});

router.delete("/",(req,res)=>{
  const id=req.query.id;
  try {
    const respuesta=ProvService4.DeleteProvincia(id);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }

});
export default router;
