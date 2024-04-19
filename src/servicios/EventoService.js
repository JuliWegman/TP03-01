import { query } from "express";
const Eventos ={
  collection: [
  {
  "id": 2,
  "name": "Taylor Swift",
  "description": "Un alto show",
  "start_date": "2024-03-21T03:00:00.000Z",
  "duration_in_minutes": 210,
  "price": "15500",
  "enabled_for_enrollment": true,
  "max_assistance": 120000,
  "tags": [
  "Rock",
  "Pop"
  ],
  "creator_user": {
  "id": 3,
  "username": "Jschiffer",
  "first_name": "Julian",
  "last_name": "Schiffer"
  },
  "event_category": {
  "id": 1,
  "name": "Musica"
  },
  "event_location": {
  "id": 1,
  "name": "River",
  "full_address": "Av. Pres. Figueroa Alcorta 7597",
  "latitude": -34.5453,
  "longitude": -58.4498,
  "max_capacity": "84567"
  }
  },
  {
    "id": 3,
    "name": "Taylor Swift",
    "description": "Un alto show",
    "start_date": "2024-03-21T03:00:00.000Z",
    "duration_in_minutes": 210,
    "price": "15500",
    "enabled_for_enrollment": true,
    "max_assistance": 120000,
    "tags": [
    "Rock",
    "Pop"
    ],
    "creator_user": {
    "id": 3,
    "username": "Jschiffer",
    "first_name": "Julian",
    "last_name": "Schiffer"
    },
    "event_category": {
    "id": 1,
    "name": "Musica"
    },
    "event_location": {
    "id": 1,
    "name": "River",
    "full_address": "Av. Pres. Figueroa Alcorta 7597",
    "latitude": -34.5453,
    "longitude": -58.4498,
    "max_capacity": "84567"
    }
    },
  ],
  "pagination": {
  "limit": 15,
  "offset": 0,
  "nextPage": null,
  "total": "1"
  }
  }

  
export class EventoService1 {
  getEventByFilter(pageSize, reqPage, name, category, startDate, tag) {
    var query = `select e.name, e.description, ec.name, el.name, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max__assistance from events e limit ${pageSize} offset ${reqPage} inner join event_categories ec on ec.id=events.id_event_category inner join event_tags et on et.id_event=events.id inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id where`;
    //arreglalo huevo

    if (name != null) {
      query += ` events.name=${name} and`;
    }
    if (category != null) {
      query += ` ec.name=${category} and`;
    }
    if (startDate != null) {
      query += ` events.start_date=${startDate} and`;
    }
    if (tag != null) {
      query += ` t.name=${tag} and`;
    }
    if (query.endsWith(" and")) {
      query = query.slice(0, -4);
    }
    if (query.endsWith(" where")) {
      query = query.slice(0, -6);
    }

    // const collection=query.execute();

    return Eventos
    
    
  };
}

export class EventoService2 {
  getEventById(id) {
    var query = `select e.name, e.description, ec.name, el.name, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max__assistance, ep.name from events e inner join event_categories ec on ec.id=events.id_event_category inner join event_tags et on et.id_event=events.id inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id inner join provinces ep on el.id_province = ep.id where e.id=${id}`;
    //arreglalo

    //const collection=query.execute();

    return Eventos.collection[0];
  }
}

export class EventoService3 {
  getEventEnrollment(id, evname, firstName, lastName, username, atended, rating) {
  var query = `select ev.id,ev.name, u.first_name, u.last_name, u.username, ee.atended, ee.rating from events ev inner join event_enrollments ee on ev.id=ee.id_event inner join on users u ev.id_user = u.id where ev.id=${id} and where`
    
  if (evname != null) {
    query += ` ev.name=${evname} and`;
  }
  if (firstName != null) {
    query += ` u.first_Name=${firstName} and`;
  }
  if (lastName != null) {
    query += ` u.last_name=${lastName} and`;
  }
  if (username != null) {
    query += ` u.username=${username} and`;
  }
  if (atended != null) {
    query += ` ee.atended=${atended} and`;
  }
  if (rating != null) {
    query += ` ee.rating=${rating} and`;
  }
  if (query.endsWith(" and")) {
    query = query.slice(0, -4);
  }
  if (query.endsWith(" and where")) {
    query = query.slice(0, -10);
  }

  return "xd2";
}
}

export class EventoService4{
  patchEvento(id,name,description,start_date,duration_in_minutes,price, enabled_for_enrollment, max__assistance ) {
    var query = `update provinces SET`;
    //arreglalo huevo

    if (name != null) {
      query += ` name=${name},`;
    }
    if (description != null) {
      query += ` description=${description},`;
    }
    if (start_date != null) {
      query += ` start_date=${start_date},`;
    }
    if (duration_in_minutes != null) {
      query += ` duration_in_minutes=${duration_in_minutes},`;
    }
    if (price != null) {
      query += ` price=${price},`;
    }
    if ((enabled_for_enrollment != null) && (enabled_for_enrollment == "true" || enabled_for_enrollment == "false")) {
      query += ` enabled_for_enrollment=${enabled_for_enrollment},`;
    }
    if (max__assistance != null) {
      query += ` max__assistance=${max__assistance},`;
    }

    if (query.endsWith(",")) {
      query = query.slice(0, -1);
    }

    if (query.endsWith("SET")) {
      return "no mandaste ningun valor para updatear";
    }else{
      query+=` where id=${id}`;
          //query.execute();
    return "Updateado correctamente!";
  }
 }
}

export class EventoService5 {
  DeleteEvent(id) {
    const query=`Delete from provinces Where id=${id}`;
    
    //query.execute();

    return "Eliminado con éxito";
  }
}

export class EventoService6 {
  InscripcionEvento(id,descripcion,attended,observations,rating){
    const evento=EventoService2.getEventById(id);
    if(evento.enabled_for_enrollment){
    const query = `Insert INTO event_enrollment (id_event, id_user, description, registration_date_time,attended,observations,rating) VALUES (${evento.id},1,${descripcion},${Date.now()},${attended},${observations},${rating})`;
    return "Inscripto correctamente!"
    }else{
      return "Este evento no está disponible para inscribirse";
    }
  }
}

export class EventoService7 {
  CambiarRating(id,rating){
    const query = `update event_enrollments SET rating=${rating} WHERE id=${id}`;
      //query.execute();

    return "Rating cambiado !"
    
  }
}