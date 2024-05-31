import { query } from "express";
import LocalidadRepo from "../repositorios/LocalidadRepository.js"

const repo= new LocalidadRepo();


export class LocalidadService {

    async getLocalidades(pageSize, reqPage) {
    
        return await repo.getLocalidades();  
    }

    async getLocalidadById(id){
        return await repo.getLocalidadById(id);  
    }
    
   

    
    


}
