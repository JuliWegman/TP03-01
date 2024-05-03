import express from "express";
import {EventoService} from "../servicios/EventoService.js";
import Evento from "../entities/Evento.js";

const router = express.Router();
const EventService = new EventoService();


router.get("/", (req, res) => {
  const Evento = {};
  const pageSize = req.query.pageSize; // cant de eventos
  const page = req.query.page; // numero de pagina
  const URL=req.originalUrl; // url de la siguiente página
  Evento.name = req.query.name;
  Evento.category = req.query.category;
  Evento.startDate = req.query.startDate;
  Evento.tag = req.query.tag;

  try {
    if (!isNan(Date.parse(Evento.startDate))) {
      const allEvents = EventService.getEventByFilter(Evento, pageSize, page);
      return res.json(allEvents);
    } else {
      return res.json("error en los filtros ingresados");
    }
  } catch (error) {
    console.log(error);
    return res.json("errr");
  }
});

router.delete("/", (req, res) => {
  const id = req.query.id;
  try {
    const respuesta = EventService.DeleteEvento(id);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.post("/", (req, res) => {
  const Evento = {};
  Evento.name = req.query.name;
  Evento.description = req.query.description;
  Evento.start_date = req.query.start_date;
  Evento.duration_in_minutes = req.query.duration_in_minutes;
  Evento.price = req.query.price;
  Evento.enabled_for_enrollment = req.query.enabled_for_enrollment;
  Evento.max__assistance = req.query.max__assistance;

  //arreglar body

  EventService.InsertEvento(Evento);
  return res.status(201).send(Evento);
});

router.patch("/", (req, res) => {
  const Evento = {};
  Evento.name = req.query.name;
  Evento.description = req.query.description;
  Evento.start_date = req.query.start_date;
  Evento.duration_in_minutes = req.query.duration_in_minutes;
  Evento.price = req.query.price;
  Evento.enabled_for_enrollment = req.query.enabled_for_enrollment;
  Evento.max__assistance = req.query.max__assistance;

  Evento.id = req.query.id;

  try {
    const respuesta = EventService.patchEvento(Evento);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  try {
    const EventById = EventService.getEventById(2);
    return res.json(EventById);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.get("/:id/enrollment", (req, res) => {
  const enrollment = {};
  enrollment.id = req.params.id;
  enrollment.nombreEv = req.query.name;
  enrollment.firstName = req.query.firstName;
  enrollment.lastName = req.query.lastName;
  enrollment.username = req.query.username;
  enrollment.attended = req.query.attended;
  enrollment.rating = req.query.rating;

  if (attended == "true" || attended == "false" || attended == null) {
    try {
      const x = EventService.getEventEnrollment(enrollment);
      return res.json(x);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  } else {
    return res.json("error no es booleano AHREEE");
  }
});

router.post("/:id/enrollment", (req, res) => {
  const enrollment = {};

  enrollment.idEvento = req.params.id;
  enrollment.attended = req.query.attended;
  enrollment.rating = req.query.rating;
  enrollment.descripcion = req.query.descripcion;
  enrollment.observations = req.query.observations;
  try {
    const mensaje = EventService.InscripcionEvento(enrollment);
    return res.json(mensaje);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.patch("/:id/enrollment", (req, res) => {
  const idEvento = req.params.id;
  const rating = req.query.rating;
  try {
    const mensaje = EventService.CambiarRating(idEvento, rating);
    return res.json(mensaje);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;
