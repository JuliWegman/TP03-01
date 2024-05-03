import pg from "pg"
import {BDconfig} from "../configs/BD.js"

export default class UsuarioRepository{

    constructor(){
        const {Client}=pg;
        this.BDclient=new Client(BDconfig)
        this.BDclient.connect();
    }

    async getUserById(id){
            let returnEnity=null;
            try{
                const sql="select * from users where id=$1";
                const values=[id]
                const result=await this.BDclient.query(sql,values);
    
                if(result.rows.length>0){
                    returnEnity=result.rows[0];
                }
    
    
            }catch(error){
                console.log(error)
    
            }
            return returnEnity;
    
    
        
    }
    


}