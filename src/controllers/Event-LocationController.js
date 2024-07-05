import express from "express";
import {EventLocationService} from "../servicios/Event-LocationService.js";
import AuthMiddleware from "../auth/authMiddleware.js";
import {LocalidadService} from "../servicios/LocalidadService.js"

const router = express.Router();
const evLocService=new EventLocationService();
const locService= new LocalidadService()

router.get("/", AuthMiddleware , async (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  
    try {
      const evLocByUser = await evLocService.getEventLocationsByUser(req.user.id,limit,offset);
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
    const id_user=req.user.id;
    try {
      const evLocById = await evLocService.getEventLocationById(id);
      if (evLocById.id_creator_user!=id_user) {
        return res.status(401).send("No tienes acceso a este event-location")
      }
      if (evLocById!=null) {
        return res.status(200).json(evLocById);
      }else{
        return res.status(404).json("No existe la id");
  
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
  EventLocation.full_address=req.body.full_address;
  EventLocation.max_capacity=req.body.max_capacity;
  EventLocation.latitude=req.body.latitude;
  EventLocation.longitude=req.body.longitude;
  EventLocation.id_creator_user=req.user.id;

  try {
      if((EventLocation.name!=null && EventLocation.full_address!=null) && (EventLocation.name.length>3 && EventLocation.full_address.length>3)){

      if(locService.getLocalidadById(EventLocation.id_location)!=null){

        if (EventLocation.max_capacity>0) {

          const respuesta = await evLocService.InsertEvLoc(EventLocation);;
          return res.status(201).json(respuesta);

        }else{
          return res.status(400).send("Maxima capacidad inválida");
        }
      }else{

        return res.status(400).send("No existe esa id localidad");
      }
    }else{
      return res.status(400).send("Nombre o dirección inválidos");
    }
      
    } catch (error) {
      console.log(error);
      return res.json(error);
    }

});


router.put("/",AuthMiddleware, async (req,res)=>{
  const EventLocation={}
  EventLocation.id=req.body.id;
  EventLocation.id_location=req.body.id_location;
  EventLocation.name=req.body.name;
  EventLocation.full_address=req.body.full_address;
  EventLocation.max_capacity=req.body.max_capacity;
  EventLocation.latitude=req.body.latitude;
  EventLocation.longitude=req.body.longitude;
  EventLocation.id_creator_user=req.user.id;

  try {
      if((EventLocation.name==null || EventLocation.name.length>3) && (EventLocation.full_address==null  || EventLocation.full_address.length>3)){

      if(locService.getLocalidadById(EventLocation.id_location)!=null || EventLocation.id_location==null){

        if (EventLocation.max_capacity>0 || EventLocation.max_capacity == null) {

          const respuesta = await evLocService.UpdateEvLoc(EventLocation);    
          return res.status(201).json(respuesta);

        }else{

          return res.status(400).send("Maxima capacidad inválida");
        }
      }else{

        return res.status(400).send("No existe esa id localidad");
      }
    }else{
      return res.status(400).send("Nombre o dirección inválidos");
    }
      
    } catch (error) {
      console.log(error);
      return res.json(error);
    }

});

router.delete("/:id", AuthMiddleware , async (req,res)=>{
  const id= req.params.id;
  try{
  const evLocById = await evLocService.getEventLocationById(id);
  if (evLocById!=null && evLocById.id_creator_user==req.user.id) {
    await evLocService.deleteEvLoc(id);
    return res.status(200).send("Event location eliminado")

    
  }else{
    return res.status(404).send("Not found")
  }
  }catch(error){
    console.log(error);
    return error;
  }

})

export default router;