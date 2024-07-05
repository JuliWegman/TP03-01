import EventosRepo from "../repositorios/EventoRepository.js"
import UserRepo from "../repositorios/UsuarioRepository.js"
import CategoryRepo from "../repositorios/CategoryRepository.js"
import LocRepo from "../repositorios/LocalidadRepository.js"

import { Pagination, PaginationDto } from "../utils/Paginacion.js";
const repo= new EventosRepo();
const repoUser=new UserRepo();
const repoCategoria=new CategoryRepo();
const repoLoc=new LocRepo();

const PaginacionConfig = new Pagination();
  
  

export class EventoService {
  async getEventByFilter(Evento, limit, of) {
    const parsedLimit = PaginacionConfig.parseLimit(limit) 
    const parsedOffset = PaginacionConfig.parseOffset(of)
    const cantidad =  Number.parseInt(await repo.cantEventos());
    const nextPage=((parsedOffset+1) * parsedLimit<=cantidad) ?`/api/event?${(Evento.name) ?`&name=${Evento.name}`:''}${(Evento.category) ?`&category=${Evento.category}` : ''}${(Evento.startDate) ?`&startDate=${Evento.startDate}`:''}${(Evento.tag) ?`&tag=${Evento.tag}`:''}`:"null"
    const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
    const Colection = await repo.getEventByFilter(Evento, parsedLimit, parsedOffset)

    for (let i = 0; i < Colection.length; i++) {
      Colection[i].user=await repoUser.getUserById(Colection[i].id_creator_user)
      Colection[i].categoría=await repoCategoria.getCategoriaById(Colection[i].id_event_category)
      Colection[i].localidad=await repoLoc.getLocalidadById(Colection[i].id_event_location)
      delete Colection[i].id_creator_user,delete Colection[i].id_event_category,delete Colection[i].id_event_location      
    }
    const xx = {Colection, paginacion}
    return xx;
  }
  async getEventById(id) {
    const Evento=await repo.getEventById(id);
    if (Evento!=null) {
      Evento.user=await repoUser.getUserById(Evento.id_creator_user)
      Evento.categoría=await repoCategoria.getCategoriaById(Evento.id_event_category)
      Evento.localidad=await repoLoc.getLocalidadById(Evento.id_event_location)
      delete Evento.id_creator_user,delete Evento.id_event_category,delete Evento.id_event_location
    } 
    return Evento

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
    return await repo.DeleteEvent(id);
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
    if (await repo.InsertEvento(evento)) {
      
      return "insertado con exito";
    } else return "ERROR"
  }

  async getTags(id){
    return await repo.getTagsByEvent(id);
  }
  async countEnrollments(id){
    return await repo.countEnrollments(id)
  }
}
