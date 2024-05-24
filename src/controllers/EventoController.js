import express from "express";
import {EventoService} from "../servicios/EventoService.js";
import Evento from "../entities/Evento.js";
import AuthMiddleware from "../auth/authMiddleware.js";

const router = express.Router();
const EventService = new EventoService();


router.get("/" , async (req, res) => {
  const Evento = {};
  const pageSize = 5; // cant de eventos
  const page = 1; // numero de pagina
  const URL=req.originalUrl; // url de la siguiente página
  Evento.name = req.query.name;
  Evento.category = req.query.category;
  Evento.startDate = req.query.startDate;
  Evento.tag = req.query.tag;
  req.user;

  try {
    const allEvents = await EventService.getEventByFilter(Evento, pageSize, page);
    return res.json(allEvents);
    if (esFecha(Evento.startDate)) {
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

router.delete("/", AuthMiddleware , (req, res) => {
  const id = req.query.id;
  try {
    EventService.DeleteEvent(id);
    return res.send("Borradisimo");4
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.post("/",AuthMiddleware, async (req, res) => {
  const Evento = {};
  Evento.name = req.query.name;
  Evento.description = req.query.description;
  Evento.id_event_category = req.query.id_event_category
  Evento.id_event_location = req.query.id_event_location
  Evento.start_date = req.query.start_date;
  Evento.duration_in_minutes = req.query.duration_in_minutes;
  Evento.price = req.query.price;
  Evento.enabled_for_enrollment = req.query.enabled_for_enrollment;
  Evento.max_assistance = req.query.max_assistance;
  Evento.id_creator_user = req.user.id;
  
  try {
    const respuesta = await EventService.InsertEvento(Evento);;
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
  
});

router.patch("/",AuthMiddleware, async (req, res) => {
  const Evento = {};
  Evento.name = req.query.name;
  Evento.description = req.query.description;
  Evento.start_date = req.query.start_date;
  Evento.duration_in_minutes = req.query.duration_in_minutes;
  Evento.price = req.query.price;
  Evento.enabled_for_enrollment = req.query.enabled_for_enrollment;
  Evento.max__assistance = req.query.max__assistance;

  Evento.id = req.query.id;
  console.log(Evento.id);
  try {
    const respuesta = await EventService.patchEvento(Evento);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const EventById = await EventService.getEventById(id);
    if (EventById!=null) {
      return res.status(200).json(EventById);
    }else{
      return res.status(401).json("No existe la id");

    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.get("/:id/enrollment", async (req, res) => {
  const enrollment = {};
  enrollment.event_id = req.params.id;
  enrollment.nombreEv = req.query.name;
  enrollment.firstName = req.query.firstName;
  enrollment.lastName = req.query.lastName;
  enrollment.username = req.query.username;
  enrollment.attended = req.query.attended;
  enrollment.rating = req.query.rating;

  // if (enrollment.attended == "true" || enrollment.attended == "false" || enrollment.attended == null || 1==1) {
    try {
      const x = await EventService.getEventEnrollment(enrollment);
      return res.json(x);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  // } else {
  //   return res.json("error no es booleano AHREEE");
  // }
});

router.post("/:id/enrollment", AuthMiddleware , async (req, res) => {
  const enrollment = {};
  const evento = await EventService.getEventById(req.params.id)

  enrollment.idEvento = req.params.id;
  enrollment.attended = req.query.attended;
  enrollment.rating = req.query.rating;
  enrollment.descripcion = req.query.descripcion;
  enrollment.observations = req.query.observations;
  enrollment.user_id = req.user.id; 
  enrollment.enabled = evento.enabled_for_enrollment

  try {
    await EventService.InscripcionEvento(enrollment);
    return res.json("Inscripto en el evento cheto");
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.patch("/:id/enrollment",AuthMiddleware,async (req, res) => {
  const idEvento = req.params.id;
  const rating = req.query.rating;
  try {
    const mensaje = await EventService.CambiarRating(idEvento, rating);
    console.log(mensaje);
    return res.status(200).send(mensaje);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;
