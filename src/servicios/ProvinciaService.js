import { query } from "express";
import repositorio from "../repositorios/ProvinciaRepository.js"

const repo=new repositorio();

export class ProvinciaService {
  async getProvincias(pageSize, reqPage) {
    
    return await repo.getProvincias();  
  }

  async InsertProvincia(Provincia) {
    const query = `Insert into provinces(name,full_name,latitude,longitude,display_order) values ("${Provincia.name}","${Provincia.full_name}",${Provincia.latitude},${Provincia.longitude},${Provincia.display_order})`;

    //query.execute();

    return "Agregado con éxito";
  }

  async patchProvincia(Provincia) {
    return await repo.patchProvincia(Provincia);
  }

  async DeleteProvincia(id) {
    const query = `Delete from provinces Where id=${id}`;

    //query.execute();

    return "Eliminado con éxito";
  }
}
