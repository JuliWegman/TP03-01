import pg from "pg"
import {BDconfig} from "../configs/BD.js"

export default class ProvinciaRepository{

    constructor(){
        const {Client}=pg;
        this.BDclient=new Client(BDconfig)
        this.BDclient.connect();
    }

    async cantProvincias(){
      try {
        var sql = "SELECT COUNT(*) FROM provinces"
        const result = await this.BDclient.query(sql)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
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

    async getProvincias(limit, offset){
        let returnEnity=null;
        try{
            const sql="select * from provinces limit $1 offset $2";
            const values = [limit, (offset*limit)]
            const result=await this.BDclient.query(sql, values);
            
            if(result.rows.length>0){
                returnEnity=result.rows;
            }


        }catch(error){
            console.log(error)

        }
        return returnEnity;


    }

    async patchProvincia(Provincia){
            let returnEntity = null;
            var index = 2;
            const values = [Provincia.id];
        
            try {
              var sql = `update provinces SET`;
              if (Provincia.name != null) {
                sql += ` name=$${index},`;
                values.push(Provincia.name)
                index++;
              }
        
              if (Provincia.full_name != null) {
                sql += ` full_name=$${index},`;
                values.push(Provincia.full_name)
                index++;
              }
        
              if (Provincia.latitude!= null) {
                sql += ` latitude=$${index},`;
                values.push(Provincia.latitude)
                index++;
              }
        
              if (Provincia.longitude!= null) {
                sql += ` longitude=$${index},`;
                values.push(Provincia.longitude)
                index++;
               }
        
              if (Provincia.display_order!= null) {
                sql += ` display_order=$${index},`;
                values.push(Provincia.display_order)
                index++;     
              }
        
              if (sql.endsWith(",")) {
                sql = sql.slice(0, -1);
              }
        
              sql += ` where id=$1`;
        
              const result = await this.BDclient.query(sql, values);
              returnEntity=result.rowsAffected;
        
        
            } catch (error) {
              console.log(error);
            }

            return returnEntity;
    }

    async deleteProvincia(id){
        var returnEntity = null;
        try {
          const sql = `Delete from provinces Where id=$1`;
          const values = [id];
          const result = await this.BDclient.query(sql, values);

          returnEntity = result.rowsAffected;

        }catch (error) {
          console.log(error);
        }
        return returnEntity;
    }
    
    async insertProvincia(Provincia){
      let returnEntity=null;
      try {
      const sql = `Insert into provinces(name,full_name,latitude,longitude,display_order) values ($1,$2,$3,$4,$5)`;
      const values = [ Provincia.name , Provincia.full_name , Provincia.latitude , Provincia.longitude , Provincia.display_order ];
      returnEntity=await this.BDclient.query(sql, values);
      return "Provincia insertada";
      }catch (error) {
      console.log(error);
      return "Error"
      }
      
    }
}
