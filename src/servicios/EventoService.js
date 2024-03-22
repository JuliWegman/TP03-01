import { query } from "express";

class EventoService{

    getAllEvents(pageSize,reqPage){
        
        //ida base datos

        const query=`select * from Pizzas limit ${pageSize} offset ${reqPage}`;
        const eventsInBD=query.execute();

        return{
            collection: eventsInBD,
            pageSize:pageSize,
            page:reqPage,
            nextPage:reqPage+1
        }
    }

    getEventByName(pageSize,reqPage,name){
        
        //ida base datos

        const query=`select * from Pizzas limit ${pageSize} offset ${reqPage} where nombre=${name}`;
        const eventsInBD=query.execute();

        return{
            collection: eventsInBD,
            pageSize:pageSize,
            page:reqPage,
            nextPage:reqPage+1
        }
    }


}

export default EventoService;
