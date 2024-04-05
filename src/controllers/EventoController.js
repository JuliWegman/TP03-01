import express from "express";
import {
  EventoService1,
  EventoService2,
  EventoService3,
} from "../servicios/EventoService.js";

const router = express.Router();
const EventService1 = new EventoService1();
const EventService2 = new EventoService2();
const EventService3 = new EventoService3();

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
        return res.json("error, los filtros ingresados")
    }
  } catch (error) {
    console.log(error);
    return res.json("errr");
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

  try {
    const EventById = EventService3.getEventEnrollment(
      2,
      "lolla",
      "huevo",
      "wegman",
      "julian",
      true,
      4
    );
    return res.json(EventById);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;
