import express from "express";
import {
  ProvinciaService
} from "../servicios/ProvinciaService.js";

const router = express.Router();
const ProvService = new ProvinciaService();


router.get("/", (req, res) => {
  const pageSize = req.query.pageSize;
  const reqPage = req.query.pageSize;
  try {
    const provincias = ProvService.getProvincias(pageSize, reqPage);
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

  ProvService.InsertProvincia(Provincia);
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
    const respuesta = ProvService.patchProvincia(Provincia);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.delete("/", (req, res) => {
  const id = req.query.id;
  try {
    const respuesta = ProvService.DeleteProvincia(id);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;
