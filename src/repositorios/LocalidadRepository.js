import pg from "pg";
import { BDconfig } from "../configs/BD.js";

export default class LocalidadRepository {
  constructor() {
    const { Client } = pg;
    this.BDclient = new Client(BDconfig);
    this.BDclient.connect();
  }
    async cantLocalidades(){
      try {
        var sql = "SELECT COUNT(*) FROM locations"
        const result = await this.BDclient.query(sql)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
    }

    async getLocalidades(limit,offset){
        let returnEnity=null;
        try{
        const sql="select * from locations order by id limit $1 offset $2";
        const values=[limit,offset]
        const result=await this.BDclient.query(sql,values);
        
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

    async getLocalidadesByProvincia(id_provincia,limit,offset){
        let returnEnity=null;
        try{
            const sql="select * from locations where id_province=$1 limit $2 offset $3";
            const values=[id_provincia,limit,(offset*limit)];
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