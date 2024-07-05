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
        const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/api/location`)
        const Colection=await repo.getLocalidades(parsedLimit,parsedOffset)

        const x={Colection,paginacion}
        return x;  
    }

    async getLocalidadById(id){
        return await repo.getLocalidadById(id);  
    }
    
    async getEvLocByLocalidad(id,limit,offset){
        const parsedLimit = PaginacionConfig.parseLimit(limit);
        const parsedOffset = PaginacionConfig.parseOffset(offset);
        const cantidad =  Number.parseInt(await repoEvLoc.cantEvLocByLocation(id));
        const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/api/location/${id}/event-location`)
        const Colection= await repoEvLoc.getEventLocationsByLocation(id,parsedLimit,parsedOffset);
        const x={Colection,paginacion}
        return x;


    }
   

    
    


}
