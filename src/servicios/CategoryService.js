import { query } from "express";
import CategoriaRepo from "../repositorios/CategoryRepository.js"
import { Pagination, PaginationDto } from "../utils/Paginacion.js";

const PaginacionConfig = new Pagination();
const repo= new CategoriaRepo();


export class CategoryService {

    async getCategorias(limit,offset){
        const parsedLimit = PaginacionConfig.parseLimit(limit);
        const parsedOffset = PaginacionConfig.parseOffset(offset);
        const cantidad=Number.parseInt(await repo.cantCategorias())
        const paginacion = PaginacionConfig.buildPaginationDto(parsedLimit, parsedOffset, cantidad, `/categoria`)
        const categorias=await repo.getCategorias(parsedLimit,parsedOffset)

        const collection={categorias,paginacion}
        return collection;  
    }

    async getCategoriaById(id){
        return repo.getCategoriaById(id)
    }
    
    async insertCategoria(Categoria){
        repo.insertCategoria(Categoria)
        return "Agregado con exito"
    }

    async updateCategoria(categoria){
        repo.updateCategoria(categoria)
        return "Updateado con exito"
    }

    async deleteCategoria(id){
        repo.deleteCategoria(id);
        return "Eliminado con exito";
    }

}
