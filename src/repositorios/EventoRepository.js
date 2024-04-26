import pq from "pq";
import { BDconfig } from "../../BD";

const client =new pq.Client(BDconfig);
client.connect();


// pasandolo al repository

const getEventByFilter = (Evento, pageSize, reqPage) =>  {
    var query = `select e.name, e.description, ec.name, el.name, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max__assistance from events e limit ${pageSize} offset ${reqPage} inner join event_categories ec on events.id_event_category=ec.id inner join event_tags et on events.id=et.id_event inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id where`;
    //arreglalo huevo

    if (Evento.name != null) {
      query += ` events.name=${Evento.name} and`;
    }
    if (Evento.category != null) {
      query += ` ec.name=${Evento.category} and`;
    }
    if (Evento.startDate != null) {
      query += ` events.start_date=${Evento.startDate} and`;
    }
    if (Evento.tag != null) {
      query += ` t.name=${Evento.tag} and`;
    }
    if (query.endsWith(" and")) {
      query = query.slice(0, -4);
    }
    if (query.endsWith(" where")) {
      query = query.slice(0, -6);
    }

    // const collection=query.execute();

    return query;
  }

  export default EventoRepository;