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

  async cantEventos() {
    var returnEntity = 0;

    try {
      var sql = "SELECT COUNT(*) FROM events"
      const result = await this.BDclient.query(sql)
      console.log(result.rows);
      return result.rows[0].count
    } catch (error) {
      return error;
    }
  }

  async getEventByFilter(Evento, pageSize, reqPage) {
    var returnEntity = null;
    try {
      var sql = `SELECT e.name, e.description, ec.name as Category, el.name as Location, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance FROM events e inner join event_categories ec on e.id_event_category=ec.id inner join event_tags et on e.id=et.id_event inner join tags t on et.id_tag=t.id inner join locations el on e.id_event_location = el.id inner join users u on e.id_creator_user = u.id where `;
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


      if (sql.endsWith(" and")) {
        sql = sql.slice(0, -4);
      }
      if (sql.endsWith(" where ")) {
        sql = sql.slice(0, -7);
      }
      
      sql += " limit $1 offset $2";
      console.log(sql, values);
      
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
      var sql = `select ev.id,ev.name as Nombre, u.first_name as UserNombre, u.last_name as UserApellido, u.username, ee.attended, ee.rating from events ev inner join event_enrollments ee on ev.id=ee.id_event inner join users u on ev.id_creator_user = u.id where ev.id=$1 and `;
      var index = 2;
      const values = [enrollment.event_id];

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



      if (sql.endsWith(" and ")) {
        sql = sql.slice(0, -5);
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
    var index = 2;
    const values = [Evento.id];

    try {
      var sql = `update events SET`;
      if (Evento.name != null) {
        sql += ` name=$${index},`;
        values.push(Evento.name)
        index++;
      }

      if (Evento.description != null) {
        sql += ` description=$${index},`;
        values.push(Evento.description)
        index++;
      }

      if (Evento.start_date != null) {
        sql += ` start_date=$${index},`;
        values.push(Evento.start_date)
        index++;
      }

      if (Evento.duration_in_minutes != null) {
        sql += ` duration_in_minutes=$${index},`;
        values.push(Evento.duration_in_minutes)
        index++;
       }

      if (Evento.price != null) {
        sql += ` price=$${index},`;
        values.push(Evento.price)
        index++;     
      }

      if (
        Evento.enabled_for_enrollment != null &&
        (Evento.enabled_for_enrollment == "true" ||
          Evento.enabled_for_enrollment == "false")
      ) {
        sql += ` enabled_for_enrollment=$${index},`;
        values.push(Evento.enabled_for_enrollment)
        index++;   
      }

      if (Evento.max_assistance != null) {
        sql += ` max_assistance=$${index},`;
        values.push(Evento.max_assistance)
        index++;  
      }

      if (sql.endsWith(",")) {
        sql = sql.slice(0, -1);
      }

      sql += ` where id=$1`;
      console.log(sql);

      const result = await this.BDclient.query(sql, values);


    } catch (error) {
      console.log(error);
    }
  }

  async DeleteEvent(id) {
    try {
      const sql = `Delete from events Where id=$1`;
      const values = [id];
      await this.BDclient.query(sql, values);

    } catch (error) {
      console.log(error);
    }
  }

  async InscripcionEvento(enrollment) {
    try {
      var sql = ""
      if (enrollment.enabled) {
        sql = `Insert INTO event_enrollments (id_event, id_user, description, registration_date_time,attended,observations,rating) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
      }else return "Error";
      const date = new Date();
      const fecha = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} `
      const values = [enrollment.idEvento, enrollment.user_id,enrollment.description, fecha,enrollment.attended, enrollment.observations, enrollment.rating]
      await this.BDclient.query(sql, values);


    } catch (error) {
      console.log(error);
    }
  }

  async UpdateRating(rating,id) {
    try {
      const sql = `update event_enrollments SET rating=$1 WHERE id=$2`;
      const values = [rating,id];
      await this.BDclient.query(sql, values);

    } catch (error) {
      console.log(error);
    }
  } 

  async InsertEvento(evento) {
    try {
      console.log(evento);
      const sql = `Insert into events(name,description,id_event_category,id_event_location,start_date,duration_in_minutes,price,enabled_for_enrollment,max_assistance, id_creator_user) values ($1,$9,$2,$3,$4,$5,$6,$7,$8, $10)`;
      const values = [evento.name ,evento.id_event_category, evento.id_event_location, evento.start_date, evento.duration_in_minutes, evento.price, evento.enabled_for_enrollment, evento.max_assistance, evento.description, evento.id_creator_user];
      await this.BDclient.query(sql, values);

    } catch (error) {
      console.log(error);
    }
  }  
}

// export default EventoRepository;
