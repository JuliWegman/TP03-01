import repositorio from "../repositorios/UsuarioRepository.js"
import login from "../auth/login.js";
const repo= new repositorio();

const ListadoUsers = {
  collection: [
    {
      user: {
        id: 3,
        username: "Jschiffer",
        first_name: "Julian",
        last_name: "Schiffer",
      },
      attended: false,
      rating: null,
      description: null,
    },
    {
      user: {
        id: 1,
        username: "polshu@polshu.com.ar",
        first_name: "Pablo",
        last_name: "Ulman",
      },
      attended: true,
      rating: 5,
      description: "Alto Chow",
    },
  ],
  // pagination: {
  //   pagination:{limit:parsedLimit,
  //     offset:parsedOffset,
  //     nextPage:((parsedOffset+1) *parsedLimit<=totalCount) ?`${process.env.BASE_URL}/${path}?limit=${parsedLimit}&offset=${parsedOffset+1}${(eventName) ?`&eventName=${eventName}`:null}${(eventCategory) ?`&eventCategory=${eventCategory}` : null}${(eventDate) ?`&eventDate=${eventDate}`:null}${(eventTag) ?`&eventTag=${eventTag}`:null}`:null,
  //     total:totalCount}
  
  // },
};

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
