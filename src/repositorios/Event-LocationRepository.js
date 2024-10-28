import pg from "pg";
import { BDconfig } from "../configs/BD.js";

export default class LocalidadRepository {
    constructor() {
      const { Client } = pg;
      this.BDclient = new Client(BDconfig);
      this.BDclient.connect();
    }

    async getEventLocations(limit,offset){
      let returnEntity = null;
        try {
      var sql = `SELECT * FROM event_locations order by id asc limit $1 offset $2 `;
      const values = [limit,offset];
      const result = await this.BDclient.query(sql, values);

      if (result.rows.length > 0) {
        returnEntity = result.rows;
      }
        } catch (error) {
      console.log(error);
        }
        return returnEntity;
    }

    async getEventLocationsByUser(id,limit,offset){
        let returnEntity = null;
        try {
      var sql = `SELECT * FROM event_locations WHERE id_creator_user=$1 order by id asc limit $2 offset $3 `;
      const values = [id,limit,offset];
      const result = await this.BDclient.query(sql, values);

      if (result.rows.length > 0) {
        returnEntity = result.rows;
      }
        } catch (error) {
      console.log(error);
        }
        return returnEntity;
    }

    async getEventLocationsByLocation(id,limit,offset){
      let returnEntity = null;
      try {
    var sql = `SELECT * FROM event_locations WHERE id_location=$1 order by id asc limit $2 offset $3 `;
    const values = [id,limit,offset];
    const result = await this.BDclient.query(sql, values);
    if (result.rows.length > 0) {
      returnEntity = result.rows;
    }
      } catch (error) {
    console.log(error);
      }
      return returnEntity;
  }


    async getEventLocationById(id){
        let returnEntity = null;
      try {
        var sql = `SELECT * FROM event_locations WHERE id=$1`;
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

    async InsertEvLoc(EvLoc){
      try{
        var sql ='INSERT INTO event_locations (id_location, name, full_address, max_capacity,latitude,longitude,id_creator_user) VALUES ($1,$2,$3,$4,$5,$6,$7)'
        const values=[EvLoc.id_location,EvLoc.name,EvLoc.full_address,EvLoc.max_capacity,EvLoc.latitude,EvLoc.longitude,EvLoc.id_creator_user]
        await this.BDclient.query(sql, values);
      }catch(error){
        console.log(error)
      }
    }

    async UpdateEvLoc(e){
      try {
        const values = [e.id]
        var sql = `UPDATE event_locations SET`;
        var index = 2;

        if (e.name != null) {
          sql += ` name=$${index},`;
          values.push(e.name)
          index++;
        }

        if (e.full_address != null) {
          sql += ` full_address=$${index},`;
          values.push(e.full_address)
          index++;
        }

        if (e.max_capacity != null) {
          sql += ` max_capacity=$${index},`;
          values.push(e.max_capacity)
          index++;
        }

        if (e.latitude != null) {
          sql += ` latitude=$${index},`;
          values.push(e.latitude)
          index++;
        }
        if (e.longitude != null) {
          sql += ` longitude=$${index},`;
          values.push(e.longitude)
          index++;
        }
        if (e.id_creator_user != null) {
          sql += ` id_creator_user=$${index},`;
          values.push(e.id_creator_user)
          index++;
        }

        if (sql.endsWith(",")) {
          sql = sql.slice(0, -1);
        }

        sql += " where id=$1"


        await this.BDclient.query(sql,values);
        

      } catch (error) {
        console.log(error);
      }
    }

    async deleteEvLoc(id){
      try{
      var sql = `DELETE FROM event_locations WHERE id=$1`;
      const values=[id]
      await this.BDclient.query(sql,values);
      }catch(error){
        console.log(error);
      }
    }

    async cantEvLoc(id){
      try {
        var sql = "SELECT COUNT(*) FROM event_locations WHERE id_creator_user=$1"
        const values=[id]
        const result = await this.BDclient.query(sql,values)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
    }

    async cantEvLocByLocation(id){
      try {
        var sql = "SELECT COUNT(*) FROM event_locations WHERE id_location=$1"
        const values=[id]
        const result = await this.BDclient.query(sql,values)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
    }


}