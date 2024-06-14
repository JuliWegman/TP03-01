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
    const nextPage=((parsedOffset+1) * parsedLimit<=cantidad) ?`/provincia?limit=${parsedLimit}&offset=${parsedOffset+1}`:"null";
    const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
    return [await repo.getProvincias(parsedLimit, parsedOffset), paginacion];  
  }

  async getProvinciaById(id){

    return await repo.getProvinciaById(id);
  }

  async InsertProvincia(Provincia) {
    await repo.insertProvincia(Provincia)
  }

  async patchProvincia(Provincia) {

    return await repo.patchProvincia(Provincia);
  }

  async DeleteProvincia(id) {
    return await repo.deleteProvincia(id);
  }

  async getLocalidadesByProvincia(id_provincia){
        
    return await repoLocalidades.getLocalidadesByProvincia(id_provincia);  

}
}
