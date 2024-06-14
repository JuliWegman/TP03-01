import pg from "pg";
import { BDconfig } from "../configs/BD.js";
import e from "express";

// pasandolo al repository
export default class CategoriaRepository {
  constructor() {
    const { Client } = pg;
    this.BDclient = new Client(BDconfig);
    this.BDclient.connect();
  }
  async cantCategorias(){
    try {
        var sql = "SELECT COUNT(*) FROM event_categories"
        const result = await this.BDclient.query(sql)
        return result.rows[0].count
      } catch (error) {
        return error;
      }
  }

  async getCategorias(limit, offset){
    let returnEnity=null;
    try{
        const sql="select * from event_categories order by id limit $1 offset $2";
        const values=[limit, offset]
        const result=await this.BDclient.query(sql,values);
        
        returnEnity=result.rows;
        
    }catch(error){
        console.log(error)

    }
    return returnEnity;
}

async getCategoriaById(id){
    let returnEnity=null;
    try{
        const sql="select * from event_categories where id=$1";
        const values=[id];
        const result=await this.BDclient.query(sql,values);
        
        returnEnity=result.rows;
        


    }catch(error){
        console.log(error)
    }
    return returnEnity;
}

async insertCategoria(Categoria){
    try{
        const sql="INSERT INTO event_categories (name, display_order) VALUES ($1, $2)";
        const values=[Categoria.name, Categoria.display_order];
        await this.BDclient.query(sql,values);
    }catch(error){
        console.log(error)
    }
}

async updateCategoria(categoria){

    try {
        var sql = "UPDATE event_categories SET "
        var index=2;
        const values = [categoria.id]

        if (categoria.name != null) {
            sql += `name = $${index},`
            values.push(categoria.name)
            index++;
        }

        if (categoria.display_order != null) {
            sql += `display_order = $${index}`
            values.push(categoria.display_order)
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

async deleteCategoria(id){
    try {
        const sql = "Delete FROM event_categories where id = $1"
        const values = [id]

        await this.BDclient.query(sql,values)
    } catch (error) {
        console.log(error);
    }
}

}