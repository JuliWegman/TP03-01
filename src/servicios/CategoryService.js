import { query } from "express";
import CategoriaRepo from "../repositorios/CategoryRepository.js"

const repo= new CategoriaRepo();


export class CategoryService {

    async getCategorias(){
        return repo.getCategorias();
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
