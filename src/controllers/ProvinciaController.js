import express from "express";
import {
  ProvinciaService1,
  ProvinciaService2,
  ProvinciaService3,
  ProvinciaService4,
} from "../servicios/ProvinciaService.js";

const router = express.Router();
const ProvService1 = new ProvinciaService1();
const ProvService2 = new ProvinciaService2();
const ProvService3 = new ProvinciaService3();
const ProvService4 = new ProvinciaService4();

router.get("/", (req, res) => {
  const pageSize = req.query.pageSize;
  const reqPage = req.query.pageSize;
  try {
    const provincias = ProvService1.getProvincias(pageSize, reqPage);
    return res.json(provincias);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.post("/", (req, res) => {
  const Provincia = {};
  Provincia.name = req.query.name;
  Provincia.full_name = req.query.full_name;
  Provincia.latitude = req.query.latitude;
  Provincia.longitude = req.query.longitude;
  Provincia.display_order = req.query.display_order;

  //arreglar body

  ProvService2.InsertProvincia(Provincia);
  return res.status(201).send("Provincia posteada efectivamente");
});

router.patch("/", (req, res) => {
  const Provincia = {};
  Provincia.name = req.query.name;
  Provincia.full_name = req.query.full_name;
  Provincia.latitude = req.query.latitude;
  Provincia.longitude = req.query.longitude;
  Provincia.display_order = req.query.display_order;
  Provincia.id = req.query.id;

  try {
    const respuesta = ProvService3.patchProvincia(Provincia);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.delete("/", (req, res) => {
  const id = req.query.id;
  try {
    const respuesta = ProvService4.DeleteProvincia(id);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;
