import { query } from "express";
import EventosRepo from "../repositorios/EventoRepository.js"
import { Pagination, PaginationDto } from "../utils/Paginacion.js";
const repo= new EventosRepo();

const PaginacionConfig = new Pagination();
  
  

export class EventoService {
  async getEventByFilter(Evento, pageSize, reqPage) {
    const parsedLimit = PaginacionConfig.parseLimit(pageSize) 
    const parsedOffset = PaginacionConfig.parseOffset(reqPage)

    const cantidad =  Number.parseInt(await repo.cantEventos());
    const nextPage=((parsedOffset+1) * parsedLimit<=cantidad) ?`/${"event"}?limit=${parsedLimit}&offset=${parsedOffset+1}${(Evento.name) ?`&name=${Evento.name}`:''}${(Evento.category) ?`&category=${Evento.category}` : ''}${(Evento.startDate) ?`&startDate=${Evento.startDate}`:''}${(Evento.tag) ?`&tag=${Evento.tag}`:''}`:"null"
    const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
    const eventosPorFiltro = await repo.getEventByFilter(Evento, parsedLimit, parsedOffset)
    
    const collection = {eventosPorFiltro, paginacion}
    return collection;
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
