import { query } from "express";

const ListadoUsers={collection:[
  {
  user: {
  id: 3,
  username: "Jschiffer",
  first_name: "Julian",
  last_name: "Schiffer"
  },
  attended: false,
  rating: null,
  description: null
  },
  {
  user: {
  id: 1,
  username: "polshu@polshu.com.ar",
  first_name: "Pablo",
  last_name: "Ulman"
  },
  attended: true,
  rating: 5,
  description: "Alto Chow"
  }
  ],
  pagination: {
  limit: 15,
  offset: 0,
  nextPage: null,
  total: "2"
  }
}
export class UsuarioService1 {
  login(user, pass) {
    return "token";
  }
}

export class UsuarioService2 {
  register(first_name, last_name, username, password) {
    const query=`Insert into users(first_name,last_name,username,password) values ("${first_name}","${last_name}","${username}","${password}")`;
    
    //query.execute();


  }
}


