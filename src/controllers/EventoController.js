import express from "express";
import {
  EventoService1,
  EventoService2,
  EventoService3,
  EventoService4,
  EventoService5,
  EventoService6,
  EventoService7
} from "../servicios/EventoService.js";

const router = express.Router();
const EventService1 = new EventoService1();
const EventService2 = new EventoService2();
const EventService3 = new EventoService3();
const EventService4 = new EventoService4();
const EventService5 = new EventoService5();
const EventService6 = new EventoService6();
const EventService7 = new EventoService7();



router.get("/", (req, res) => {
  const pageSize = req.query.pageSize;
  const page = req.query.page;
  const nombre = req.query.name;
  const category = req.query.category;
  const startDate = req.query.startDate;
  const tag = req.query.tag;

  try {
    if (!isNan(Date.parse(startDate))) {
      const allEvents = EventService1.getEventByFilter(
        1,
        1,
        "lolapalooza",
        "musica",
        "2007/03/03",
        "tag"
      );
      return res.json(allEvents);
    }else{
        return res.json("error en los filtros ingresados")
    }
  } catch (error) {
    console.log(error);
    return res.json("errr");
  }
});

router.delete("/",(req,res)=>{
  const id=req.query.id;
  try {
    const respuesta=EventService5.DeleteEvento(id);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }

});

router.patch("/",(req,res)=>{
  const name = req.query.name;
  const description = req.query.description;
  const start_date = req.query.start_date;
  const duration_in_minutes = req.query.duration_in_minutes;
  const price = req.query.price;
  const enabled_for_enrollment = req.query.enabled_for_enrollment;
  const max__assistance = req.query.max__assistance;

  const id=req.query.id;

  try {
    const respuesta=EventService4.patchEvento(id,name,description,start_date,duration_in_minutes,price, enabled_for_enrollment, max__assistance);
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }

});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  try {
    const EventById = EventService2.getEventById(2);
    return res.json(EventById);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.get("/:id/enrollment", (req, res) => {
  const id = req.params.id;
  const nombreEv = req.query.name;
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const username = req.query.username;
  var attended = req.query.attended;
  const rating = req.query.rating;

  if (attended == "true" || attended == "false" || attended == null) {
    
      try {
        const enrollment = EventService3.getEventEnrollment(id,nombreEv,firstName,lastName,username,attended,rating);
        return res.json(enrollment);
      } catch (error) {
        console.log(error);
        return res.json(error);
      }
  } else{
    return res.json("error no es booleano AHREEE");
  }

});

router.post("/:id/enrollment", (req, res) => {
  const idEvento = req.params.id;
  var attended = req.query.attended;
  const rating = req.query.rating;
  const descripcion = req.query.descripcion;
  const observations = req.query.observations;
  try {
    const mensaje = EventService6.InscripcionEvento(idEvento,descripcion,attended,observations,rating);
    return res.json(mensaje);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }

})

router.patch("/:id/enrollment", (req, res) => {
  const idEvento = req.params.id;
  const rating = req.query.rating;
  try {
    const mensaje = EventService7.CambiarRating(idEvento,rating);
    return res.json(mensaje);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }

})




export default router;
