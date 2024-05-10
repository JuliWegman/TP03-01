import { query } from "express";
import repositorio from "../repositorios/ProvinciaRepository.js"

const repo=new repositorio();

export class ProvinciaService {
  async getProvincias(pageSize, reqPage) {
    
    return await repo.getProvincias();  
  }

  async InsertProvincia(Provincia) {
    const provincia = repo.insertProvinca(Provincia)

    return "Agregado con éxito";
  }

  async patchProvincia(Provincia) {
    return await repo.patchProvincia(Provincia);
  }

  async DeleteProvincia(id) {
    return await repo.deleteProvincia(id);
  }
}
