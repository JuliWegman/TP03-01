import { query } from "express";
import LocalidadRepo from "../repositorios/LocalidadRepository.js"
import EvLocRepo from "../repositorios/Event-LocationRepository.js"
import { Pagination, PaginationDto } from "../utils/Paginacion.js";

const PaginacionConfig = new Pagination();
const repo= new LocalidadRepo();
const repoEvLoc=new EvLocRepo()

export class LocalidadService {

    async getLocalidades(limit, offset) {
        const parsedLimit = PaginacionConfig.parseLimit(limit);
        const parsedOffset = PaginacionConfig.parseOffset(offset);
        const cantidad=Number.parseInt(await repo.cantLocalidades())
        const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/localidad`)
        const localidades=await repo.getLocalidades(parsedLimit,parsedOffset)

        const collection={localidades,paginacion}
        return collection;  
    }

    async getLocalidadById(id){
        return await repo.getLocalidadById(id);  
    }
    
    async getEvLocByLocalidad(id,limit,offset){
        const parsedLimit = PaginacionConfig.parseLimit(limit);
        const parsedOffset = PaginacionConfig.parseOffset(offset);
        const cantidad =  Number.parseInt(await repoEvLoc.cantEvLocByLocation(id));
        const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/localidad/${id}/event-location`)
        const EvLocs= await repoEvLoc.getEventLocationsByLocation(id,parsedLimit,parsedOffset);
        const collection={EvLocs,paginacion}
        return collection;


    }
   

    
    


}
