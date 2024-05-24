import pg from "pg"
import {BDconfig} from "../configs/BD.js"

export default class ProvinciaRepository{

    constructor(){
        const {Client}=pg;
        this.BDclient=new Client(BDconfig)
        this.BDclient.connect();
    }

    async getProvinciaById(id){
        let returnEnity=null;
        try{
            const sql="select * from provinces where id=$1";
            const values=[id];
            const result=await this.BDclient.query(sql,values);
            
            if(result.rows.length>0){
                returnEnity=result.rows[0];
            }


        }catch(error){
            console.log(error)

        }
        return returnEnity;
    }

    async getProvincias(){
        let returnEnity=null;
        try{
            const sql="select * from provinces";
            const result=await this.BDclient.query(sql);
            
            if(result.rows.length>0){
                returnEnity=result.rows;
            }


        }catch(error){
            console.log(error)

        }
        return returnEnity;


    }

    async patchProvincia(Provincia){
        let returnEnity=null;
        try{
            var sql = "update provinces SET(";
        
            if (Provincia.name != null) {
            sql += ` name=$1,`;
            }
            if (Provincia.full_name != null) {
            sql += ` full_Name=$2,`;
            }
            if (Provincia.latitude != null) {
            sql += ` latitude=$3,`;
            }
            if (Provincia.longitude != null) {
            sql += ` longitude=$4,`;
            }
            if (Provincia.display_order != null) {
            sql += ` display_order=$5,`;
            }
            if (sql.endsWith(",")) {
            sql = sql.slice(0, -1);
            }
            sql += `) where id=$6`;

            const values=[Provincia.name,Provincia.full_name,Provincia.latitude,Provincia.longitude,Provincia.display_order,Provincia.id];
            const result=await this.BDclient.query(sql,values);

            if(result.rowsAffected.length>0){
                returnEnity=result.rowsAffected[0];
            }

        }catch(error){
            console.log(error)
        }

    return returnEnity;
    }

    async deleteProvincia(id){
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
    
}