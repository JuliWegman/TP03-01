import { query } from "express";
import repositorio from "../repositorios/ProvinciaRepository.js"
import repositorioLocalidades from "../repositorios/LocalidadRepository.js"

const repo=new repositorio();
const repoLocalidades=new repositorioLocalidades();

export class ProvinciaService {
  async getProvincias(pageSize, reqPage) {
    
    return await repo.getProvincias();  
  }

  async getProvinciaById(id){
    console.log(id);

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
