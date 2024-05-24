import express from "express";
import {CategoryService} from "../servicios/CategoryService.js";
import AuthMiddleware from "../auth/authMiddleware.js";

const CategoriaService = new CategoryService();
const router = express.Router();

router.get("/", async (req, res) => {
    const pageSize = req.query.pageSize;
    const reqPage = req.query.reqPage;
    try {
      const categorias = await CategoriaService.getCategorias();
      return res.status(200).json(categorias);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  });

  export default router;
