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


    async getUserByName(user,pass){
        let returnEnity=null;
        try{
            const sql="SELECT * FROM users where username=$1 and password=$2";
            const values=[user,pass];
            const result=await this.BDclient.query(sql,values);

            //HASTA ACA FUNCIONA
            if(result.rows.length>0){
                returnEnity=result.rows[0];
            }

        }catch(error){
            console.log(error)
        }
        return returnEnity;
}
    async InsertUser(user){
        try{
        const sql="Insert into users(first_name,last_name,username,password) values ($1,$2,$3,$4)";
        const values=[user.first_name,user.last_name, user.username, user.password];
        await this.BDclient.query(sql,values);

        }catch(error){
            console.log(error)
        }
    }

    async getAllUsernames(){
        const sql="SELECT username FROM users"
        var returnEntity=null
        try {
            const result=await this.BDclient.query(sql)
            if (result.rows.length>0) {
                returnEntity=result.rows
            }

        } catch (error) {
            console.log(error);
        }
        return returnEntity

    }
    


}