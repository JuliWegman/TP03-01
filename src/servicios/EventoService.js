import { query } from "express";

class EventoService{

    getAllEvents(pageSize,reqPage){
        
        //ida base datos

        const query=`select e.name, e.description, ec.name, el.name, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max__assistance from events e limit ${pageSize} offset ${reqPage} inner join event_categories ec on ec.id=events.id_event_category inner join event_tags et on et.id_event=events.id inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id`;
        const eventsInBD=query.execute();

        return{
            collection: eventsInBD,
            pageSize:pageSize,
            page:reqPage,
            nextPage:reqPage+1
        }
    }

    getEventByFilter(pageSize,reqPage,name,category,startDate,tag){
        const query=`select e.name, e.description, ec.name, el.name, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max__assistance from events e limit ${pageSize} offset ${reqPage} inner join event_categories ec on ec.id=events.id_event_category inner join event_tags et on et.id_event=events.id inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id`;
        
        //ida base datos

        if (name!=null) {
            query+=` events.name=${name} and`;
        }
        if(category!=null){
            query+=` ec.name=${category} and`;
        }
        if (startDate!=null) {
            query+=` events.start_date=${startDate} and`;
        }
        if (tag!=null) {
            query+=` t.name=${tag} and`;
        }
        if (query.endsWith(" and")) {
            query=query.slice(0,-4)
        }


        const eventsInBD=query.execute();

        return{
            collection: eventsInBD,
            pageSize:pageSize,
            page:reqPage,
            nextPage:reqPage+1
        }
    }

    getEventById(id){
        const query=`select e.name, e.description, ec.name, el.name, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max__assistance, ep.name from events e limit ${pageSize} offset ${reqPage} inner join event_categories ec on ec.id=events.id_event_category inner join event_tags et on et.id_event=events.id inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id inner join provinces ep on el.id_province = ep.id where e.id=${id}`;
        
        const eventInBd=query.execute();

        return{
            collection: eventInBd,
            pageSize:pageSize,
            page:reqPage,
            nextPage:reqPage+1
        }
        
    }


}

export default EventoService;
