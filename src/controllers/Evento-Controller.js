import express from "express";
import EventoService from "../servicios/EventoService";
const controller = express.Router();

controller.get("/event",(req,res)=>{
    const pageSize=req.query.pageSize;
    const page=req.query.page;

    try{
        const allEvents=EventoService.getAllEvents(pageSize,page); 
        return res.json(allEvents);
    }catch(error){
        console.log(error);
        return res.json(error);
    }
});






export default controller;