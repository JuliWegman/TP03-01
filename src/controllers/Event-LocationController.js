import express from "express";
import {EventLocationService} from "../servicios/Event-LocationService.js";
import AuthMiddleware from "../auth/authMiddleware.js";

const router = express.Router();
const evLocService=new EventLocationService();

router.get("/", AuthMiddleware , async (req, res) => {
    try {
      const evLocByUser = await evLocService.getEventLocationsByUser(req.user.id);
      if (evLocByUser!=null) {
        return res.status(200).json(evLocByUser);
      }else{
        return res.status(401).json("este usuario no creo ninguna event location");
      }
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
});

router.get("/:id", AuthMiddleware , async (req, res) => {
    const id = req.params.id;
    try {
      const evLocById = await evLocService.getEventLocationById(id);
      if (evLocById!=null) {
        return res.status(200).json(evLocById);
      }else{
        return res.status(401).json("No existe la id");
  
      }
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
});  

router.post("/",AuthMiddleware, async (req,res)=>{
const EventLocation={}
EventLocation.id_location=req.body.id_location;
EventLocation.name=req.body.name;
EventLocation.full_adress=req.body.full_adress;
EventLocation.max_capacity=req.body.max_capacity;
EventLocation.latitude=req.body.latitude;
EventLocation.longitude=req.body.longitude;
EventLocation.id_creator_user=req.user.id;

try {
    const respuesta = await evLocService.InsertEvLoc(Evento);;
    return res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }

});


export default router;