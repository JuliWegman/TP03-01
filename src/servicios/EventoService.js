import { query } from "express";

export class EventoService1 {
  getEventByFilter(pageSize, reqPage, name, category, startDate, tag) {
    var query = `select e.name, e.description, ec.name, el.name, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max__assistance from events e limit ${pageSize} offset ${reqPage} inner join event_categories ec on ec.id=events.id_event_category inner join event_tags et on et.id_event=events.id inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id where`;

    //ida base datos

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

    // const eventsInBD=query.execute();
    const eventsInBD = [
      {
        id: 1,
        name: "festival god",
        category: "musica",
        startDate: "2020/03/03",
      },
      { id: 2, name: "arte god", category: "arte", startDate: "2020/11/11" },
    ];
    return {
      collection: eventsInBD,
      pageSize: pageSize,
      page: reqPage,
      nextPage: reqPage + 1,
    };
  }
}

export class EventoService2 {
  getEventById(id) {
    var query = `select e.name, e.description, ec.name, el.name, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max__assistance, ep.name from events e inner join event_categories ec on ec.id=events.id_event_category inner join event_tags et on et.id_event=events.id inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id inner join provinces ep on el.id_province = ep.id where e.id=${id}`;

    //const eventInBd=query.execute();

    return "xd";
    // collection: eventInBd,
    // pageSize:pageSize,
    // page:reqPage,
    // nextPage:reqPage+1
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

  return "xd2"
}
}

export default EventoService1;
