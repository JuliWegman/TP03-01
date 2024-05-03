import pg from "pg";
import { BDconfig } from "../configs/BD";

// pasandolo al repository
export default class EventoRepository {
  constructor() {
    const { Client } = pg;
    this.BDclient = new Client(BDconfig);
    this.BDclient.connect();
  }

  async getEventByFilter(Evento, pageSize, reqPage) {
    var returnEntity = null;

    try {
      var sql = `select e.name, e.description, ec.name, el.name, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max__assistance from events e limit $1 offset $2 inner join event_categories ec on events.id_event_category=ec.id inner join event_tags et on events.id=et.id_event inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id where`;

      if (Evento.name != null) {
        sql += ` events.name=$3 and`;
      }
      if (Evento.category != null) {
        sql += ` ec.name=$4 and`;
      }
      if (Evento.startDate != null) {
        sql += ` events.start_date=$5 and`;
      }
      if (Evento.tag != null) {
        sql += ` t.name=$6 and`;
      }
      if (sql.endsWith(" and")) {
        sql = sql.slice(0, -4);
      }
      if (sql.endsWith(" where")) {
        sql = sql.slice(0, -6);
      }

      const values = [
        pageSize,
        reqPage,
        Evento.name,
        Evento.category,
        Evento.startDate,
        Evento.tag,
      ];
      const result = await this.BDclient.query(sql, values);

      if (result.rows.length > 0) {
        returnEntity = result.rows;
      }
    } catch (error) {
      console.log(error);
    }

    return returnEntity;
  }

  async getEventById(id) {
    let returnEntity = null;
    try {
      var sql = `select e.name, e.description, ec.name, el.name, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max__assistance, ep.name from events e inner join event_categories ec on ec.id=events.id_event_category inner join event_tags et on et.id_event=events.id inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id inner join provinces ep on el.id_province = ep.id where e.id=$1`;
      const values = [id];
      const result = await this.BDclient.query(sql, values);

      if (result.rows.length > 0) {
        returnEntity = result.rows[0];
      }
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  }

  async getEventEnrollment(enrollment) {
    let returnEntity = null;
    try {
      var sql = `select ev.id,ev.name, u.first_name, u.last_name, u.username, ee.atended, ee.rating from events ev inner join event_enrollments ee on ev.id=ee.id_event inner join on users u ev.id_user = u.id where ev.id=$7 and `;

      if (enrollment.nombreEv != null) {
        sql += ` ev.name=$1 and`;
      }
      if (enrollment.firstName != null) {
        sql += ` u.first_Name=$2 and`;
      }
      if (enrollment.lastName != null) {
        sql += ` u.last_name=$3 and`;
      }
      if (enrollment.username != null) {
        sql += ` u.username=$4 and`;
      }
      if (enrollment.attended != null) {
        sql += ` ee.attended=$5 and`;
      }
      if (enrollment.rating != null) {
        sql += ` ee.rating=$6 and`;
      }
      if (sql.endsWith(" and")) {
        sql = sql.slice(0, -4);
      }
      if (sql.endsWith(" and where")) {
        sql = sql.slice(0, -10);
      }

      const values = [
        enrollment.nombreEv,
        enrollment.firstName,
        enrollment.lastName,
        enrollment.username,
        enrollment.attended,
        enrollment.rating,
      ];

      const result = await this.BDclient.query(sql, values);

      if (result.rows.length > 0) {
        returnEntity = result.rows;
      }
    } catch (error) {
      console.log(error);
    }

    return returnEntity;
  }

  async patchEvento(Evento) {
    let returnEntity = null;
    try {
      var sql = `update provinces SET`;
      if (Evento.name != null) {
        sql += ` name=$1,`;
      }

      if (Evento.description != null) {
        sql += ` description=$2,`;
      }

      if (Evento.start_date != null) {
        sql += ` start_date=$3,`;
      }

      if (Evento.duration_in_minutes != null) {
        sql += ` duration_in_minutes=$4,`;
      }

      if (Evento.price != null) {
        sql += ` price=$5,`;
      }

      if (
        Evento.enabled_for_enrollment != null &&
        (Evento.enabled_for_enrollment == "true" ||
          Evento.enabled_for_enrollment == "false")
      ) {
        sql += ` enabled_for_enrollment=$6,`;
      }

      if (Evento.max__assistance != null) {
        sql += ` max__assistance=$7,`;
      }

      if (sql.endsWith(",")) {
        sql = sql.slice(0, -1);
      }

      sql += ` where id=$8`;

      const values = [
        Evento.name,
        Evento.description,
        Evento.start_date,
        Evento.duration_in_minutes,
        Evento.price,
        Evento.enabled_for_enrollment,
        Evento.max__assistance,
        Evento,
      ];
      const result = await this.BDclient.query(sql, values);

      if (result.rowsAffected.length > 0) {
        returnEnity = result.rowsAffected[0];
      }
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  }

  async DeleteEvent(id) {
    var returnEntity = null;
    try {
      const sql = `Delete from provinces Where id=1`;
      const values = [id];
      const result = await this.BDclient.query(sql, values);

      if (result.rowsAffected.length > 0) {
        returnEnity = result.rowsAffected[0];
      }
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  }

  async InscripcionEvento(enrollment, evento, users) {
    var returnEntity = null
    try {
      var sql = ""
      if (evento.enabled_for_enrollment) {
        sql = `Insert INTO event_enrollment (id_event, id_user, description, registration_date_time,attended,observations,rating) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
      }else return returnEntity;

      const values = [evento.id, users.id,enrollment.description, Date.now(),enrollment.attended, enrollment.observations, enrollment.rating]
      const result = await this.BDclient.query(sql, values);

      if (result.rowsAffected.length > 0) {
        returnEntity = result.rowsAffected[0];
      }
    } catch (error) {
      console.log(error);
    }
    return returnEntity
  }

  async UpdateRating(rating,id) {
    var returnEntity = null;
    try {
      const sql = `update event_enrollments SET rating=$1 WHERE id=$2`;
      const values = [rating,id];
      const result = await this.BDclient.query(sql, values);

      if (result.rowsAffected.length > 0) {
        returnEntity = result.rowsAffected[0];
      }
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  } 

  async InsertEvento(evento) {
    var returnEntity = null;
    try {
      const sql = `Insert into events(name,description,id_event_category,id_event_location,start_date,duration_in_minutes,price,enabled_for_enrollment,max__assistance) values ("1","$9","$2","$3","$4","$5,"$6","$7","$8")`;
      const values = [evento.name, evento.id_event_category, evento.id_event_location, evento.start_date, evento.duration_in_minutes, evento.price, evento.enabled_for_enrollment, evento.max_assistance, evento.description];
      const result = await this.BDclient.query(sql, values);

      if (result.rowsAffected.length > 0) {
        returnEntity = result.rowsAffected[0];
      }
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  }  
}

// export default EventoRepository;
