import pg from "pg";
import { BDconfig } from "../configs/BD.js";
import e from "express";

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
      var sql = `SELECT e.name, e.description, ec.name as Category, el.name as Location, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance FROM events e inner join event_categories ec on e.id_event_category=ec.id inner join event_tags et on e.id=et.id_event inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id where `;
      console.log(Evento.id);
      const values = [
        pageSize,
        reqPage,
      ];
      var index = 3;

      if (Evento.name != null) {
        sql += ` e.name=$${index} and`;
        values.push(Evento.name);
        index++;
      }
      if (Evento.category != null) {
        sql += ` ec.name=$${index} and`;
        values.push(Evento.category);
        index++;
      }
      if (Evento.startDate != null) {
        sql += ` e.start_date=$${index} and`;
        values.push(Evento.startDate);
        index++;
      }
      if (Evento.tag != null) {
        sql += ` t.name=$${index} and`;
        values.push(Evento.tag);
        index++;
      }

      console.log(sql + "AAAA");

      if (sql.endsWith(" and")) {
        sql = sql.slice(0, -4);
      }
      if (sql.endsWith(" where ")) {
        sql = sql.slice(0, -7);
      }
      
      sql += " limit $1 offset $2";
      
      console.log(sql);

      values.forEach(element => {
        console.log(element);
      });

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
      var sql = `SELECT e.name, e.description, ec.name as Category, el.name as Location, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance FROM events e inner join event_categories ec on e.id_event_category=ec.id inner join event_tags et on e.id=et.id_event inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id where e.id=$1`;
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
      var sql = `select ev.id,ev.name as Nombre, u.first_name as UserNombre, u.last_name as UserApellido, u.username, ee.atended, ee.rating from events ev inner join event_enrollments ee on ev.id=ee.id_event inner join on users u ev.id_user = u.id where ev.id=$7 and `;
      var index = 1;
      const values = [];

      if (enrollment.nombreEv != null) {
        sql += ` ev.name=$${index} and`;
        values.push(enrollment.nombreEv)
        index++;
      }
      if (enrollment.firstName != null) {
        sql += ` u.first_Name=$${index} and`;
        values.push(enrollment.firstName)
        index++;
      }
      if (enrollment.lastName != null) {
        sql += ` u.last_name=$${index} and`;
        values.push(enrollment.lastName)
        index++;
      }
      if (enrollment.username != null) {
        sql += ` u.username=$${index} and`;
        values.push(enrollment.username)
        index++;
      }
      if (enrollment.attended != null) {
        sql += ` ee.attended=$${index} and`;
        values.push(enrollment.attended)
        index++;
      }
      if (enrollment.rating != null) {
        sql += ` ee.rating=$${index} and`;
        values.push(enrollment.attended)
        index++;
      }
      if (sql.endsWith(" and")) {
        sql = sql.slice(0, -4);
      }
      if (sql.endsWith(" and where")) {
        sql = sql.slice(0, -10);
      }



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
