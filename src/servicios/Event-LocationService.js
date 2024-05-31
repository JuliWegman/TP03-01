import { query } from "express";
import LocEvRepo from "../repositorios/Event-LocationRepository.js"

const repo= new LocEvRepo()

export class EventLocationService{
    async getEventLocationsByUser(id){
        return repo.getEventLocationsByUser(id);
    }

    async getEventLocationById(id){
        return repo.getEventLocationById(id);
    }

}