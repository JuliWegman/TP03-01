import { query } from "express";
import LocEvRepo from "../repositorios/Event-LocationRepository.js"
import { Pagination, PaginationDto } from "../utils/Paginacion.js";

const PaginacionConfig = new Pagination();
const repo= new LocEvRepo()

export class EventLocationService{
    async getEventLocationsByUser(id,limit,offset){
        const parsedLimit = PaginacionConfig.parseLimit(limit);
        const parsedOffset = PaginacionConfig.parseOffset(offset);
        const cantidad =  Number.parseInt(await repo.cantEvLoc(id));
        const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, "/event-location")
        const evLoc= await repo.getEventLocationsByUser(id,parsedLimit,parsedOffset);

        const collection={evLoc,paginacion}
        return collection;

    }

    async getEventLocationById(id){
        return await repo.getEventLocationById(id);
    }

    async InsertEvLoc(EvLoc){
        await repo.InsertEvLoc(EvLoc);
        return "Insertado correctamente"
    }

    async UpdateEvLoc(EvLoc){
        await repo.UpdateEvLoc(EvLoc);
        return "Actualizado correctamente"
    }

    async deleteEvLoc(id){
        await repo.deleteEvLoc(id);
        return "Eliminado correctamente"
        

    }

}