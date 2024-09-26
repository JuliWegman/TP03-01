import repositorio from "../repositorios/UsuarioRepository.js"
import login from "../auth/login.js";
const repo= new repositorio();



export class UsuarioService {
  async login(user, pass) {
    try{
    const Usuario= await this.getUserByPayload(user,pass)
    if(Usuario!=null){
      const token =await login(Usuario)
      return token;
    }else{
      return "Usuario o Contraseña no existen";
    }
    }catch(error){
      console.log(error);
      return res.json(error);

    }
    
    
  }

  async register(user) {
    await repo.InsertUser(user)

  }

  async getUserByPayload(user,pass){
    return await repo.getUserByName(user,pass)

  }

  async getUserById(id){
    return await repo.getUserById(id);
  }

  async getAllUsernames(){
    return await repo.getAllUsernames()
  }
};
