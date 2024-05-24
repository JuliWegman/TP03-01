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