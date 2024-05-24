import { query } from "express";
import EventosRepo from "../repositorios/EventoRepository.js"

const repo= new EventosRepo();



  // pagination: {
  //   pagination:{limit:parsedLimit,
  //     offset:parsedOffset,
  //     nextPage:((parsedOffset+1) *parsedLimit<=totalCount) ?`${process.env.BASE_URL}/${path}?limit=${parsedLimit}&offset=${parsedOffset+1}${(eventName) ?`&eventName=${eventName}`:null}${(eventCategory) ?`&eventCategory=${eventCategory}` : null}${(eventDate) ?`&eventDate=${eventDate}`:null}${(eventTag) ?`&eventTag=${eventTag}`:null}`:null,
  //     total:totalCount}
  
  // },

export class EventoService {
  async getEventByFilter(Evento, pageSize, reqPage) {
    const eventosPorFiltro = await repo.getEventByFilter(Evento, pageSize, reqPage)

    return eventosPorFiltro;
  }

  async getEventById(id) {
    return await repo.getEventById(id);

  }

  async getEventEnrollment(enrollment) {

    const eventoEnrollment = await repo.getEventEnrollment(enrollment);
    return eventoEnrollment;
  }

  async patchEvento(Evento) {

    await repo.patchEvento(Evento);
    return "Evento Actualizado";
  }

  async DeleteEvent(id) {

   await repo.DeleteEvent(id);
    return "Eliminado con éxito";
  }

  async InscripcionEvento(enrollment) {
    await repo.InscripcionEvento(enrollment);
    return "Inscripto con exito";
  }

  async CambiarRating(id, rating) {

    await repo.UpdateRating(rating,id)
    return "rating actualizado";
  }

  async InsertEvento(evento) {

    await repo.InsertEvento(evento);
    return "insertado con exito";
  }
}
