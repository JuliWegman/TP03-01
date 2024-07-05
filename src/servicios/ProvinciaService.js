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
    const nextPage=((parsedOffset+1)*parsedLimit<=cantidad) ?`/api/province`:"null";
    const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
    const Colection=await repo.getProvincias(parsedLimit, parsedOffset)
    const x={Colection, paginacion}
    return x;  
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
    const localidades=((await this.getLocalidadesByProvincia(id,1,0)).localidades)
    if (localidades==null) {
       await repo.deleteProvincia(id);
       return true
    }else{
      return false
    }
  }

  async getLocalidadesByProvincia(id_provincia,limit,offset){
    const parsedLimit = PaginacionConfig.parseLimit(limit) 
    const parsedOffset = PaginacionConfig.parseOffset(offset)
    const cantidad =  Number.parseInt(await repoLocalidades.cantLocalidades());
    const nextPage=((parsedOffset+1)*parsedLimit<=cantidad) ?`/api/province/${id_provincia}/locations`:"null";
    const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, nextPage)
    const Colection=await repoLocalidades.getLocalidadesByProvincia(id_provincia,parsedLimit,parsedOffset)
    const x={Colection, paginacion}
    return x;  
  }
}
