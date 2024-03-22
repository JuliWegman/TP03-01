import { query } from "express";

class UsuarioService{

    getAllUsers(pageSize,reqPage){
        
        //ida base datos

        const query=`select * from users limit ${pageSize} offset ${reqPage}`;
        const eventsInBD=query.execute();

        return{
            collection: eventsInBD,
            pageSize:pageSize,
            page:reqPage,
            nextPage:reqPage+1
        }
    }

    


}





export default UsuarioService;
