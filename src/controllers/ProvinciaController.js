import express from "express";
import {
  ProvinciaService
} from "../servicios/ProvinciaService.js";

import AuthMiddleware from "../auth/authMiddleware.js";


const router = express.Router();
const ProvService = new ProvinciaService();


router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize;
  const reqPage = req.query.pageSize;
  try {
    const provincias = await ProvService.getProvincias(pageSize, reqPage);
    return res.json(provincias);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.post("/", AuthMiddleware , async (req, res) => {
  const Provincia = {};
  Provincia.name = req.query.name;
  Provincia.full_name = req.query.full_name;
  Provincia.latitude = req.query.latitude;
  Provincia.longitude = req.query.longitude;
  Provincia.display_order = req.query.display_order;

  //arreglar body

  ;try {
    const respuesta = await ProvService.InsertProvincia(Provincia);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.patch("/", AuthMiddleware , async(req, res) => {
  const Provincia = {};
  Provincia.name = req.query.name;
  Provincia.full_name = req.query.full_name;
  Provincia.latitude = req.query.latitude;
  Provincia.longitude = req.query.longitude;
  Provincia.display_order = req.query.display_order;
  Provincia.id = req.query.id;

  try {
    const respuesta = await ProvService.patchProvincia(Provincia);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.delete("/", AuthMiddleware , async (req, res) => {
  const id = req.query.id;
  try {
    const respuesta = await ProvService.DeleteProvincia(id);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;
