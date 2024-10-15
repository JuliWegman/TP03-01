import express from "express";
import {EventoService} from "../servicios/EventoService.js";
import Evento from "../entities/Evento.js";
import AuthMiddleware from "../auth/authMiddleware.js";
import {EventLocationService} from "../servicios/Event-LocationService.js"
const router = express.Router();
const EventService = new EventoService();
const evLocService=new EventLocationService();


const esFecha = (fecha) => {
  const patron = /^\d{4}-\d{2}-\d{2}$/;
  const numeros = /^\d+$/;
  
  return patron.test(fecha) && numeros.test(fecha.replace(/-/g, ''));

}

router.get("/" , async (req, res) => {
  const Evento = {};
  const limit = req.query.limit; // cant de eventos
  const offset = req.query.offset; // numero de pagina
  Evento.name = req.query.name;
  Evento.category = req.query.category;
  Evento.startDate = req.query.startDate;
  Evento.tag = req.query.tag;
  
  try {
    if (esFecha(Evento.startDate) || Evento.startDate == undefined) {
      const allEvents = await EventService.getEventByFilter(Evento, limit, offset);
      return res.send(allEvents);
    } else {
      return res.json("error en los filtros ingresados");
    }
  } catch (error) {
    console.log(error);
    return res.json("errr");
  }
});

router.delete("/:id", AuthMiddleware , async (req, res) => {
  const id = req.params.id;
  
  try {
    const ev=await EventService.getEventById(id)
    console.log(ev);
    const tags=await EventService.getTags(id)
    const enrollment=await EventService.getEventEnrollment(id)
    if(ev!=null){
    if (tags==null && enrollment==null) {
      
      await EventService.DeleteEvent(id);
      return res.status(200).json("eliminado")
    }else{
    return res.status(400).send("No se puede eliminar porque tiene tags o gente inscripta");
    }
  }else{
    return res.status(404).send("No existe la id")
  }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.post("/",AuthMiddleware, async (req, res) => {
  const Evento = {};
  Evento.name = req.body.name;
  Evento.description = req.body.description;
  Evento.id_event_category = req.body.id_event_category
  Evento.id_event_location = req.body.id_event_location
  Evento.start_date = req.body.start_date;
  Evento.duration_in_minutes = req.body.duration_in_minutes;
  Evento.price = req.body.price;
  Evento.enabled_for_enrollment = req.body.enabled_for_enrollment;
  Evento.max_assistance = req.body.max_assistance;
  Evento.id_creator_user = req.user.id;

  console.log(Evento);
  
  try {
    const evLoc  =await evLocService.getEventLocationById(Evento.id_event_location)
    if (Evento.name!=null && Evento.description!=null && Evento.id_event_category!=null && Evento.id_event_location!=null && Evento.start_date!=null && Evento.duration_in_minutes!=null && Evento.price!=null && Evento.enabled_for_enrollment!=null && Evento.max_assistance!=null) {
      if (evLoc.max_capacity>=Evento.max_assistance) {
        if (Evento.price>0 && Evento.duration_in_minutes>0 ) {
          const respuesta = await EventService.InsertEvento(Evento);;
          return res.status(201).json(respuesta);
        }else{
          return res.status(400).send("Precio y duración no pueden ser 0")
        }

      }else{
        return res.status(400).send("No pueden asistir más personas de las que admite la localidad")
      }
    }else{
      return res.status(400).send("Faltan datos")
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
  
});

router.put("/",AuthMiddleware, async (req, res) => {
  const Evento = {};
  Evento.name = req.body.name;
  Evento.description = req.body.description;
  Evento.start_date = req.body.start_date;
  Evento.duration_in_minutes = req.body.duration_in_minutes;
  Evento.price = req.body.price;
  Evento.enabled_for_enrollment = req.body.enabled_for_enrollment;
  Evento.max_assistance = req.body.max_assistance;
  Evento.id = req.body.id;
  Evento.id_event_category=req.body.id_event_category;
  Evento.id_event_location=req.body.id_event_location;
    
  try {
    const ev=await EventService.getEventById(Evento.id)
    const evLoc  =await evLocService.getEventLocationById(Evento.id_event_location)
    if (ev!=null) {
      
    if (Evento.name!=null && Evento.description!=null && Evento.id_event_category!=null && Evento.id_event_location!=null && Evento.start_date!=null && Evento.duration_in_minutes!=null && Evento.price!=null && Evento.enabled_for_enrollment!=null && Evento.max_assistance!=null) {
      if (evLoc.max_capacity>Evento.max_assistance) {
        if (Evento.price>0 && Evento.duration_in_minutes>0 ) {
          const respuesta = await EventService.patchEvento(Evento);;
          return res.status(201).json(respuesta);
        }else{
          return res.status(400).send("Precio y duración no pueden ser 0")
        }

      }else{
        return res.status(400).send("No pueden asistir más personas de las que admite la localidad")
      }
    }else{
      return res.status(400).send("Faltan datos")
    }
  }else{
    return res.status(404).send("No existe un evento con esa id")
  }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
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

    
    try {
      const event=await EventService.getEventById(enrollment.event_id)
      
      if(event==null  ){
        return res.status(404).send("No existe un evento con esa id")
      }else if(!event.enabled_for_enrollment){
        return res.status(402).send("Este evento no se puede anotarse")
      }else{
        const x = await EventService.getEventEnrollment(enrollment);
        return res.status(200).json(x);
      }
      
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
 
});

router.post("/:id/enrollment", AuthMiddleware , async (req, res) => {
  console.log("aaaaaaaaa");
  const enrollment = {};
  const enrollmentsABuscar={}
  enrollment.idEvento = req.params.id;
  enrollmentsABuscar.idEvento = req.params.id;
  enrollment.user_id = req.user.id; 
  try {
    const evento = await EventService.getEventById(req.params.id)
    enrollment.enabled = evento.enabled_for_enrollment
    const anotados=EventService.countEnrollments(enrollment.idEvento)
    if(evento.start_date<=Date.now()){
      return res.status(403).send("Este evento ya sucedió")
    }else if (anotados+1 >evento.max_assistance) {
      return res.status(403).send("No hay más lugar")
    }else if(!evento.enabled_for_enrollment){
      return res.status(403).send("No está habilitado para anotarse")
    }
    await EventService.InscripcionEvento(enrollment);
    return res.json("Inscripto en el evento cheto");
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.patch("/:id/enrollment/:rating",AuthMiddleware,async (req, res) => {
  const idEvento = req.params.id;
  const rating = req.params.rating;
  try {
    const mensaje = await EventService.CambiarRating(idEvento, rating);
    return res.status(200).send(mensaje);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;
