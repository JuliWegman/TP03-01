import pg from "pg";
import { BDconfig } from "../configs/BD.js";
import e from "express";

export default class LocalidadRepository {
    constructor() {
      const { Client } = pg;
      this.BDclient = new Client(BDconfig);
      this.BDclient.connect();
    }

    async getEventLocationsByUser(id){
        let returnEntity = null;
        try {
      var sql = `SELECT * FROM event_locations WHERE id_creator_user=$1`;
      const values = [id];
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


}