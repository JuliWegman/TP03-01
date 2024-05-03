import { query } from "express";
import repositorio from "../repositorios/UsuarioRepository.js"

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
  pagination: {
    pagination:{limit:parsedLimit,
      offset:parsedOffset,
      nextPage:((parsedOffset+1) *parsedLimit<=totalCount) ?`${process.env.BASE_URL}/${path}?limit=${parsedLimit}&offset=${parsedOffset+1}${(eventName) ?`&eventName=${eventName}`:null}${(eventCategory) ?`&eventCategory=${eventCategory}` : null}${(eventDate) ?`&eventDate=${eventDate}`:null}${(eventTag) ?`&eventTag=${eventTag}`:null}`:null,
      total:totalCount}
  
  },
};
export class UsuarioService {
  async login(user, pass) {
    return "token";
  }

  async register(user) {
    const query = `Insert into users(first_name,last_name,username,password) values ("${user.first_name}","${user.last_name}","${user.username}","${user.password}")`;

    //query.execute();
  }

  async getUserById(id){
    return await repo.getUserById(id);
  }
};
