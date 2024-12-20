import express from "express";
import {CategoryService} from "../servicios/CategoryService.js";
import AuthMiddleware from "../auth/authMiddleware.js";
import authMiddleware from "../auth/authMiddleware.js";

const CategoriaService = new CategoryService();
const router = express.Router();

router.get("/", async (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    try {
      const Colection = await CategoriaService.getCategorias(limit,offset);
      return res.status(200).json(Colection);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  });

  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const categoriaById = await CategoriaService.getCategoriaById(id);
      if (categoriaById!=null) {const categoria = {};
      categoria.name = req.query.name;
      categoria.display_order = req.query.display_order;


      if ((categoria.name != null || categoria.display_order || null)) {
        
      }
        return res.status(200).json(categoriaById);
      }else{
        return res.status(404).json("No existe la id");
      }
    }
    catch(error){
      console.log(error);
    }
  })

  router.post("/", AuthMiddleware, async (req, res) => {
    const Categoria = {};
    Categoria.name = req.body.name;
    Categoria.display_order = req.body.display_order
    
    if (Categoria.name != null) {
      try {
        const respuesta = await CategoriaService.insertCategoria(Categoria);;
        return res.status(201).json(respuesta);
      } catch (error) {
        console.log(error);
        return res.status(402).json(error);
      }
  } else return res.status(400).json("El nombre (name) esta vacio")
  });

  router.put("/", async (req, res) => {
    

      try {
        const respuesta = await CategoriaService.updateCategoria(req.body)
        return res.status(200).json(respuesta)
      } catch (error) {
        return res.status(400).json(error)
      }
     
  })

  router.delete("/:id", authMiddleware, async (req,res) => {
    const id = req.params.id;
    try {
        const cat=await CategoriaService.getCategoriaById(id)
        if (cat!=null) {
          const respuesta = await CategoriaService.deleteCategoria(id)
        return res.status(200).json(respuesta)
        }else{
          return res.status(404).json("Id no encoxntrado");

        }
        
      } catch (error) {
        return res.status(500).json(error)
      }

  })  
  


  export default router;
