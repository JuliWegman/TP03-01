import { query } from "express";
import repositorio from "../repositorios/ProvinciaRepository.js"
import repositorioLocalidades from "../repositorios/LocalidadRepository.js"
import { Pagination, PaginationDto } from "../utils/Paginacion.js";


const repo=new repositorio();
const repoLocalidades=new repositorioLocalidades();
const PaginacionConfig = new Pagination();

export class ProvinciaService {
  async getProvincias(pageSize, reqPage) {
    const parsedLimit = PaginacionConfig.parseLimit(pageSize) 
    const parsedOffset = PaginacionConfig.parseOffset(reqPage)
    const cantidad =  Number.parseInt(await repo.cantProvincias());
    const nextPage=((parsedOffset+1)*parsedLimit<=cantidad) ?`/province`:"null";
    const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
    const provincias=await repo.getProvincias(parsedLimit, parsedOffset)
    return {provincias, paginacion};  
  }

  async getProvinciaById(id){

    return await repo.getProvinciaById(id);
  }

  async InsertProvincia(Provincia) {
    return await repo.insertProvincia(Provincia)
  }

  async patchProvincia(Provincia) {

    return await repo.patchProvincia(Provincia);
  }

  async DeleteProvincia(id) {
    return await repo.deleteProvincia(id);
  }

  async getLocalidadesByProvincia(id_provincia,limit,offset){
    const parsedLimit = PaginacionConfig.parseLimit(limit) 
    const parsedOffset = PaginacionConfig.parseOffset(offset)
    const cantidad =  Number.parseInt(await repoLocalidades.cantLocalidades());
    const nextPage=((parsedOffset+1)*parsedLimit<=cantidad) ?`/province/${id_provincia}/locations`:"null";
    const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
    const localidades=await repoLocalidades.getLocalidadesByProvincia(id_provincia,parsedLimit,parsedOffset)
    return {localidades, paginacion};  
 

}
}
