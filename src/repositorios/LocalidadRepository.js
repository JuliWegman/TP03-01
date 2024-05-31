import pg from "pg";
import { BDconfig } from "../configs/BD.js";
import e from "express";

// pasandolo al repository
export default class LocalidadRepository {
  constructor() {
    const { Client } = pg;
    this.BDclient = new Client(BDconfig);
    this.BDclient.connect();
  }


    async getLocalidades(){
        let returnEnity=null;
        try{
        const sql="select * from locations";
        const result=await this.BDclient.query(sql);
        
        if(result.rows.length>0){
            returnEnity=result.rows;
        }


        }catch(error){
        console.log(error)

        }
     return returnEnity;
    }
    
    async getLocalidadById(id){
        let returnEntity = null;
        try {
      var sql = `Select * from locations where id=$1`;
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

    async getLocalidadesByProvincia(id_provincia){
        let returnEnity=null;
        try{
            const sql="select * from locations where id_province=$1";
            const values=[id_provincia];
            const result=await this.BDclient.query(sql,values);
            
            if(result.rows.length>0){
                returnEnity=result.rows;
            }


        }catch(error){
            console.log(error)

        }
        return returnEnity;
    }
}