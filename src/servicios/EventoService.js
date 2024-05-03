import { query } from "express";
import EventosRepo from "../repositorios/EventoRepository.js"
// import user 

const repo= new EventosRepo();


const Eventos = {
  collection: [
    {
      id: 2,
      name: "Taylor Swift",
      description: "Un alto show",
      start_date: "2024-03-21T03:00:00.000Z",
      duration_in_minutes: 210,
      price: "15500",
      enabled_for_enrollment: true,
      max_assistance: 120000,
      tags: ["Rock", "Pop"],
      creator_user: {
        id: 3,
        username: "Jschiffer",
        first_name: "Julian",
        last_name: "Schiffer",
      },
      event_category: {
        id: 1,
        name: "Musica",
      },
      event_location: {
        id: 1,
        name: "River",
        full_address: "Av. Pres. Figueroa Alcorta 7597",
        latitude: -34.5453,
        longitude: -58.4498,
        max_capacity: "84567",
      },
    },
    {
      id: 3,
      name: "Taylor Swift",
      description: "Un alto show",
      start_date: "2024-03-21T03:00:00.000Z",
      duration_in_minutes: 210,
      price: "15500",
      enabled_for_enrollment: true,
      max_assistance: 120000,
      tags: ["Rock", "Pop"],
      creator_user: {
        id: 3,
        username: "Jschiffer",
        first_name: "Julian",
        last_name: "Schiffer",
      },
      event_category: {
        id: 1,
        name: "Musica",
      },
      event_location: {
        id: 1,
        name: "River",
        full_address: "Av. Pres. Figueroa Alcorta 7597",
        latitude: -34.5453,
        longitude: -58.4498,
        max_capacity: "84567",
      },
    },
  ],
  pagination: {
    pagination:{limit:parsedLimit,
      offset:parsedOffset,
      nextPage:((parsedOffset+1) *parsedLimit<=totalCount) ?`${process.env.BASE_URL}/${path}?limit=${parsedLimit}&offset=${parsedOffset+1}${(eventName) ?`&eventName=${eventName}`:null}${(eventCategory) ?`&eventCategory=${eventCategory}` : null}${(eventDate) ?`&eventDate=${eventDate}`:null}${(eventTag) ?`&eventTag=${eventTag}`:null}`:null,
      total:totalCount}
  
  },
};

export class EventoService {
  async getEventByFilter(Evento, pageSize, reqPage) {
    const eventosPorFiltro = await repo.getEventByFilter(Evento, pageSize, reqPage)

    return Eventos;
  }

  async getEventById(id) {
    return await repo.getEventById(id);

  }

  async getEventEnrollment(enrollment) {

    const eventoEnrollment = await repo.getEventEnrollment(enrollment);
    return eventoEnrollment;
  }

  async patchEvento(Evento) {
    //arreglalo huevo

    const patchEvento = await repo.patchEvento(Evento);
    return "Evento Actualizado";
  }

  async DeleteEvent(id) {

    const DeleteEvento = await repo.DeleteEvent(id);

    return "Eliminado con éxito";
  }

  async InscripcionEvento(enrollment, id) {
    const evento = EventoService2.getEventById(id);
    // const users = user.getbyid
    const users = {
      id:2,
      nombre: "joaquin"
    }

    const InscripcionAEvento = await repo.InscripcionEvento(enrollment, evento, users)
    return InscripcionAEvento;
  }

  async CambiarRating(id, rating) {
    //query.execute();
    const UpdateRating = await repo.UpdateRating(rating,id)
    return UpdateRating;
  }

  async InsertEvento(evento) {

    const respuesta=await repo.InsertEvento(evento);
    return respuesta;
  }
}
